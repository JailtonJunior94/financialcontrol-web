import axios from 'axios';

export const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL_API,
});

api.interceptors.response.use((response) => {
    return response;
}, (error) => {
    const { status } = error.response;
    if (status === 401) {
        localStorage.clear();
        window.location.reload();
        return Promise.reject(error);
    }
    return Promise.reject(error);
})
