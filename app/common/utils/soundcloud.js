import fetch from 'isomorphic-fetch';
import config from '../../../config';
import util from './util';

export default class SoundCloud {
    constructor() {
        this.TRACKS_API = 'http://api.soundcloud.com/tracks'
        this.EARLIEST_DATE = 1356998400000;    // 2013-1-1 00:00:00
        this.MONTH = 2592000000;               // 30 days
        this.WEEK = 604800000;                 // 7 days

        // Track filters
        this.MIN_DURATION = 60*1000;
        this.MAX_DURATION = 600*1000;

        this.tracks = [];
        this.trackIds = [];
    }

    // sort by likes in ascending order
    sortTracks() {
        this.tracks.sort((a, b) => {
            return a.likes_count - b.likes_count;
        });
    }

    getParams(genres, tags, q, from, to) {
        let params = {
            client_id: config.apiKey,
            genres: genres,
            tags: tags,
            q: q,
            'created_at[from]': util.formatDate(from),
            'created_at[to]': util.formatDate(to)
        };

        return params;
    }

    isValid(track) {
        let valid = false;
        // Track duration between MIN_DURATION and MAX_DURATION
        if (track.duration >= this.MIN_DURATION && track.duration <= this.MAX_DURATION) {
            valid = true;
        }
        return valid;
    }

    getRange(period) {
        const interval = new Date().getTime() - period - this.EARLIEST_DATE;
        const from = util.getRandomInt(0, interval) + this.EARLIEST_DATE;
        const to = from + period;
        return {from: from, to: to};
    }

    populateTracks(genres, tags, limit = 50, period = this.WEEK*2) {
        const retry = () => {
            if (this.tracks.length < limit) {
                return this.populateTracks(genres, tags, limit, period);
            }
        }
        return this.searchRandom(genres, tags, null, period).then(retry).catch(retry);
    }

    // Generates a search with the supplied genres and tags as parameters.
    // period: milliseconds of period
    //
    // The following search parameters are randomly generated:
    //      1. query (q) containing a single alphabet
    //      2. created_at[from|to] at a random date with the supplied period
    searchRandom(genres, tags, q, period = this.MONTH) {
        if (!q) {
            q = util.getRandomAlphabet();
        }
        const range = this.getRange(period);
        return this.search(genres, tags, q, range.from, range.to);
    }

    // Uses the SoundCloud API to search for tracks with the supplied parameters.
    // The parameters are assumed to be already urlencoded.
    search(genres, tags, q, from, to) {
        const params = this.getParams(genres, tags, q, from, to);
        const url = util.buildUrl(this.TRACKS_API, params);

        // Push results to this.tracks
        return new Promise((resolve, reject) => {
            fetch(url)
            .then(response => {
                if (response.status >= 400) {
                    reject(`Server response code: ${response.status}`);
                }
                return response.json();
            })
            .then(json => {
                json.forEach(track => {
                    if (this.isValid(track) && this.trackIds.indexOf(track.id) < 0) {
                        this.tracks.push({
                            username: track.user.username,
                            title: track.title,
                            stream_url: track.stream_url,
                            duration: track.duration,
                            id: track.id,
                            likes_count: track.likes_count,
                            playback_count: track.playback_count
                        });
                        this.trackIds.push(track.id);
                    }
                });
                resolve();
            });
        });
    }
}
