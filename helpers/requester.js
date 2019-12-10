const baseUrl = 'https://baas.kinvey.com';
const appKey = 'kid_HJqoM0_6H';
const appSecret = '520d0d641b24496ea9171a3c920a9461';

function createAuthorization(type) {
    return type === 'Basic' 
        ? `Basic ${btoa(`${appKey}:${appSecret}`)}`
        : `Kinvey ${sessionStorage.getItem('authtoken')}`
}

function createHeaders(type, httpMethod, data) {
    const headers = {
        method: httpMethod,
        headers: {
            'Authorization': createAuthorization(type),
            'Content-Type': 'application/json',
        },
    }

    if (httpMethod === 'POST' || httpMethod === 'PUT') {
        headers.body = JSON.stringify(data);
    }

    return headers;
}

function deserializeData(x) {
    if(x.status === 204) {
        return x;
    }

    return x.json();
}

function handleError(e) {
    if(!e.ok && e.status !== 401) {
        throw new Error(e.status);
    }

    //????? unnecessary check
    if(e.status === 204) {
        return e;
    }

    return e;
}

function createPromise(kinveyModule, endPoint, headers) {
    const url = `${baseUrl}/${kinveyModule}/${appKey}/${endPoint}`;

    return fetch(url, headers)
        .then(handleError)
        .then(deserializeData);
}

export function get(kinveyModule, endPoint, type) {
    const headers = createHeaders(type, 'GET');
    return createPromise(kinveyModule, endPoint, headers);
}

export function post(kinveyModule, endPoint, data, type) {
    const headers = createHeaders(type, 'POST', data);
    return createPromise(kinveyModule, endPoint, headers);
}

export function put(kinveyModule, endPoint, data, type) {
    const headers = createHeaders(type, 'PUT', data);
    return createPromise(kinveyModule, endPoint, headers);
}

export function del(kinveyModule, endPoint, type) {
    const headers = createHeaders(type, 'DELETE');
    return createPromise(kinveyModule, endPoint, headers);
}