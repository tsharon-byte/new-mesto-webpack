const CARDS_EP = '/cards';
const USERS_EP = '/users/me';
const AVATAR = '/avatar';
const LIKES_EP = '/cards/likes';

function getCards(config) {
    return get(config, CARDS_EP);
}

function addCard(config, data) {
    return post(config, CARDS_EP, data);
}

function likeCard(config, id) {
    return put(config, LIKES_EP, id);
}

function deleteCardLike(config, id) {
    return del(config, LIKES_EP, id);
}

function deleteCard(config, cardId) {
    return del(config, CARDS_EP, cardId);
}

function getMe(config) {
    return get(config, USERS_EP);
}

function updateMe(config, data) {
    return patch(config, USERS_EP, data);
}

function updateAvatar(config, data) {
    return patch(config, USERS_EP + AVATAR, data);
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

function del(config, ep, id) {
    return fetch(config.baseUrl + ep+ '/' + id, {
        method: 'DELETE',
        headers: config.headers
    }).then(res => {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject({error: res.statusText})
    });
}

function put(config, ep, id) {
    return fetch(config.baseUrl + ep+ '/' + id, {
        method: 'PUT',
        headers: config.headers
    }).then(res => {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject({error: res.statusText})
    });
}

export {getCards, getMe, updateMe, addCard, updateAvatar, deleteCard, likeCard, deleteCardLike};