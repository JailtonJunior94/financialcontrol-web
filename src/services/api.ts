import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:4000',
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
