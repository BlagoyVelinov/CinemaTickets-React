

const request = async (method, url, data, options = {}) => {

    if(method !== 'GET') {
        options.method = method;
    }

    if (data) {
        options = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            body: JSON.stringify(data),
        }
    }

    const response = await fetch(url, options);

    if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('authData');
        window.location.href = '/users/login';
        return;
    }

    const resContentType = response.headers.get('Content-Type');
    let result = null;
    if (resContentType && resContentType.includes('application/json')) {
        result = await response.json();
    }

    if (!response.ok) {
        throw new Error(result?.error || `Request failed with status ${response.status}`);
    }
    
    
    return result;
};

export default {
    get: request.bind(null, 'GET'),
    post: request.bind(null, 'POST'),
    put: request.bind(null, 'PUT'),
    delete: request.bind(null, 'DELETE'),
}