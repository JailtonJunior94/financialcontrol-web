import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://financialcontrol-api.herokuapp.com',
});
