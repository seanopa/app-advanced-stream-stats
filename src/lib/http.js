import axios from "axios";

class Request {

    constructor () {
        axios.defaults.baseURL = 'http://localhost:8000';
    }

    post (url, payload, callback) {
        let headers = {};

        if (url !== '/v1/login') {
            let auth = JSON.parse(localStorage.getItem('auth'));
             headers['X-AUTH-TOKEN'] = auth.token;
        }

        axios
            .post(url, payload, {
                headers
            })
            .then(response => {
                callback(response.data)
            })
    }

    get (url, callback) {
        let auth = JSON.parse(localStorage.getItem('auth'));
        const headers = {
            'X-AUTH-TOKEN': auth.token,
        };
        axios
            .get(url, {
                headers
            })
            .then(response => {
                callback(response.data)
            })

    }
}

const http = new Request()

export default http;