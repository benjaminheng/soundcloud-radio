import fetch from 'isomorphic-fetch';
import config from '../../config';
import util from '../common/utils/util.js';

const TRACKS_API = 'http://api.soundcloud.com/tracks'

function search(genres, tags, q) {
    let params = {
        client_id: config.apiKey
    };

    if (typeof genres !== 'undefined') {
        params.genres = genres;
    }
    if (typeof tags !== 'undefined') {
        params.tags = tags;
    }
    if (typeof q !== 'undefined') {
        params.q = q;
    }

    const url = util.buildUrl(TRACKS_API, params);
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.json())
            .then(json => resolve(json));
    });
}

export default {
    search
}
