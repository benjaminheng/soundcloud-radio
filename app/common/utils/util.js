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

export default {
    buildUrl
}
