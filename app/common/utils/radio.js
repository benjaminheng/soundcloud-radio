import config from '../../../config';
import util from './util';
import Streams from './streams';
import SoundCloud from './soundcloud';

const TRACK_BUFFER_LENGTH = 3;

export default class Radio {
    constructor(res, genres, tags) {
        this.timer = null;
        this.res = res;
        this.genres = genres;
        this.tags = tags;
        this.streams = new Streams(this.res);
        this.soundcloud = new SoundCloud();

        // List of buffered tracks
        this.pendingTracks = [];
    }

    // Add a random track to the queue
    queueRandomTrack(streams, soundcloud) {
        const index = util.getRandomInt(0, this.soundcloud.tracks.length);
        const track = this.soundcloud.tracks.splice(index, 1)[0];
        const title = `${track.username} - ${track.title}`;
        const url = util.buildUrl(track.stream_url, {client_id: config.apiKey});
        this.streams.pushUrl(url, title);
        this.pendingTracks.push(track);
    }

    // Start the radio
    start() {
        this.soundcloud.searchRandom(this.genres, this.tags, 'e').then(() => {
            // Send first track to client before populating list of tracks
            this.queueRandomTrack();
            return this.soundcloud.populateTracks(this.genres, this.tags);
        }).then(() => {
            // 1. Send TRACK_BUFFER_LENGTH number of tracks to client
            // 2. Start scheduling new tracks as each one finishes playing
            for (let i=0; i < TRACK_BUFFER_LENGTH; i++) {
                this.queueRandomTrack();
            }
            this.scheduleNextTrack(this.pendingTracks.shift().duration);
        }).catch(err => {
            console.log('Error -> ' + err);
        });
    }

    // Kill the radio
    kill() {
        clearTimeout(this.timer);
    }

    // Queue new tracks as each one finishes playing
    // Repopulate the list of tracks if list contains less than 10 tracks
    scheduleNextTrack(duration) {
        this.timer = setTimeout(() => {
            this.queueRandomTrack();
            if (this.soundcloud.tracks.length < 10) {
                this.soundcloud.populateTracks(this.genres, this.tags);
            }
            const track = this.pendingTracks.shift();
            this.scheduleNextTrack(track.duration);
        }, duration);
    }
}
