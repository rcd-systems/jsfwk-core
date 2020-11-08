class RcdFetch {

    static rcdPostJson(input, body, init = {}) {
        return RcdFetch.postJson(input, init)
            .then(response => response && response.json())
            .then(RcdFetch.handleRcdJsonResponse);
    }

    static handleRcdJsonResponse(result) {
        if (result.error) {
            throw result.error;
        }
        return result.success;
    }

    static postJson(input, body, init = {}) {
        init.headers = init.headers || {};
        init.headers['Content-Type'] = 'application/json';
        init.method = 'POST';
        init.body = JSON.stringify(body)
        return RcdFetch.fetch(input, init);
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