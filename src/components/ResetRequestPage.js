import React, {useState} from "react";
import AuthService from "../service/AuthService";

function ResetRequest() {

    const [resetUsername, setResetUsername] = useState("");

    const handleSendResetCode = async () => {
        try {
            const response = await AuthService.sendResetCode(resetUsername);
            alert("Reset code sent successfully to: " + response.data.email);
        } catch (error) {
            alert("Reset request failed: " + error.response?.data || error.message);
        }
    };

    return (<div>
        <h2>Send Reset Code</h2>
        <input
            type="text"
            placeholder="Username"
            value={resetUsername}
            onChange={(e) => setResetUsername(e.target.value)}
        />
        <button onClick={handleSendResetCode}>Send Reset Code</button>
    </div>);

}

export default ResetRequest;