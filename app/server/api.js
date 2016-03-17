import Express from 'express';
import util from '../common/utils/util.js';
import Radio from '../common/utils/radio.js';
import config from '../../config';

const router = Express.Router();

const STREAM_HEADERS = {
    'Content-Type': 'audio/mpeg',
    'icy-metadata': 1,
    'icy-metaint': 16000
}

router.get('/stream', (req, res) => {
    res.writeHead(200, STREAM_HEADERS);
    const genres = req.query.genres;
    const tags = req.query.tags;
    console.log(`GET /stream --> Genres: ${genres} | Tags: ${tags}`);

    const radio = new Radio(res, genres, tags);

    radio.start();

    res.on('close', () => {
        console.log('Response closed');
        radio.kill();
    });
});

export default router;
