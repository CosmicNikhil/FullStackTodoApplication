
import { useEffect, useState } from 'react';
import './cssFiles/TodoApp.css'
import { retrieveAllTodosForUsernameApi,deleteTodoApi,retrieveTodoApi} from './nikhilapi/TodoApiService';
import { useAuth } from './security/AuthContext';
import { useNavigate } from "react-router-dom"

function ListTodosComponent()
{

    const authContext  = useAuth()

    const username = authContext.username
    
    const [todos,setTodos] = useState([])

    const [message,setMessage] = useState(null)

    const navigate = useNavigate()


    //useEffect => tell React that your component needs to do something after render

    useEffect
     (
        () => refreshTodos(),[]
    )

    function refreshTodos()
    {

    retrieveAllTodosForUsernameApi(username)
    .then(response => {
         setTodos(response.data)
    }
    )
    .catch(error => console.log(error))
    }

    function deleteTodo(id)
    {
      console.log('clicked' + id)
      deleteTodoApi(username,id)
       .then(
          () => 
            {
            //1).Display Message
            setMessage(`Delete of todo with id = ${id} is Successful`)

            //2). Update Todos list
             refreshTodos()
            }

       )
       .catch(error => console.log(error))
    }

    function updateTodo(id)
    {
      console.log('clicked' + id)
      navigate(`/todos/${id}`)
    }

    function addNewTodo()
    {
      navigate(`/todos/-1`)
    }


    return (
        <div className = "container">
           <h1>Things you want to Do!</h1>

           
           {message && <div className = "alert alert-warning">{message}</div>}

           <div>
                <table className = "table">

                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Is Done?</th>
                            <th>Target Date</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            todos.map(
                                todo => (
                                    <tr key = {todo.id}>
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>{todo.targetDate.toString()}</td>
                                    <td><button className="btn btn-warning" onClick={() => deleteTodo(todo.id)}>Delete</button></td>
                                    <td><button className="btn btn-success" onClick={() => updateTodo(todo.id)}>Update</button></td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
           </div>
           <div className="btn btn-success m-5" onClick = {addNewTodo}>Add New Todo</div>
        </div>
    )
}



export default ListTodosComponent
