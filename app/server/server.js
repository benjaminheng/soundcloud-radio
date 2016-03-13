import Express from 'express';
import request from 'request';
import fs from 'fs';
import path from 'path';
import config from '../../config';
import Streams from '../common/utils/streams.js';

const app = Express();
const port = config.port || 3000;

if (!config.apiKey) {
    console.error('[ERROR] API key not set. Specify your API key by setting the API_KEY environment variable.');
    process.exit(1);
}

const publicPath = path.join(__dirname, '..', '..', 'dist');
app.use(Express.static(publicPath));

app.get('/stream', function(req, res) {
    console.log('GET /stream');
    res.writeHead(200, {
        'Content-Type': 'audio/mpeg',
        'icy-metadata': 1,
        'icy-metaint': 16000
    });
    const url = 'https://api.soundcloud.com/tracks/96305002/stream?client_id=' + config.apiKey;
    const url2 = 'https://api.soundcloud.com/tracks/92279527/stream?client_id=' + config.apiKey;

    let streams = new Streams(res);
    streams.pushUrl(url, 'The Head and the Heart - Rivers and Roads');
    streams.pushUrl(url2, 'Artist2 - second song');
    streams.pushUrl(url, 'Artist - first song');
    streams.pushUrl(url2, 'Artist2 - second song');
});

app.listen(port, (error) => {
    if (error) {
        console.error(error);
    } else {
        console.info(`==> Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
    }
});
