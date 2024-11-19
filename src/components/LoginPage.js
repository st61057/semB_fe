import {useEffect, useState} from "react";
import AuthService from "../service/AuthService";
import {useNavigate} from 'react-router-dom';
import "../Style.css";
import "../form.css";

function Login() {

    const [loginData, setLoginData] = useState({username: "", password: ""});
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.clear();
    }, []);


    const login = async (event) => {
        event.preventDefault();

        try {
            const response = await AuthService.login(loginData);
            localStorage.setItem("userInfo", JSON.stringify(response.data));
            navigate('/')
            window.location.reload();
        } catch (error) {
            alert("Login failed: " + error.response?.data || error.message);
            // setMessage("Login failed: " + error.response?.data || error.message);
        }
    };

    return (
        <div className="container w-50 mx-auto mt-4">
            <h3>Login</h3>
            <hr/>
            <form>
                <div className="form-group row m-3">
                    <label className="col-sm-3 col-form-label">Username</label>
                    <div className="col-sm-7">
                        <input type="text" className="form-control" placeholder="Enter username" name="username"
                               value={loginData.username}
                               onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                               required={true}/>
                    </div>
                </div>
                <div className="form-group row m-3">
                    <label className="col-sm-3 col-form-label">Password</label>
                    <div className="col-sm-7">
                        <input type="password" className="form-control" placeholder="Password" name="password"
                               value={loginData.password}
                               onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                               required={true}/>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary w-25" onClick={login}>Login</button>
            </form>
        </div>
    )
}

export default Login;