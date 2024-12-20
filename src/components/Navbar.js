import '../Style.css'
import "../form.css";
import {HashLink as Link} from 'react-router-hash-link';

function Navbar({loggedIn}) {

    return (
        <nav className="navbar bg-light">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    {loggedIn ?
                        <>
                            <li className="nav-item"><Link className="nav-link" to="/devices">Devices</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/sensors">Sensors</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/users">Users</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/currentuser">Current user</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/dashboard">Kibana dashboard</Link></li>
                        </>
                        :
                        <></>
                    }
                </ul>
            </div>

            {loggedIn ?
                <ul className="nav navbar-nav navbar-right">
                    <li className="nav-item"><Link className="nav-link" to="/logout">Logout</Link></li>
                </ul>
                :
                <ul className="nav navbar-nav navbar-right">
                    <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/reset_request">Reset code</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/change_password">Change password</Link>
                    </li>
                </ul>
            }
        </nav>
    )
}

export default Navbar;