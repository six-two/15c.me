"use strict";

// Configuration options
// They have to mirror the ones used by the react app, and the postbuild script
const APP_PATH = '/shortcuts';
const SHORTCUT_FILE_URL = 'https://15c.me/sc.json';


async function fetchShortcutData(url) {
    try {
        const response = await fetch(url);
        const json = await response.json();
        console.debug("Loaded JSON", json);

        // Map from {'destinationUrl': ['shortcut', 'alias(es)']}
        // to {'shortcut': 'destinationUrl', 'alias(es': 'destinationUrl'}
        const shortcuts = {};
        for (let [dstUrl, sc_list] of Object.entries(json)) {
            if (!Array.isArray(sc_list)) {
                sc_list = [sc_list];
            }
            for (const sc of sc_list) {
                shortcuts[sc] = dstUrl;
            }
        }
        console.debug("Shortcut map", shortcuts);
        return shortcuts;
    } catch (error) {
        console.error(`Failed to fetch "${url}"`, error);
        let output = document.getElementById('output');
        let text = document.createTextNode(`Failed to load "${url}". See console for more infos.`);
        output.appendChild(text);
        return {}
    }
}

const redirectTo = (url) => {
    let output = document.getElementById('output');
    let text = document.createTextNode(`Redirecting to ${url}`);
    output.appendChild(text);

    location.href = url;
}

const decryptAndRedirect = (data) => {
    let originalData = data.slice(7);
    originalData = originalData.replace(/\'/g, '"');

    for (let i = 0; i < 3; i++) {
        const password = prompt('A password is required for this link');
        if (password) {
            try {
                const url = sjcl.decrypt(password, originalData);
                console.log('Decrypted:', url);
                redirectTo(url);
                return;
            } catch (error) {
                console.error('Decrypt failed:', error);
            }
        } else {
            // Exit quietly, user had empty password or pressed cancel
            return;
        }
    }
    alert('Too many wrong attempts!');
}

const handleRedirect = (data) => {
    if (data) {
        if (data.startsWith('crypto|')) {
            decryptAndRedirect(data);
        } else {
            redirectTo(data);
        }
    } else {
        if (path) {
            // 404.html
            let output = document.getElementById('output');
            let div = document.createElement('div');
            div.innerHTML = `<h2>Shortcut does not exist</h2>
									Click <a href="${APP_PATH}">here</a> for a list of valid shortcuts`;
            output.appendChild(div);
        } else {
            // index.html
            location.href = APP_PATH;
        }
    }
}

const path = location.pathname.slice(1);
console.log(`Shortcut name: '${path}'`);
fetchShortcutData(SHORTCUT_FILE_URL).then(json => {
    const data = json[path];
    console.log(`Shortcut data: '${data}'`);

    handleRedirect(data);
});
