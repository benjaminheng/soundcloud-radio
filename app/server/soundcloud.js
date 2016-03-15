import fetch from 'isomorphic-fetch';
import config from '../../config';
import util from '../common/utils/util.js';

export default class SoundCloud {
    constructor() {
        this.TRACKS_API = 'http://api.soundcloud.com/tracks'
        this.EARLIEST_DATE = 1356998400000;    // 2013-1-1 00:00:00
        this.MONTH = 2592000000;               // 30 days
        this.WEEK = 604800000;                 // 7 days
    }

    getParams(genres, tags, q, from, to) {
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
        if (typeof from !== 'undefined') {
            params['created_at[from]'] = util.formatDate(from);
        }
        if (typeof to !== 'undefined') {
            params['created_at[to]'] = util.formatDate(to);
        }

        return params;
    }

    // Generates a search with the supplied genres and tags as parameters.
    // period: milliseconds of period
    //
    // The following search parameters are randomly generated:
    //      1. query (q) containing a single alphabet
    //      2. created_at[from|to] at a random date with the supplied period
    searchRandom(genres, tags, q, period = this.MONTH) {
        if (typeof q === 'undefined') {
            q = util.getRandomAlphabet();
        }
        const range = new Date().getTime() - period - this.EARLIEST_DATE;
        const from = util.getRandomInt(0, range) + this.EARLIEST_DATE;
        const to = from + period;
        return this.search(genres, tags, q, from, to);
    }

    // Uses the SoundCloud API to search for tracks with the supplied parameters.
    // The parameters are assumed to be already urlencoded.
    search(genres, tags, q, from, to) {
        const params = this.getParams(genres, tags, q, from, to);

        const url = util.buildUrl(this.TRACKS_API, params);
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response => response.json())
                .then(json => resolve(json));
        });
    }
}
