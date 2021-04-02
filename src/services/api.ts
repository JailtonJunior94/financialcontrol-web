import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://financialcontrol-api.herokuapp.com',
});

// import axios from 'axios';

// export const api = axios.create({
//     baseURL: 'http://localhost:3000',
// });
