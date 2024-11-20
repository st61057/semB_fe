import axios from 'axios';
import AuthService from "./AuthService";

const BASE_URL = process.env.REACT_APP_TARGET_DOMAIN + '/api/';

class DeviceService {

    getDevices() {
        return axios.get(BASE_URL + 'all-devices', AuthService.getAuthHeader());
    }

    createDevice(device) {
        return axios.post(BASE_URL + 'device-add', device, AuthService.getAuthHeader());
    }

    addSensorToDevice(deviceSensor) {
        return axios.post(BASE_URL + 'device-add-sensor', deviceSensor, AuthService.getAuthHeader());
    }

    removeSensorFromDevice(deviceSensor) {
        return axios.post(BASE_URL + 'device-remove-sensor', deviceSensor, AuthService.getAuthHeader());
    }

    updateDevice(device) {
        return axios.put(BASE_URL + 'device-update', device, AuthService.getAuthHeader());
    }

    deleteDevice(name) {
        return axios.delete(BASE_URL + 'device-delete/' + name, AuthService.getAuthHeader());
    }
}

export default new DeviceService();