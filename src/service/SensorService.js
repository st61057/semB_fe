import axios from 'axios';
import AuthService from "./AuthService";

const BASE_URL = process.env.REACT_APP_TARGET_DOMAIN + '/api/';

class SensorService {

    getSensors() {
        return axios.get(BASE_URL + 'all-sensors', AuthService.getAuthHeader());
    }

    createSensor(sensor) {
        return axios.post(BASE_URL + 'sensor-add', sensor, AuthService.getAuthHeader());
    }

    updateSensor(sensor) {
        console.log(sensor);
        return axios.put(BASE_URL + 'sensor-update', sensor, AuthService.getAuthHeader());
    }

    deleteSensor(name) {
        return axios.delete(BASE_URL + 'sensor-delete/' + name, AuthService.getAuthHeader());
    }
}

export default new SensorService();