import config from '../../../config';

const ALPHABETS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 
                   'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 
                   's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const PLAYLIST_ENDPOINT = `http://${config.hostname}/playlist`;
const STREAM_ENDPOINT = `http://${config.hostname}/stream`;

// Remove params that are undefined or empty strings/arrays.
// Array elements are encoded and joined with ','.
function formatParams(params) {
    Object.keys(params).forEach(key => {
        if (params[key] === '' || typeof params[key] === 'undefined') {
            delete params[key];
        } else if (params[key] instanceof Array) {
            if (params[key].length === 0) {
                delete params[key];
            } else {
                params[key] = params[key].map(k => {
                    return encodeURIComponent(k.trim());
                }).join(',');
            }
        }
    });
    return params;
}

function buildUrl(url, params) {
    let pairs = [];
    params = formatParams(params);
    Object.keys(params).map(key => {
        pairs.push(`${key}=${params[key]}`);
    });
    const joinedPairs = pairs.join('&');
    const builtUrl = `${url}?${joinedPairs}`;
    return builtUrl;
}

// Returns date in yyyy-mm-dd hh:mm:ss
function formatDate(date) {
    if (typeof date === 'number') {
        date = new Date(date);
    } else if (!(date instanceof Date)) {
        throw new TypeError('date must be either a Date instance or a number.');
    }
    const year = date.getFullYear();
    const month = padDateComponent(date.getMonth() + 1);
    const day = padDateComponent(date.getDate());
    const hours = padDateComponent(date.getHours());
    const minutes = padDateComponent(date.getMinutes());
    const seconds = padDateComponent(date.getSeconds());
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function buildPlaylist(playlistInfo) {
    const radios = [].concat(playlistInfo);
    let result = '[playlist]\n\n';
    radios.forEach((radio, index) => {
        result += `File${index+1}=${radio.streamUrl}\n`;
        result += `Title${index+1}=${radio.title}\n`;
        result += `Length${index+1}=-1\n\n`;
    });
    result += `NumberOfEntries=${radios.length}\n`;
    result += `Version=2`;
    return result;
}

// Returns the stream info constructed from the specified params
function getStreamInfo(title, genres, tags) {
    const genresArr = genres === '' ? [] : genres.split(',');
    const tagsArr = tags === '' ? [] : tags.split(',');
    let info = { title, genres, tags };
    let params = { genres: genresArr, tags: tagsArr };
    info.streamUrl = buildUrl(STREAM_ENDPOINT, params);
    params.title = title !== '' ? title : 'SoundCloud Radio';
    info.playlistUrl = buildUrl(PLAYLIST_ENDPOINT, params);
    return info;
}

// Returns a date component (eg. month) padded with zeros to be length 2.
// 9 --> 09, 10 --> 10
function padDateComponent(component) {
    return ('0' + component).slice(-2);
}

// Weighs higher numbers more
function getRandomPreferHigher() {
    let r1, r2;
    while (true) {
        r1 = Math.random();
        r2 = Math.random();
        if (r2 < r1) {
            return r1;
        }
    }
}

function getRandomIntPreferHigher(min, max) {
    return Math.floor(getRandomPreferHigher() * (max - min)) + min;
}

// Non-inclusive of max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Returns a random element from an array
function getRandomElement(arr) {
    const index = Math.floor(Math.random() * arr.length);
    return arr[index];
}

function getRandomAlphabet() {
    return getRandomElement(ALPHABETS);
}

export default {
    PLAYLIST_ENDPOINT,
    STREAM_ENDPOINT,
    buildUrl,
    formatDate,
    buildPlaylist,
    getStreamInfo,
    getRandomInt,
    getRandomIntPreferHigher,
    getRandomElement,
    getRandomAlphabet
}
