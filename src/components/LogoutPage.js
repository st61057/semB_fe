import {useNavigate} from 'react-router-dom';
import {useEffect} from "react";
import AuthService from "../service/AuthService";

function LogoutPage(props) {
    const navigate = useNavigate();

    useEffect(() => {
        AuthService.logout().then(res => {
            if (res.status === 200) {
                localStorage.removeItem('userInfo');
                props.setLoggedIn(false);
                navigate('/');
            }
        }).catch(error => {
            alert(error.response.data);
        });
    }, []);

    return (
        <div>
            <div className="card">
                <h1 className="h1">Logged out!</h1>
            </div>
        </div>
    )
}

export default LogoutPage;