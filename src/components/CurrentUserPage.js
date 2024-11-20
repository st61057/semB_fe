import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import UserService from "../service/UserService";
import AuthService from "../service/AuthService";
import "../Style.css";
import "../form.css";

function CurrentUserPage() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [userDevices, setUserDevices] = useState([]);
    const [newDevice, setNewDevice] = useState({username: "", deviceName: ""});
    const [updateUserDto, setUpdateUserDto] = useState({loggedUsername: "", username: "", email: ""});
    const [passwordData, setPasswordData] = useState({oldPassword: "", newPassword: ""});
    const [registerData, setRegisterData] = useState({username: "", password: "", email: "",});

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        if (AuthService.getUserInfo().username === null) {
            navigate("/");
        } else {
            loadUserInfo();
            loadUsers();
        }
    }, []);

    const handleRegister = async () => {
        try {
            const response = await AuthService.register(registerData);
        } catch (error) {
            alert("Adding user: " + error.response?.data || error.message);
        }
    };

    const loadUserInfo = async () => {
        try {
            const response = await UserService.getUserInfo();
            setUser(response.data);
            setUserDevices(response.data.devices || []);
        } catch (error) {
            console.error(error);
        }
    };

    const loadUsers = async () => {
        try {
            const response = await UserService.getUsers();
            setUsers(response.data);
        } catch (error) {
            console.error("Error loading users:", error);
        }
    };

    const handleAddDevice = async () => {
        try {
            const response = await UserService.addDeviceToUser(newDevice);
            setUser(response.data);
            setUserDevices(response.data.devices || []);
            setNewDevice({deviceName: ""});
        } catch (error) {
            console.error(error.response);
            alert(error.response?.data || "Failed to add device.");
        }
    };

    const handleRemoveDevice = async (username, deviceName) => {
        try {
            const response = await UserService.removeDeviceFromUser({username, deviceName});
            setUser(response.data);
            setUserDevices(response.data.devices || []);
        } catch (error) {
            console.error("Error removing device:", error);
            alert(error.response?.data || "Failed to remove device.");
        }
    };

    const handleUpdateCurrentUser = async () => {
        try {
            updateUserDto.loggedUsername = user.username;

            const updatedUsername = updateUserDto.username || user.username;
            const updatedEmail = updateUserDto.email || user.email;

            if (updatedUsername === user.username && updatedEmail === user.email) {
                alert("No changes were made to the user information.");
                return;
            }

            const updatePayload = {
                loggedUsername: updateUserDto.loggedUsername,
                username: updatedUsername,
                email: updatedEmail,
            };

            console.log(updatePayload);

            const response = await UserService.updateUser(updatePayload);

            setUser(response.data);
            setUpdateUserDto({username: "", email: ""});
            alert("User information updated successfully.");
        } catch (error) {
            console.error(error.response?.data || error.message);
            alert(error.response?.data || "Failed to update user info.");
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

    const handleDeleteCurrentUser = async () => {
        if (window.confirm("Are you sure you want to delete your account?")) {
            try {
                await UserService.deleteUser(user.username);
                AuthService.logout();
                navigate("/");
            } catch (error) {
                console.error("Error deleting user:", error);
                alert(error.response?.data || "Failed to delete user.");
            }
        }
    };

    const handleEditUser = (user) => {
        setSelectedUser(user);
        setModalOpen(true);
    };

    const handleUpdateUser = async () => {
        try {
            const updateUserRequest = {
                loggedUsername: user.username,
                username: selectedUser.username,
                email: selectedUser.email,
            };

            console.log(updateUserRequest);

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

    return (
        <div className="users-page">
            <h1 className="page-title">User Management</h1>

            {user && (
                <section className="user-info">
                    <h2>Current User Information</h2>
                    <p>
                        <strong>Username:</strong> {user.username}
                    </p>
                    <p>
                        <strong>Email:</strong> {user.email}
                    </p>
                </section>
            )}

            <section className="user-devices">
                <h2>User Devices</h2>
                {userDevices.length > 0 ? (
                    <ul className="device-list">
                        {userDevices.map((device) => (
                            <li key={device.name} className="device-item">
                                <span>{device.name}</span>
                                <button
                                    className="remove-button"
                                    onClick={() => handleRemoveDevice(user.username, device.name)}
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No devices assigned.</p>
                )}
            </section>

            <section className="add-device">
                <h2>Add Device</h2>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Device Name"
                        value={newDevice.deviceName}
                        onChange={(e) =>
                            setNewDevice({username: user.username, deviceName: e.target.value})
                        }
                    />
                    <button onClick={handleAddDevice} className="add-button">
                        Add Device
                    </button>
                </div>
            </section>

            <section className="update-user">
                <h2>Update Current User Information</h2>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="New Username"
                        value={updateUserDto.username}
                        onChange={(e) =>
                            setUpdateUserDto({...updateUserDto, username: e.target.value})
                        }
                    />
                    <input
                        type="email"
                        placeholder="New Email"
                        value={updateUserDto.email}
                        onChange={(e) =>
                            setUpdateUserDto({...updateUserDto, email: e.target.value})
                        }
                    />
                    <button onClick={handleUpdateCurrentUser} className="update-button">
                        Update Info
                    </button>
                </div>
            </section>

            <section className="delete-account">
                <h2>Delete my account</h2>
                <button onClick={handleDeleteCurrentUser} className="delete-button">
                    Delete my account
                </button>
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

export default CurrentUserPage;
