const ALPHABETS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 
                   'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 
                   's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

// treat params as already encoded
function buildUrl(url, params) {
    let pairs = [];
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
    const month = padDateComponent(date.getMonth());
    const day = padDateComponent(date.getDate());
    const hours = padDateComponent(date.getHours());
    const minutes = padDateComponent(date.getMinutes());
    const seconds = padDateComponent(date.getSeconds());
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Returns a date component (eg. month) padded with zeros to be length 2.
// 9 --> 09, 10 --> 10
function padDateComponent(component) {
    return ('0' + component).slice(-2);
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
    buildUrl,
    formatDate,
    getRandomInt,
    getRandomElement,
    getRandomAlphabet
}
