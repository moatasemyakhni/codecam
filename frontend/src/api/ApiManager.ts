import axios from 'axios';

export const apiManager = axios.create({
    baseURL: 'http://192.168.56.1:3500',
    timeout: 8000,
    headers: {
        'Content-Type': 'application/json'
    }

});