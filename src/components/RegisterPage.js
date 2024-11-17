import React, {useState} from "react";
import AuthService from "../service/AuthService";
import {useNavigate} from "react-router-dom";

function Register() {

    const [registerData, setRegisterData] = useState({
        username: "",
        password: "",
        email: "",
    });
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const response = await AuthService.register(registerData);
            navigate('/');
        } catch (error) {
            alert("Registration failed: " + error.response?.data || error.message);
        }
    };

    return (<div>
        <h2>Register</h2>
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
        <button onClick={handleRegister}>Register</button>
    </div>)
}

export default Register;