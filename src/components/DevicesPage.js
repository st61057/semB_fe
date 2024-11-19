import '../Style.css';
import '../form.css';

import AuthService from "../service/AuthService";
import {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import * as React from "react";
import DeviceService from "../service/DeviceService";
import SensorService from "../service/SensorService";

function DevicesPage() {
    const navigate = useNavigate();
    const [devices, setDevices] = useState([]);
    const [sensors, setSensors] = useState([]);
    const [expandedDevice, setExpandedDevice] = useState(null); // State to track expanded device
    const [newDevice, setNewDevice] = useState({name: "", location: ""});
    const [sensorData, setSensorData] = useState({name: "", sensorName: ""}); // Tracks the selected sensor for a device

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

    const handleAddSensorToDevice = async () => {
        try {
            await DeviceService.addSensorToDevice(sensorData);
            setSensorData({name: "", sensorName: ""});
            loadDevices();
        } catch (error) {
            alert(error.response.data || "Error adding sensor to device");
        }
    };

    const handleRemoveSensorFromDevice = async (sensorName, deviceName) => {
        try {
            await DeviceService.removeSensorFromDevice({name: deviceName, sensorName});
            loadDevices();
        } catch (error) {
            alert(error.response.data || "Error removing sensor from device");
        }
    };

    const handleDeleteDevice = async (deviceName) => {
        if (window.confirm(`Do you really want to delete the device ${deviceName}?`)) {
            try {
                await DeviceService.deleteDevice(deviceName);
                loadDevices();
            } catch (error) {
                console.error("Error deleting device:", error);
            }
        }
    };

    const toggleExpandedDevice = (deviceName) => {
        if (expandedDevice === deviceName) {
            setExpandedDevice(null); // Collapse if already expanded
        } else {
            setExpandedDevice(deviceName); // Expand the selected device
        }
    };

    return (
        <div>
            <h1>Device Manager</h1>

            <h2>All Devices</h2>
            <ul>
                {devices.map((device) => (
                    <li
                        key={device.name}
                    >
                        <div
                            onClick={() => toggleExpandedDevice(device.name)}
                        >
                            <div>
                                <strong>Device Name:</strong> {device.name} -{" "}
                                <strong>Location:</strong> {device.location}
                            </div>
                            <div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent triggering the expand toggle
                                        handleDeleteDevice(device.name);
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                        {expandedDevice === device.name && (
                            <div>
                                <h4>Sensors:</h4>
                                {device.sensorsName && device.sensorsName.length > 0 ? (
                                    <table>
                                        <thead>
                                        <tr>
                                            <th>
                                                Sensor Name
                                            </th>
                                            <th>
                                                Actions
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {device.sensorsName.map((sensor, index) => (
                                            <tr key={index}>
                                                <td
                                                >
                                                    {sensor}
                                                </td>
                                                <td
                                                >
                                                    <button
                                                        onClick={() => handleRemoveSensorFromDevice(sensor, device.name)}
                                                    >
                                                        Remove
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p>No sensors assigned to this device.</p>
                                )}
                                <h4>Add Sensor:</h4>
                                <select
                                    value={sensorData.sensorName}
                                    onChange={(e) =>
                                        setSensorData({name: device.name, sensorName: e.target.value})
                                    }
                                >
                                    <option value="">Select Sensor</option>
                                    {sensors.map((sensor) => (
                                        <option key={sensor.name} value={sensor.name}>
                                            {sensor.name}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    onClick={handleAddSensorToDevice}
                                >
                                    Add Sensor
                                </button>
                            </div>
                        )}
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
        </div>
    );
}

export default DevicesPage;
