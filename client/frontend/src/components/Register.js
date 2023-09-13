// 
import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';

const Register = () => {

  const history = useHistory()

  const [user, setUser] = useState({
    username : "",
    email : "",
    password : ""
  });

  // Handle Inputs
  const handleInput = (event) =>{
    let name = event.target.name;
    let value = event.target.value;

    setUser({...user, [name]:value});
  }

  // Handle Submit
  const handleSubmit = async (event)=>{
    event.preventDefault();
    // Object DeStructuring
    // Store Object Data into Variables
    const {username, email, password} = user;
    try {
      //It is Submitted on port 3000 by default
      // Which is Front End but we need to 
      // Submit it on Backend which is on 
      // Port 3001. So we need Proxy.
      const res = await fetch('/register', {
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          username, email, password
        })
      })
      console.log(res.status)
      if(res.status === 400 || !res){
        window.alert("Already Used Details")
      }else{
        // You need to Restart the Server for Proxy Works
        // Now Try Again
        window.alert("Registered Successfully");
        history.push('/login')
      }
    } catch (error) {
      console.log(error);
    }
  }


    return(
        <>
        <div className='container'>
        <form method="POST" onSubmit={handleSubmit}>

        <div className="form-group">
    <label htmlFor="exampleInputEmail1">Username</label>
    <input type="text" className="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter Username" 
    name="username" value={user.username} onChange={handleInput}/>
   
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"
    name="email" value={user.email} onChange={handleInput}/>
   
  </div>
 
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" id="password" placeholder="Password"
    name="password" value={user.password} onChange={handleInput}/>
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
        </div>
        </>
    )
}

export default Register;
