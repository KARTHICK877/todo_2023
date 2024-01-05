import React, { useState } from 'react'
import './App.css'
import './index.css'
import axios from 'axios'
function Create() {
    const [task ,setTask]=useState()
    const handeleadd = ()=>{
        axios.post('https://todo-app-2024.onrender.com/add',{task:task})
        .then(result => {
            location.reload()
        })
        .catch(err=>(console.log(err)))
    }
  return (
    <div>
        <input type="text" name="" id=""  className='input' onChange={(e)=> setTask(e.target.value)}/>
        <button type="button" className=' button ' onClick={handeleadd}>Add</button>
    </div>
  )
}

export default Create