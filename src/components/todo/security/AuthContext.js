
import { createContext,useContext, useState } from "react";
import { executeJwtAuthenticationService } from "../nikhilapi/AuthenticationApiService";
import { apiClient } from "../nikhilapi/ApiClient";




//Create a context
export const AuthContext = createContext() 

export const useAuth = () => useContext(AuthContext)

//Share the created context with the other components
export default function AuthProvider({children})
{
    //3:Put a some state in the context
    const[isAuthenticated,SetAuthenticated] = useState(false)

    const[username,setUsername] = useState(null)

    const[token,setToken] = useState(null)

    // async function login(username,password)
    // {
    //     //basic Encoding() base-64 encoding)
    //     const baToken = 'Basic ' + window.btoa(username + ":" + password)

    //     try{
    //         const response = await executeBasicAuthenticationService(baToken)

    //     if(response.status == 200)
    //     {
    //         SetAuthenticated(true)
    //         setUsername(username)
    //         setToken(baToken)

    //         //to enable other services use authorisation
    //         //adding authorisation header tokens to each of the apis
    //         apiClient.interceptors.request.use(
    //             (config) => {
    //                 console.log('intercepting and adding a token')
    //                 config.headers.Authorization = baToken
    //                 return config
    //             }
    //         )

    //         return true
    //     }
    //     else
    //     {
    //         logout()
    //         return false
    //     }
    //     }
    //     catch(error)
    //     {
    //         logout()
    //         return false
    //     }

    // }

    async function login(username,password)
    {
        //basic Encoding() base-64 encoding)
        
        try{
            const response = await executeJwtAuthenticationService(username,password)

        if(response.status == 200)
        {

            const jwtToken = 'Bearer ' + response.data.token

            SetAuthenticated(true)
            setUsername(username)
            setToken(jwtToken)

            //to enable other services use authorisation
            //adding authorisation header tokens to each of the apis
            apiClient.interceptors.request.use(
                (config) => {
                    console.log('intercepting and adding a token')
                    config.headers.Authorization = jwtToken
                    return config
                }
            )

            return true
        }
        else
        {
            logout()
            return false
        }
        }
        catch(error)
        {
            logout()
            return false
        }

    }

    function logout()
    {
        SetAuthenticated(false)
        setToken(null)
        setUsername(null)
    }



    return(
        <AuthContext.Provider value = {{isAuthenticated,login,logout,username,token}}>
            {children}
        </AuthContext.Provider>
    )
}







