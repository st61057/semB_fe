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
        return axios.put(BASE_URL + 'sensor-update', sensor, AuthService.getAuthHeader());
    }

    deleteSensor(name) {
        return axios.delete(BASE_URL + 'sensor-delete/' + name, AuthService.getAuthHeader());
    }

    getAllSensorData() {
        return axios.get(BASE_URL + 'sensor-data', AuthService.getAuthHeader());
    }

    getSensorDataByName(name) {
        return axios.get(BASE_URL + {name}, AuthService.getAuthHeader());
    }

    addSensorData(sensorData) {
        return axios.post(BASE_URL + 'sensor-data-add', sensorData, AuthService.getAuthHeader());
    }

    updateSensorData(sensorData) {
        return axios.put(BASE_URL + 'sensor-data-update', sensorData, AuthService.getAuthHeader());
    }

    deleteSensorData(id) {
        return axios.delete(BASE_URL + `sensor-data-delete/${id}`, AuthService.getAuthHeader());
    }
}

export default new SensorService();