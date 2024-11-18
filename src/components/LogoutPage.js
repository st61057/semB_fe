import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import AuthService from "../service/AuthService";

function LogoutPage(props) {
    const navigate = useNavigate();

    useEffect(() => {
        // Funkci obalíme do asynchronní funkce uvnitř useEffect
        const performLogout = async () => {
            try {
                const responsed = await AuthService.logout();
                localStorage.removeItem('userInfo');
                props.setLoggedIn(false);
                navigate('/');
                window.location.reload(); // Volitelné, pokud chcete stránku opravdu refreshnout
            } catch (e) {
                alert("Logout failed - " + e.response);
            }
        };

        performLogout();
    });

    return null;
}

export default LogoutPage;
