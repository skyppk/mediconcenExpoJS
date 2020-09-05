import axios from 'axios';

const service = axios.create({
    baseURL: 'http://192.168.50.76:3000',
    timeout: 20000,
    headers: {
        "Content-Type": 'application/x-www-form-urlencoded'
    },
});

export default service