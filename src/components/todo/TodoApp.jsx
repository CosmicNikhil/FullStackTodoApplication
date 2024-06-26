// Centralized Control:

// Imagine a school where every student needs a special permission slip to go on a field trip.
// If every teacher has to give out permission slips separately, it can get confusing and messy.
// Instead, the school office (AuthContext) keeps track of the permission slips. All teachers and students go to the office to check or get the permission slip.
// This way, the school office can easily control who has permission, and everyone knows where to go.

 //if you click wrong link,redirect here

import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import LogoutComponent from './LogoutComponent'
import HeaderComponent from './HeaderComponent'
import ListTodosComponent from './ListTodosComponent'
import ErrorComponent from './ErrorComponent'
import WelcomeComponent from './WelcomeComponent'
import LoginComponent  from './LoginComponent'
import TodoComponent from './TodoComponenet'
import AuthProvider,{useAuth} from './security/AuthContext'



function AuthenticatedRoute({children})
{
    const authContext = useAuth()

    if(authContext.isAuthenticated)
    return children

    return <Navigate to = "/" />
}


export default function TodoApp()
{
    return(
        <div className = "TodoApp">
        <AuthProvider>
        <BrowserRouter>
            <HeaderComponent/>
                <Routes>
                    <Route path='/' element={<LoginComponent/>} />
                    <Route path='/login' element={<LoginComponent/>} />

                    <Route path='/welcome/:username' element={
                        <AuthenticatedRoute>
                            <WelcomeComponent/>
                        </AuthenticatedRoute>
                     } />

                   
                    <Route path='*' element={<ErrorComponent/>} />

                    <Route path='/todos' element={          
                       <AuthenticatedRoute>
                          <ListTodosComponent/>
                       </AuthenticatedRoute>
                    } />

                   <Route path='/todos/:id' element={          
                       <AuthenticatedRoute>
                          <TodoComponent/>
                       </AuthenticatedRoute>
                    } />

                    <Route path='/logout' element={
                        <AuthenticatedRoute>
                            <LogoutComponent/>
                        </AuthenticatedRoute>     
                    } />

                </Routes>
            </BrowserRouter>
        </AuthProvider>
        </div>
    );
}

