import Express from 'express';
import Streams from '../common/utils/streams.js';
import SoundCloud from './soundcloud';
import util from '../common/utils/util.js';
import config from '../../config';

const router = Express.Router();

function queueRandomTrack(streams, soundcloud) {
    const index = util.getRandomInt(0, soundcloud.tracks.length);
    const track = soundcloud.tracks.splice(index, 1)[0];
    const title = `${track.username} - ${track.title}`;
    const url = util.buildUrl(track.stream_url, {client_id: config.apiKey});
    streams.pushUrl(url, title);
}

router.get('/stream', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'audio/mpeg',
        'icy-metadata': 1,
        'icy-metaint': 16000
    });
    const streams = new Streams(res);

    let genres = req.query.genres;
    let tags = req.query.tags;
    console.log(`GET /stream --> Genres: ${genres} | Tags: ${tags}`);

    const soundcloud = new SoundCloud();

    res.on('close', () => {
        console.log('Response closed');
    });

    soundcloud.searchRandom(genres, tags, 'e').then(() => {
        queueRandomTrack(streams, soundcloud);
        return soundcloud.populateTracks(genres, tags);
    }).then(() => {
        queueRandomTrack(streams, soundcloud);
        queueRandomTrack(streams, soundcloud);
        queueRandomTrack(streams, soundcloud);
        console.log('done -> ' + soundcloud.tracks.length);
    }).catch(err => {
        console.log('Error -> ' + err);
    });
});

export default router;
