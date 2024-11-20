import React, { useEffect, useState } from "react";
import SensorService from "../service/SensorService";
import "../Style.css";
import "../form.css";

const SensorsPage = () => {
    const [sensors, setSensors] = useState([]);
    const [newSensor, setNewSensor] = useState({ name: "", deviceName: "" });
    const [selectedSensorData, setSelectedSensorData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        loadSensors();
    }, []);

    const loadSensors = async () => {
        try {
            const response = await SensorService.getSensors();
            setSensors(response.data);
        } catch (error) {
            alert(error.response.data);
        }
    };

    const handleCreateSensor = async () => {
        try {
            await SensorService.createSensor(newSensor);
            setNewSensor({ name: "", deviceName: "" });
            loadSensors();
        } catch (error) {
            alert(error.response.data);
        }
    };

    const handleDeleteSensor = async (sensorName) => {
        if (window.confirm(`Do you really want to delete the sensor ${sensorName}?`)) {
            try {
                await SensorService.deleteSensor(sensorName);
                loadSensors();
            } catch (error) {
                alert(error.response.data);
            }
        }
    };

    const openModal = (sensor) => {
        setSelectedSensorData(sensor);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedSensorData(null);
        setIsModalOpen(false);
    };

    return (
        <div>
            <h1>Sensor Manager</h1>

            <h2>All Sensors</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {sensors.map((sensor) => (
                    <li key={sensor.name} style={{ margin: "10px 0", borderBottom: "1px solid #ddd", paddingBottom: "10px" }}>
                        <strong>Sensor Name:</strong> {sensor.name}
                        <button
                            style={{
                                marginLeft: "10px",
                                padding: "5px 10px",
                                cursor: "pointer",
                                backgroundColor: "#007bff",
                                color: "#fff",
                                border: "none",
                                borderRadius: "5px",
                            }}
                            onClick={() => openModal(sensor)}
                        >
                            View Data
                        </button>
                        <button
                            style={{
                                marginLeft: "10px",
                                padding: "5px 10px",
                                cursor: "pointer",
                                backgroundColor: "#dc3545",
                                color: "#fff",
                                border: "none",
                                borderRadius: "5px",
                            }}
                            onClick={() => handleDeleteSensor(sensor.name)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>

            <h2>Create New Sensor</h2>
            <input
                type="text"
                placeholder="Sensor Name"
                value={newSensor.name}
                onChange={(e) => setNewSensor({ ...newSensor, name: e.target.value })}
            />
            <button onClick={handleCreateSensor}>Create Sensor</button>

            {/* Modal */}
            {isModalOpen && selectedSensorData && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1000,
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "#fff",
                            borderRadius: "8px",
                            padding: "20px",
                            width: "500px",
                            maxHeight: "80%",
                            overflowY: "auto",
                        }}
                    >
                        <h2>Sensor Data for: {selectedSensorData.name}</h2>
                        {selectedSensorData.sensorDataDto && selectedSensorData.sensorDataDto.length > 0 ? (
                            <ul>
                                {selectedSensorData.sensorDataDto.map((data, index) => (
                                    <li key={index} style={{ marginBottom: "10px" }}>
                                        <strong>Measured Time:</strong> {data.dataMeasuredTime} <br />
                                        <strong>Temperature:</strong> {data.temperature} °C <br />
                                        <strong>Energy Usage:</strong> {data.usageEnergy} kWh
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No data available for this sensor.</p>
                        )}
                        <button
                            style={{
                                marginTop: "10px",
                                padding: "5px 10px",
                                cursor: "pointer",
                                backgroundColor: "#6c757d",
                                color: "#fff",
                                border: "none",
                                borderRadius: "5px",
                            }}
                            onClick={closeModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SensorsPage;