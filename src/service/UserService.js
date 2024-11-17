import axios from 'axios';
import AuthService from "./AuthService";

const BASE_URL = process.env.REACT_APP_TARGET_DOMAIN + '/api/';

class UserService {

    getUserInfo() {
        console.log(BASE_URL + "user-info")
        return axios.get(BASE_URL + "user-info", AuthService.getAuthHeader());
    }

    addDeviceToUser(userDeviceDto) {
        return axios.post(BASE_URL + "user-add-device", userDeviceDto, AuthService.getAuthHeader());
    }

    removeDeviceFromUser(userDeviceDto) {
        return axios.post(BASE_URL + "user-remove-device", userDeviceDto, AuthService.getAuthHeader());
    }

    updateUser(updateUserDto) {
        return axios.put(BASE_URL + "update-user", updateUserDto, AuthService.getAuthHeader());
    }

    changePassword(newPasswordDto) {
        return axios.put(BASE_URL + "change-password", newPasswordDto, AuthService.getAuthHeader());
    }

    deleteUser(username) {
        return axios.delete(BASE_URL + "delete-user/" + username, AuthService.getAuthHeader());
    }
}

export default new UserService();