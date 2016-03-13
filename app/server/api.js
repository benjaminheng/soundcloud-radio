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
    let q = req.query.q;
    console.log(`GET /stream --> Genres: ${genres} | Tags: ${tags} | Query: ${q}`);

    const tracks = soundcloud.search(genres, tags, q).then(result => {
        let tracks = [];
        result.map(track => {
            tracks.push({
                username: track.user.username,
                title: track.title,
                stream_url: track.stream_url,
                duration: track.duration,
                id: track.id
            });
            const title = `${track.user.username} - ${track.title}`;
            const url = util.buildUrl(track.stream_url, {client_id: config.apiKey});
            streams.pushUrl(url, title);
        });
    });
});

export default router;
