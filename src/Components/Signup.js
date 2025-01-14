import {useNavigate } from 'react-router-dom'
import React, { useState } from 'react';
 

const Signup = (props) => {
  const[Credentials,setCredentials]=useState({name:"",cpassword:"",email:"",password:""})
  let navigate = useNavigate();
 
 
  const handleSubmit= async (e)=>{
    e.preventDefault();
    const {name,email,password}= Credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
    method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name ,email, password }),
    });
      const  json= await response.json()
      console.log(json);
      if(json.success){
        localStorage.setItem('token',json.authtoken);
        navigate("/");
        props.showAlert("Signed up successfully", "success")
    }
    else{
        props.showAlert("Invalid Credential", "danger")
    }
}
const onChange = (e) => {
    setCredentials({ ...Credentials, [e.target.name]: e.target.value });
  }

  return (
    <div className='container mt-2'>
      <h2 className='my-2'>Create an account to use inotebook</h2>
      <div>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control"name="name" id="name"  onChange={onChange}  autoComplete="current-name"aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" name="email"id="email" onChange={onChange}  autoComplete="current-email"aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">password</label>
    <input type="password" className="form-control" name="password"  onChange={onChange}  minLength={5} required id="password"/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label"> confirm password</label>
    <input type="password" className="form-control" name="cpassword" onChange={onChange} minLength={5} required  id="cpassword"/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
    </div>
  )
}

export default Signup
