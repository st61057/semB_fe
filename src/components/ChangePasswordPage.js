import React, {useState} from "react";
import AuthService from "../service/AuthService";

const ChangePasswordPage = () => {

    const [changePasswordData, setChangePasswordData] = useState({
        resetCode: "",
        newPassword: "",
    });

    const handleChangePassword = async () => {
        try {
            const response = await AuthService.changePassword(changePasswordData);
            alert("Password changed successfully for user: " + response.data.username);
        } catch (error) {
            alert("Change password failed: " + error.response?.data || error.message);
        }
    };

    return (
        <div>
            <h2>Change Password</h2>
            <input
                type="text"
                placeholder="Reset Code"
                value={changePasswordData.resetCode}
                onChange={(e) =>
                    setChangePasswordData({...changePasswordData, resetCode: e.target.value})
                }
            />
            <input
                type="password"
                placeholder="New Password"
                value={changePasswordData.newPassword}
                onChange={(e) =>
                    setChangePasswordData({...changePasswordData, newPassword: e.target.value})
                }
            />
            <button onClick={handleChangePassword}>Change Password</button>
        </div>
    );
};

export default ChangePasswordPage;