const CARDS_EP = '/cards';
const USERS_EP = '/users/me';
const AVATAR = '/avatar';

function getCards(config) {
    return get(config, CARDS_EP);
}

function addCard(config, data) {
    return post(config, CARDS_EP, data);
}

function getMe(config) {
    return get(config, USERS_EP);
}

function updateMe(config, data) {
    return patch(config, USERS_EP + AVATAR, data);
}

function updateAvatar(config, data) {
    return patch(config, USERS_EP, data);
}

function get(config, EP) {
    return fetch(config.baseUrl + EP, {
        method: 'GET',
        headers: config.headers
    }).then(res => {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject({error: res.statusText})
    });
}

function patch(config, EP, data) {
    return fetch(config.baseUrl + EP, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(data)
    }).then(res => {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject({error: res.statusText})
    });
}

function post(config, EP, data) {
    return fetch(config.baseUrl + EP, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(data)
    }).then(res => {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject({error: res.statusText})
    });
}

export {getCards, getMe, updateMe, addCard, updateAvatar};