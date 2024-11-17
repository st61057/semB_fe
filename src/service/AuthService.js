import axios from 'axios';

const BASE_URL = process.env.REACT_APP_TARGET_DOMAIN + '/public/';

class AuthService {

    login(username, password) {
        return axios.post(BASE_URL + "login", username, password);
    };

    logout() {
        return axios.post(BASE_URL + 'logout', {}, null);
    };

    register(user) {
        return axios.post(BASE_URL + 'register', user);
    }

    sendResetCode(username) {
        console.log(username);
        return axios.post(BASE_URL + 'reset-request/' + username);
    }

    changePassword(changePassword) {
        return axios.put(BASE_URL + 'change-password', changePassword);
    }

    getUserInfo() {
        return JSON.parse(localStorage.getItem("userInfo"));
    }

    getAuthHeader() {
        return {headers: {Authorization: 'Bearer ' + this.getUserInfo().token}};
    }

}

export default new AuthService();