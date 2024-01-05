import React, { useEffect, useState } from 'react'
import Create from './Create'
import './App.css'
import './index.css'
import axios from 'axios'
import { TiDelete } from "react-icons/ti";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";

// ... (other imports)

function Home() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get('https://todo-app-2024.onrender.com/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    }, []);

    const handeleEdit = (id) => {
        axios.put('https://todo-app-2024.onrender.com/update/' + id)
            .then(result => {
                // location.reload() should be avoided in React, consider updating state instead
                // Reload the data by fetching it again after update
                axios.get('https://todo-app-2024.onrender.com/get')
                    .then(result => setTodos(result.data))
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    };
    const handleDelete = (id) => {
        axios.delete(`https://todo-app-2024.onrender.com/delete/${id}`)
          .then(result => {
            // Remove the deleted item from the state
            setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
          })
          .catch(err => console.log(err));
      };

    return (
        <div className='home'>
             <video src="./video/y.mp4" autoPlay loop muted></video>
            <h1 style={{fontFamily:"Cursive"}}>TODO LIST</h1>
            <Create />

            {todos.length === 0 ?
                <div>
                    <h2>No record</h2>
                </div>
                :
                todos.map(todo => (
                    <div className='task' key={todo._id}>
                        <div className='checkbox' onClick={() => handeleEdit(todo._id)}>
                            {
                                todo.done ?
                                    <FaCheck className="icon" />
                                    : <FaArrowRightLong className='icon' />
                            }
                            <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                        </div>
                        <div>
                            <span> <TiDelete className="icon" 
                            onClick={()=>handleDelete(todo._id)}/></span>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default Home;
