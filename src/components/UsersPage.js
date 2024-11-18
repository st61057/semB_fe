import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import UserService from "../service/UserService";
import AuthService from "../service/AuthService";

function UsersPage() {
    const navigate = useNavigate();

    // Stavy pro správu dat
    const [user, setUser] = useState(null);
    const [userDevices, setUserDevices] = useState([]);
    const [newDevice, setNewDevice] = useState({username: "", deviceName: ""});
    const [updateUserDto, setUpdateUserDto] = useState({loggedUsername: "", username: "", email: ""});
    const [passwordData, setPasswordData] = useState({oldPassword: "", newPassword: ""});

    // Načítání dat při načtení komponenty
    useEffect(() => {
        if (AuthService.getUserInfo().username === null) {
            navigate("/");
        } else {
            loadUserInfo();
        }
    });

    // Načte informace o uživateli
    const loadUserInfo = async () => {
        try {
            const response = await UserService.getUserInfo();
            setUser(response.data);
            setUserDevices(response.data.devices || []);
        } catch (error) {
            console.error(error);
        }
    };

    // Přidá zařízení uživateli
    const handleAddDevice = async () => {
        try {
            const response = await UserService.addDeviceToUser(newDevice); // Volání API
            console.log("Response from addDeviceToUser:", response.data); // Log odpovědi
            setUser(response.data);
            setUserDevices(response.data.devices || []);
            setNewDevice({deviceName: ""});
        } catch (error) {
            console.error(error.response);
            alert(error.response?.data || "Failed to add device.");
        }
    };

    // Odebere zařízení od uživatele
    const handleRemoveDevice = async (username, deviceName) => {
        console.log(username, deviceName);
        try {
            const response = await UserService.removeDeviceFromUser({username, deviceName});
            setUser(response.data);
            setUserDevices(response.data.devices || []);
        } catch (error) {
            console.error("Error removing device:", error);
            alert(error.response?.data || "Failed to remove device.");
        }
    };

    // Aktualizuje informace o uživateli
    const handleUpdateUser = async () => {
        try {
            updateUserDto.loggedUsername = user.username;
            const response = await UserService.updateUser(updateUserDto);
            setUser(response.data);
            setUpdateUserDto({username: "", email: ""});
            alert("User information updated successfully.");
        } catch (error) {
            console.error("Error updating user info:", error);
            alert(error.response?.data || "Failed to update user info.");
        }
    };

    // Změní heslo uživatele
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

    // Smaže uživatele
    const handleDeleteUser = async () => {
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

    return (
        <div>
            <h1>User Management</h1>

            {user && (
                <div>
                    <h2>Current User Information</h2>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
            )}

            <h2>User Devices</h2>
            <ul>
                {userDevices.map((device) => (
                    <li key={device.name}>
                        <strong>{device.name}</strong>
                        <button onClick={() => handleRemoveDevice(user.username, device.name)}>Remove</button>
                    </li>
                ))}
            </ul>

            <h2>Add Device</h2>
            <input
                type="text"
                placeholder="Device Name"
                value={newDevice.deviceName}
                onChange={(e) => setNewDevice({username: user.username, deviceName: e.target.value})}
            />
            <button onClick={handleAddDevice}>Add Device</button>

            <h2>Update User Information</h2>
            <input
                type="text"
                placeholder="New Username"
                value={updateUserDto.username}
                onChange={(e) => setUpdateUserDto({...updateUserDto, username: e.target.value})}/>
            <input
                type="email"
                placeholder="New Email"
                value={updateUserDto.email}
                onChange={(e) => setUpdateUserDto({...updateUserDto, email: e.target.value})}/>
            <button onClick={handleUpdateUser}>Update User Info</button>

            <h2>Change Password</h2>
            <input
                type="password"
                placeholder="Old Password"
                value={passwordData.oldPassword}
                onChange={(e) => setPasswordData({...passwordData, oldPassword: e.target.value})}
            />
            <input
                type="password"
                placeholder="New Password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
            />
            <button onClick={handleChangePassword}>Change Password</button>

            <h2>Delete Account</h2>
            <button onClick={handleDeleteUser} style={{color: "red"}}>
                Delete My Account
            </button>
        </div>
    );
}

export default UsersPage;

