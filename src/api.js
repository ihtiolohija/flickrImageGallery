import axios from 'axios';

export default function RestAPI() {
    let configs = {
        timeout: 5000,
        headers: {'Content-Type': 'application/json'}
    };
    return axios.create(configs);
}