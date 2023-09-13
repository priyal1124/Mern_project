// import React,{useState} from 'react';
// import {useHistory} from 'react-router';

// const Signin=()=>{
//   const history=useHistory();
//   const [user,setUser]=useState({
   
//     email:"",
//     password:""
//   });
//   //handle input---> taking the values from input box and assigning to state
//   const handleInput=(event)=>{
//     let name=event.target.name;
//     let value=event.target.value;
//     setUser({...user,[name]:value})

//   }
//   //handle submit---> pushing data into database
//   const handleSubmit=async (event)=>{
//     event.preventDefault();
//     const [email,password]=user
//     try{
//       const res=await fetch('/login',{
//         method:"POST",
//         headers:{
//           "Content-Type":"application/json"
//         },
//         body:JSON.stringify({
//           email,password
//         })
//       })
//       console.log(res.status)
//       if(res.status===400 || !res){
//         window.alert("invalid credentails");
//       }else{
//         window.alert("loggedin  Successfully");
//         history.push('/contact')
//       }
//     }catch(error){
//       console.log(error)
//     }
//   }

//     return(
//         <>
//         <form onSubmit={handleSubmit} method='POST'>
  
//   <div className="form-outline mb-4">
//     <input type="email" id="form2Example1" className="form-control" 
//     name="email"
//     value={user.email}
//     onChange={handleInput}/>
//     <label className="form-label" htmlFor="form2Example1">Email address</label>
//   </div>

  
//   <div className="form-outline mb-4">
//     <input type="password" id="form2Example2" className="form-control" 
//     name="password"
//     value={user.password}
//     onChange={handleInput}/>
//     <label className="form-label" htmlFor="form2Example2">Password</label>
//   </div>

  
  

 
//   <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>

  
//   <div className="text-center">
//     <p>Not a member? <a href="#!">Register</a></p>
//     <p>or sign up with:</p>
//     <button type="button" className="btn btn-link btn-floating mx-1">
//       <i className="fab fa-facebook-f"></i>
//     </button>

//     <button type="button" className="btn btn-link btn-floating mx-1">
//       <i className="fab fa-google"></i>
//     </button>

//     <button type="button" className="btn btn-link btn-floating mx-1">
//       <i className="fab fa-twitter"></i>
//     </button>

//     <button type="button" className="btn btn-link btn-floating mx-1">
//       <i className="fab fa-github"></i>
//     </button>
//   </div>
// </form>
//        </>
//     )
// }


// export default Signin;
import React,{useState} from 'react';
import {useHistory} from 'react-router';

const Login=()=>{
  const history=useHistory();
  const [user,setUser]=useState({
    email:"",
    password:""

  });
  //handle input
  const handleChange=(event)=>{
    let name=event.target.name;

    let value=event.target.value;
    setUser({...user,[name]:value})
  }
  //handle submit

  const handleSubmit=async (event)=>{
    event.preventDefault();
    const {email,password}=user;
    try{
      const res=await fetch("/login",{
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          email, password
        })
      
        
      })
       console.log(res.status)
      if(res.status===400 || !res){
        window.alert("invalid credentials")
      }else{
        window.alert("Login Successfull!")
        window.location.reload();
        history.push("/");
      }
    }catch(error){
      console.log(error)
    }
  }





  



    return(
        <>
        <div className='container'>
        <form method='POST' onSubmit={handleSubmit}>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
    name="email" value={user.email} onChange={handleChange}/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
      name="password" value={user.password} onChange={handleChange}/>
  </div>
 
  <button type="submit" className="btn btn-primary">Submit</button>
</form>

        </div>

        </>
    )
}

export default Login;
