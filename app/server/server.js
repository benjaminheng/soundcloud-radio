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

const publicPath = path.join(__dirname, '..', '..', 'dist');
app.use(Express.static(publicPath));
app.use('/', api);

app.listen(port, (error) => {
    if (error) {
        console.error(error);
    } else {
        console.info(`==> Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
    }
});
