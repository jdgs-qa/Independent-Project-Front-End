function makeRequest(method, url, body) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status <= 299) {
                resolve(xhr.responseText);
            } else {
                reject('Error!: ' + xhr.responseText);
            }
        };
        xhr.open(method, url)
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(body || null);
    });
}

// function makeRequestNoPromise(method, url, body) {
//     const xhr = new XMLHttpRequest();
//     xhr.open(method, url);
//     xhr.setRequestHeader('Content-Type', 'application/json');
//     xhr.send(body || null);
//     const response = xhr.responseText;
//     sessionStorage.setItem('response', response)
//     return true;

// }
// function makeRequestJSON(method, url, body) {
//     return new Promise((resolve, reject) => {
//         const xhr = new XMLHttpRequest();
//         xhr.onload = () => {
//             if (xhr.status >= 200 && xhr.status <= 299) {
//                 resolve(JSON.parse(xhr.responseText));
//             } else {
//                 reject('Error!: ' + xhr.responseText);
//             }
//         };
//         xhr.open(method, url)
//         xhr.setRequestHeader('Content-Type', 'application/json');
//         if (method === 'POST') {
//             xhr.send(body);
//         } else {
//             xhr.send();
//         }
//     });
// }