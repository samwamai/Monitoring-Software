import axios from 'axios';
import store from '../src/stores/store'

// DONT SET TOKEN HERE OTHERWISE WONT UPDATE UNTILL BROSER REFRESH
const axioWithToken = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});
const axioFilesWithToken = axios.create({
    baseURL: 'http://localhost:3000/',
    responseType: 'blob',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});
const axioNoToken = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

axioWithToken.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error)
);
axioFilesWithToken.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error)
);

// UPDATE TOKEN FOR EACH REQUEST
axioWithToken.interceptors.request.use(
    config => {
        config.headers['x-access-token'] = store.getters.token;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
axioFilesWithToken.interceptors.request.use(
    config => {
        config.headers['x-access-token'] = store.getters.token;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


const responseHandler = response => {
    // if unauthorize logout
    if (response.status === 401) {
        store.dispatch('logout');
    }
    return response;
};
const errorHandler = error => {
    // if unauthorize logout
    if (error.response.status === 401) {
        store.dispatch('logout');
    }
    return Promise.reject(error);
};

export default {
    axioWithToken,
    axioFilesWithToken,
    axioNoToken
};
