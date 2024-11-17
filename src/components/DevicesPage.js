// import './style.css';
import AuthService from "../service/AuthService";
import {useEffect, useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import * as React from "react";
import DeviceService from "../service/DeviceService";
import SensorService from "../service/SensorService";

function DevicesPage() {

    const navigate = useNavigate();
    const [devices, setDevices] = useState([]);
    const [newDevice, setNewDevice] = useState({name: "", location: ""});
    const [sensorData, setSensorData] = useState({name: "", sensorName: ""});
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [sensors, setSensors] = useState([]);

    useEffect(() => {
        if (AuthService.getUserInfo().username === null) {
            navigate('/');
        }
        loadDevices();
        loadSensors();
    }, []);

    const loadDevices = async () => {
        try {
            const response = await DeviceService.getDevices();
            setDevices(response.data);
        } catch (error) {
            console.error("Error loading devices:", error);
        }
    };

    const loadSensors = async () => {
        try {
            const response = await SensorService.getSensors();
            setSensors(response.data);
        } catch (error) {
            console.error("Error loading sensors:", error);
        }
    };

    const handleCreateDevice = async () => {
        try {
            await DeviceService.createDevice(newDevice);
            setNewDevice({name: "", location: ""});
            loadDevices();
        } catch (error) {
            console.error("Error creating device:", error);
        }
    };

    const handleAddSensor = async () => {
        try {
            await DeviceService.addSensorToDevice(sensorData);
            setSensorData({name: "", sensorName: ""});
            loadDevices();
        } catch (error) {
            console.log(error.response.data);
            alert(error.response.data);
        }
    };

    const handleRemoveSensor = async () => {
        try {
            await DeviceService.removeSensorFromDevice(sensorData);
            setSensorData({deviceName: "", sensorName: ""});
            loadDevices();
        } catch (error) {
            console.log(error.response.data);
            alert(error.response.data);
        }
    };

    const handleUpdateDevice = async () => {
        try {
            await DeviceService.updateDevice(selectedDevice);
            setSelectedDevice(null);
            loadDevices();
        } catch (error) {
            console.error("Error updating device:", error);
        }
    };

    const handleDeleteDevice = async (deviceName) => {
        try {
            await DeviceService.deleteDevice(deviceName);
            loadDevices();
        } catch (error) {
            console.error("Error deleting device:", error);
        }
    };

    return (
        <div>
            <h1>Device Manager</h1>

            <h2>All Devices</h2>
            <ul>
                {devices.map((device) => (
                    <li key={device.name}>
                        Device name: {device.name} - Location: - {device.location} - Sensors:{" "}
                        {device.sensorsName && device.sensorsName.length > 0 ? device.sensorsName.join(", ") : "No sensors assigned"}
                        <button onClick={() => setSelectedDevice(device)}>Edit</button>
                        <button onClick={() => handleDeleteDevice(device.name)}>Delete</button>
                    </li>
                ))}
            </ul>

            <h2>Create New Device</h2>
            <input
                type="text"
                placeholder="Device Name"
                value={newDevice.name}
                onChange={(e) => setNewDevice({...newDevice, name: e.target.value})}
            />
            <input
                type="text"
                placeholder="Device Location"
                value={newDevice.location}
                onChange={(e) => setNewDevice({...newDevice, location: e.target.value})}
            />
            <button onClick={handleCreateDevice}>Create Device</button>

            <h2>Add Sensor to Device</h2>
            <select
                value={sensorData.name}
                onChange={(e) => setSensorData({
                    ...sensorData,
                    name: e.target.value
                })} // Aktualizace stavu při změně
            >
                <option value="">Select device</option>
                {devices.map((device) => (
                    <option key={device.name} value={device.name}>
                        {device.name}
                    </option>
                ))}
            </select>

            <select
                value={sensorData.sensorName} // Hodnota vybraného senzoru
                onChange={(e) => setSensorData({
                    ...sensorData,
                    sensorName: e.target.value
                })} // Aktualizace stavu při změně
            >
                <option value="">Select a sensor</option>
                {sensors.map((sensor) => (
                    <option key={sensor.name} value={sensor.name}>
                        {sensor.name}
                    </option>
                ))}
            </select>
            <button onClick={handleAddSensor}>Add Sensor</button>
            <button onClick={handleRemoveSensor}>Remove Sensor</button>

            {selectedDevice && (
                <div>
                    <h2>Edit Device</h2>
                    <input
                        type="text"
                        placeholder="Device Name"
                        value={selectedDevice.name}
                        onChange={(e) => setSelectedDevice({...selectedDevice, name: e.target.value})}
                    />
                    <input
                        type="text"
                        placeholder="Device Location"
                        value={selectedDevice.location}
                        onChange={(e) => setSelectedDevice({...selectedDevice, location: e.target.value})}
                    />
                    <button onClick={handleUpdateDevice}>Update Device</button>
                </div>
            )}
        </div>
    );
};

export default DevicesPage;
