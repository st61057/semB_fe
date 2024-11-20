import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import UserService from "../service/UserService";
import AuthService from "../service/AuthService";
import "../Style.css";
import "../form.css";
import DeviceService from "../service/DeviceService";

function UsersPage() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [devices, setDevices] = useState([]);
    const [newDevice, setNewDevice] = useState({username: "", deviceName: ""});
    const [updateUserDto, setUpdateUserDto] = useState({loggedUsername: "", username: "", email: ""});
    const [expandedDevice, setExpandedDevice] = useState(null); // State to track expanded device
    const [passwordData, setPasswordData] = useState({oldPassword: "", newPassword: ""});
    const [registerData, setRegisterData] = useState({username: "", password: "", email: "",});

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        if (AuthService.getUserInfo().username === null) {
            navigate("/");
        } else {
            loadUsers();
            loadDevices()
        }
    }, []);

    const handleRegister = async () => {
        try {
            const response = await AuthService.register(registerData);
            loadUsers();
        } catch (error) {
            alert("Adding user: " + error.response?.data || error.message);
        }
    };

    const loadUsers = async () => {
        try {
            const response = await UserService.getUsers();
            setUsers(response.data);
        } catch (error) {
            console.error(error.data);
        }
    };

    const loadDevices = async () => {
        try {
            const response = await DeviceService.getDevices();
            setDevices(response.data);
        } catch (error) {
            console.error("Error loading devices:", error);
        }
    };

    const handleAddDevice = async () => {
        try {
            const response = await UserService.addDeviceToUser(newDevice);
            setUser(response.data);
            setDevices(response.data.devices || []);
            setNewDevice({deviceName: ""});
            loadUsers();
            loadDevices();
        } catch (error) {
            console.error(error.response);
            alert(error.response?.data || "Failed to add device.");
        }
    };

    const handleRemoveDevice = async (username, deviceName) => {
        try {
            const response = await UserService.removeDeviceFromUser({username, deviceName});
            setUser(response.data);
            setDevices(response.data.devices || []);
            loadUsers();
            loadDevices();
        } catch (error) {
            console.error("Error removing device:", error);
            alert(error.response?.data || "Failed to remove device.");
        }
    };


    const handleChangePassword = async () => {
        try {
            await UserService.changePassword(passwordData);
            setPasswordData({oldPassword: "", newPassword: ""});
            alert("Password changed successfully.");
        } catch (error) {
            console.error("Error changing password:", error);
            alert(error.response?.data || "Failed to change password.");
        }
    };

    const handleEditUser = (user) => {
        setSelectedUser({...user, loggedUsername: user.username});
        setModalOpen(true);
    };

    const handleUpdateUser = async () => {
        try {
            const updateUserRequest = {
                loggedUsername: selectedUser.loggedUsername,
                username: selectedUser.username,
                email: selectedUser.email,
            };
            const response = await UserService.updateUser(updateUserRequest);

            alert("User updated successfully!");
            setModalOpen(false);
            loadUsers();
        } catch (error) {
            console.error("Error updating user:", error);
            alert(error.response?.data || "Failed to update user.");
        }
    };

    const handleDeleteUser = async (username) => {
        if (window.confirm(`Are you sure you want to delete the user ${username}?`)) {
            try {
                await UserService.deleteUser(username);
                alert("User deleted successfully!");
                loadUsers();
            } catch (error) {
                console.error("Error deleting user:", error);
                alert(error.response?.data || "Failed to delete user.");
            }
        }
    };

    const toggleExpandedDevice = (username) => {
        setExpandedDevice((prev) => (prev === username ? null : username));
    };

    return (
        <div className="users-page">
            <h1 className="page-title">Users Management</h1>
            <section>
                <div>
                    <h2>Add user</h2>
                    <input
                        type="text"
                        placeholder="Username"
                        value={registerData.username}
                        onChange={(e) => setRegisterData({...registerData, username: e.target.value})}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={registerData.password}
                        onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={registerData.email}
                        onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                    />
                    <button onClick={handleRegister}>Create user</button>
                </div>
            </section>

            <section>
                <h2>Manage devices on users</h2>
                <ul>
                    {users.map((user) => (
                        <li key={user.username}>
                            <div onClick={() => toggleExpandedDevice(user.username)}>
                                <div>
                                    <strong>Username:</strong> {user.username} - <strong>Email:</strong> {user.email}
                                </div>
                                <div>
                                    <button
                                        className="edit-button"
                                        onClick={() => handleEditUser(user)}
                                    >Edit
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent triggering the expand toggle
                                            handleDeleteUser(user.username);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                            {expandedDevice === user.username && (
                                <div>
                                    <h4>Devices:</h4>
                                    {user.devices && user.devices.length > 0 ? (
                                        <table>
                                            <thead>
                                            <tr>
                                                <th>Device Name</th>
                                                <th>Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {user.devices.map((device, index) => (
                                                <tr key={device.id || index}>
                                                    <td>{device.name}</td>
                                                    <td>
                                                        <button
                                                            onClick={() =>
                                                                handleRemoveDevice(user.username, device.name)
                                                            }
                                                        >
                                                            Remove
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <p>No devices assigned to this user.</p>
                                    )}

                                    <h4>Add Device:</h4>
                                    <select
                                        value={newDevice.deviceName}
                                        onChange={(e) =>
                                            setNewDevice({
                                                username: user.username,
                                                deviceName: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="">Select Device</option>
                                        {devices.map((device, index) => (
                                            <option key={device.id || `${device.name}-${index}`} value={device.name}>
                                                {device.name}
                                            </option>
                                        ))}
                                    </select>
                                    <button onClick={handleAddDevice}>Add Device</button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </section>


            {modalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Edit User</h2>
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                value={selectedUser.username}
                                onChange={(e) =>
                                    setSelectedUser({
                                        ...selectedUser,
                                        username: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                value={selectedUser.email}
                                onChange={(e) =>
                                    setSelectedUser({
                                        ...selectedUser,
                                        email: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="modal-actions">
                            <button
                                className="save-button"
                                onClick={handleUpdateUser}
                            >
                                Save Changes
                            </button>
                            <button
                                className="cancel-button"
                                onClick={() => setModalOpen(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UsersPage;
