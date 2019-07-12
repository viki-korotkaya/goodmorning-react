import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://goodmorning-react.firebaseio.com/'
});

export default instance;