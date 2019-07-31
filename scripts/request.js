function makeRequest(method, url, body) {
    return axios({
        "method": method,
        "url": url,
        "data": body
    });
}