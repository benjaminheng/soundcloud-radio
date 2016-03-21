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

router.get('/playlist', (req, res) => {
    const params = { genres: req.query.genres, tags: req.query.tags };
    const streamUrl = util.buildUrl(util.STREAM_ENDPOINT, params);
    const playlistInfo = {
        title: req.query.title,
        streamUrl: streamUrl 
    }
    const content = util.buildPlaylist(playlistInfo);
    res.setHeader('Content-Type', 'audio/mpegurl');
    res.setHeader('Content-Disposition', `attachment; filename=\"${req.query.title}.pls\"`);
    res.send(content);
    res.end();
});

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
