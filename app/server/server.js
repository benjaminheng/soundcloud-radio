import Express from 'express';
import path from 'path';
import config from '../../config';
import api from './api';

const app = Express();
const port = config.port || 3000;

if (!config.apiKey) {
    console.error('[ERROR] API key not set. Specify your API key by setting the API_KEY environment variable.');
    process.exit(1);
}

if (!config.isProduction) {
    const devMiddleware = require('./devMiddleware').default;
    app.use(devMiddleware());
}

const publicPath = path.join(__dirname, '..', '..', 'dist');
app.use(Express.static(publicPath));
app.use('/', api);

app.get("/", function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

const server = app.listen(port, (error) => {
    if (error) {
        console.error(error);
    } else {
        console.info(`==> Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
    }
});

server.setTimeout(0);
