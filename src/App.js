import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import {useState} from "react";
import AuthService from "./service/AuthService";
import ChangePasswordPage from "./components/ChangePasswordPage";
import LogoutPage from "./components/LogoutPage";
import DevicesPage from "./components/DevicesPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import ResetRequestPage from "./components/ResetRequestPage";
import SensorsPage from "./components/SensorsPage";
import UsersPage from "./components/UsersPage";

function App() {
    const [loggedIn, setLoggedIn] = useState(AuthService.getUserInfo() !== null);

    return (
        <div className="App">
            <Router>
                <Navbar {...{loggedIn}}/>
                <Routes>
                    {/*<Route path="/" element={<Main/>}/>*/}
                    <Route path="/login" element={<LoginPage {...{setLoggedIn}}/>}/>
                    <Route path="/change_password" element={<ChangePasswordPage/>}/>
                    <Route path="/logout" element={<LogoutPage {...{setLoggedIn}}/>}/>
                    <Route path="/devices" element={<DevicesPage/>}/>
                    <Route path="/sensors" element={<SensorsPage/>}/>
                    <Route path="/users" element={<UsersPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/reset_request" element={<ResetRequestPage/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
