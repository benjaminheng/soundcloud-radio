import Express from 'express';
import Streams from '../common/utils/streams.js';
import soundcloud from './soundcloud';
import util from '../common/utils/util.js';
import config from '../../config';

const router = Express.Router();

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

    let tracks = [];

    soundcloud.searchRandom(genres, tags, 'e').then(results => {
        results.forEach(track => {
            tracks.push({
                username: track.user.username,
                title: track.title,
                stream_url: track.stream_url,
                duration: track.duration,
                id: track.id,
                likes_count: track.likes_count,
                playback_count: track.playback_count
            });
        });
        const track = util.getRandomElement(tracks);
        const title = `${track.username} - ${track.title}`;
        const url = util.buildUrl(track.stream_url, {client_id: config.apiKey});
        streams.pushUrl(url, title);
    }).catch(err => {
        console.log('Error -> ' + err);
    });
});

export default router;
