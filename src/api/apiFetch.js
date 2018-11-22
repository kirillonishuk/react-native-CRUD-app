const URL = 'https://api-productlist.herokuapp.com';

import errorScope from './errorsHandler';

export default ({ method, path, id, body, headers }) => {
    const url = `${URL}${path ? '/' + path : ''}${id ? '/' + id : ''}`;
    const fetchOptions = {
        method,
        headers: {}
    };
    if (headers && Object.keys(headers).length)
        fetchOptions.headers = headers;
    else fetchOptions.headers['Content-Type'] = 'application/json';
    if (body && Object.keys(body).length)
        fetchOptions.body = JSON.stringify(body);

    let statusCode;
    

    return fetch(url, fetchOptions)
        .then(res => {
            statusCode = res.status;
            return res.json();
        })
        .then(body => {
            try {
                responseErrorCatcher(statusCode);
            } catch (exep) {
                return Promise.reject(exep);
            }
            return Promise.resolve(body);
        })
        .catch(exep => {
            return Promise.reject(exep);
        })
}

responseErrorCatcher = (statusCode) => {
    const error = errorScope.find(item =>
        item.statusCode == statusCode
    );

    if (error) {
        throw error.message;
    }
}