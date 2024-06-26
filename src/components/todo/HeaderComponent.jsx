import {Link} from 'react-router-dom'
import { useAuth } from './security/AuthContext'
import './cssFiles/HeaderComponent.css'



function HeaderComponent()
{
    const authContext = useAuth()
    const isAuthenticated = authContext.isAuthenticated

    function logout()
    {
        authContext.logout()
    }
    //console.log(authContext);

    //bootStrap Framework
    return (
        <header className="border-bottom border-light border-5 mb-5 p-2">
        <div className="container">
            <div className="row">
                <nav className="navbar navbar-expand-lg">
                <span className="navbar-brand" style={{
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            color: '#000000',
                            textShadow: '2px 2px #ececec',
                            padding: '0.5rem'
                            }}>Nikhil</span>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            <li className="nav-item fs-5">
                               {isAuthenticated && <Link className="nav-link" to="/welcome/nikhil">Home</Link>}
                            </li>
                            <li className="nav-item fs-5">
                                {isAuthenticated && <Link className="nav-link" to="/todos">Todos</Link>}
                            </li>
                        </ul>
                    </div>
                    <ul className="navbar-nav">
                        <li className="nav-item fs-5">
                            {!isAuthenticated && <Link className="nav-link" to="/login">Login</Link>}
                        </li>
                        <li className="nav-item fs-5">
                            {isAuthenticated && <Link className="nav-link" to="/logout" onClick = {logout}>Logout</Link>}
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>
    )
}

export default HeaderComponent