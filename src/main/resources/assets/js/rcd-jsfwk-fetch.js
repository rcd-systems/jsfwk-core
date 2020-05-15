class RcdFetch {
    static json(input, init = {}) {
        init.headers = init.headers || {};
        init.headers['Content-Type'] = 'application/json';
        return RcdFetch.fetch(input, init)
            .then(response => response && response.json());
    }

    static fetch(input, init = {}) {
        init.credentials = init.credentials || 'same-origin';

        return fetch(input, init)
            .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    throw new Error('Error ' + (response.status == 200 ? '' : response.status) + ': ' + response.statusText);
                }
            })
    }
}