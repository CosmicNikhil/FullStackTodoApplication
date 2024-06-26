import { apiClient } from "./ApiClient"

// export function retrieveHelloWorldBean()
// {
//     return  axios.get('http://localhost:8080/hello-world-bean')
// }


export const retrieveHelloWorldBean 
   = () => apiClient.get('/hello-world-bean')

//Response to preflight request doesn't pass access control check: => Authorisation Header

export const retrieveHelloWorldBeanPathVariable 
  = (username) => apiClient.get(`/hello-world/path-variable/${username}`)

