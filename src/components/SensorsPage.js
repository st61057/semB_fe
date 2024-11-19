import React, {useEffect, useState} from "react";
import SensorService from "../service/SensorService";

const SensorsPage = () => {
    const [sensors, setSensors] = useState([]);
    const [newSensor, setNewSensor] = useState({name: "", deviceName: ""});
    const [newSensorData, setNewSensorData] = useState({
        dataMeasuredTime: "",
        temperature: "", usageEnergy: "", sensor: ""
    });
    const [selectedSensor, setSelectedSensor] = useState(null);
    const [originalSensor, setOriginalSensor] = useState(null);
    const [sensorsData, setSensorsData] = useState([]);

    useEffect(() => {
        loadSensors();
    }, []);

    const loadSensors = async () => {
        try {
            const response = await SensorService.getSensors();
            console.log(response.data)
            setSensors(response.data);
        } catch (error) {
            console.error("Error loading sensors:", error);
        }
    };

    const handleCreateSensor = async () => {
        try {
            await SensorService.createSensor(newSensor);
            setNewSensor({name: "", deviceName: ""});
            loadSensors();
        } catch (error) {
            console.error("Error creating sensor:", error);
        }
    };

    const handleUpdateSensor = async () => {
        try {
            await SensorService.updateSensor({
                oldName: originalSensor.name,
                newName: selectedSensor.name,
            });
            setSelectedSensor(null);
            setOriginalSensor(null);
            loadSensors();
        } catch (error) {
            console.error("Error updating sensor:", error);
        }
    };

    const handleDeleteSensor = async (sensorName) => {
        if (window.confirm(`Do you really want to delete the sensor ${sensorName}?`)) {
            try {
                await SensorService.deleteSensor(sensorName);
                loadSensors();
            } catch (error) {
                console.error("Error deleting sensor:", error);
            }
        }
    };

    const fetchSensorDataByName = async (sensorName) => {
        try {
            const response = await SensorService.getSensorDataByName(sensorName);
            setSensorsData(response.data);
        } catch (e) {
            alert(`Error fetching sensor data for "${sensorName}": ${e.message}`);
        }
    };

    const handleAddSensorData = async (e, newSensorData) => {
        e.preventDefault();
        try {
            await SensorService.addSensorData(newSensorData);
        } catch (e) {
            alert(`Error adding sensor data: ${e.message}`);
        }
    };

    return (
        <div>
            <h1>Sensor Manager</h1>

            <h2>All Sensors</h2>
            <ul>
                {sensors.map((sensor) => (
                    <li key={sensor.name}>
                        <strong>{sensor.name}</strong> - Assigned to Device: {sensor.deviceName || "N/A"}
                        <button onClick={() => {
                            setSelectedSensor(sensor);
                            setOriginalSensor(sensor)
                        }}>Edit
                        </button>
                        <button onClick={() => handleDeleteSensor(sensor.name)}>Delete</button>
                    </li>
                ))}
            </ul>

            <h2>All Sensors data</h2>
            <ul>
                {sensorsData.map((sensorData) => (
                    <li key={sensorData.name}>
                        <strong>{sensorData.name}</strong> - Assigned to Device: {sensorData.deviceName || "N/A"}
                    </li>
                ))}
            </ul>

            <h2>Create New Sensor</h2>
            <input
                type="text"
                placeholder="Sensor Name"
                value={newSensor.name}
                onChange={(e) => setNewSensor({...newSensor, name: e.target.value})}
            />
            <button onClick={handleCreateSensor}>Create Sensor</button>

            {selectedSensor && (
                <div>
                    <h2>Edit Sensor</h2>
                    <input
                        type="text"
                        placeholder="Sensor Name"
                        value={selectedSensor.name}
                        onChange={(e) => setSelectedSensor({...selectedSensor, name: e.target.value})}
                    />
                    <button onClick={handleUpdateSensor}>Update Sensor</button>
                </div>
            )}
        </div>
    );
};

export default SensorsPage;