import React, {useState} from 'react'
import {useNavigate } from 'react-router-dom'
const Login = (props) => {
    const[Credentials,setCredentials]=useState({email:"",password:""})
    let navigate = useNavigate();


    const handleSubmit= async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email:Credentials.email, password:Credentials.password }),
        });
          const  json= await response.json()
          console.log(json);
          if(json.success){
            localStorage.setItem('token',json.authtoken);
            props.showAlert("Logined Successfully", "success")
            navigate("/");
          
        }
        else{
          props.showAlert("Invalid Credential", "danger")
        
        }
    }
    const onChange = (e) => {
        setCredentials({ ...Credentials, [e.target.name]: e.target.value });
      }
    

  return (
    <div className='mt-3'>
      <h2>Login to Continue iNotebook</h2>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" name="email"id="email" value={Credentials.email} onChange={onChange}  autoComplete="current-email"aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">password</label>
    <input type="password" className="form-control" name="password" value={Credentials.password} onChange={onChange}   id="password"/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Login
