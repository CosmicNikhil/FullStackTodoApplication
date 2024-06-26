import { useState } from "react"

import { useNavigate } from "react-router-dom"
import { useAuth } from "./security/AuthContext"
import './cssFiles/LoginComponent.css'; 

function LoginComponent()
{

    const [username,setUsername] = useState('nikhil')
    const [password,setPassword] = useState('')

    const [showErrorMessage,setShowErrorMessage] = useState(false)

    const navigate = useNavigate();

    const authContext = useAuth()

    function hadleUsernameChange(event)
    {
        setUsername(event.target.value);
    }

    function hadlePasswordChange(event)
    {
        setPassword(event.target.value);
    }

    async function handleSubmit(){
        if(await authContext.login(username,password))
        {
            navigate(`/welcome/${username}`);
           
        }
        else
        {
            setShowErrorMessage(true)
        }
    }

  
    return (
        <div className = "Login">
            <h1>Time To Login!!</h1>
            {showErrorMessage &&  <div className = "errorMessage">Authenticated Failed. Please check your credentials</div>}
            <div className = "errorMessage"></div>
            <div className="LoginForm">
                <div>
                    <label>User Name</label>
                    <input type="text" name="username" value = {username} onChange={hadleUsernameChange} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="Password" value={password} onChange = {hadlePasswordChange}/>
                </div>
                <div>
                    <button type="button" name="login" onClick = {handleSubmit} >Login</button>
                </div>
            </div>
        </div>
    )
}



export default LoginComponent