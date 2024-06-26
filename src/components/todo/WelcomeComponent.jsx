        //axios is a framework used to call restApi
        // axios.get('http://localhost:8080/hello-world')
        // .then((response) => successfulResponse(response))
        // .catch((error)=>errorResponse(error))
        // .finally(()=>console.log('cleanup'))

        // retrieveHelloWorldBean()
        // .then((response) => successfulResponse(response))
        // .catch((error)=>errorResponse(error))
        // .finally(()=>console.log('cleanup'))

        import React from "react";
        import { useParams, Link } from "react-router-dom";
        import { useState } from "react";
        import { retrieveHelloWorldBeanPathVariable } from "./nikhilapi/HelloWorldApiService";
        import { useAuth } from './security/AuthContext';
        import './cssFiles/WelcomeComponent.css'; // Import the CSS file
        
        function WelcomeComponent() {
          const { username } = useParams();
          const authContext = useAuth();
          const [message, setMessage] = useState(null);
        
          function callHelloWorldRestApi() {
            console.log('called');
        
            retrieveHelloWorldBeanPathVariable('nikhil', authContext.token)
              .then((response) => successfulResponse(response))
              .catch((error) => errorResponse(error))
              .finally(() => console.log('cleanup'));
          }
        
          function successfulResponse(response) {
            console.log(response);
            setMessage(response.data.message);
          }
        
          function errorResponse(error) {
            console.log(error);
          }
        
          return (
            <div className="welcome-container">
              <h1>Welcome {username}</h1>
              <div>
                Manage Your todos - <Link to="/todos" className="welcome-link">Go here</Link>
              </div>
              <button className="btn btn-success m-5 hidden" onClick={callHelloWorldRestApi}>
                Call Hello World
              </button>
              <div className="text-info">{message}</div>
            </div>
          );
        }
        
        export default WelcomeComponent;
        