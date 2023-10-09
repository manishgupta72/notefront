import React, { useState } from "react";
import { useNavigate} from "react-router-dom";

const Login =  (props) => {
   const navigate=useNavigate();
  const [Credentials, setCredentials] = useState({ email: "", password: "" });
  const UserLogin = async (e) => {

    
    e.preventDefault();
    //Todo: Api call
    //Api call
    const response = await fetch("https://inotebookback-hajz.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: Credentials.email,
        password: Credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if(json.success)
    {
        //save the auto in local storage and redirect
       localStorage.setItem('token',json.authtoken)
       props.showAlert("Logged in Successfully","success")
       navigate('/');
    }
    else{
        props.showAlert("Invalid Credentials","danger")
    }
  };

  const onChange = (e) => {
    setCredentials({ ...Credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-5">
      <h2>Login to continue iNotebook</h2>
      <form onSubmit={UserLogin}>
        <div className="my-4">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={Credentials.email}
            onChange={onChange}
            aria-describedby="emailHelp"
            required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={Credentials.password}
            onChange={onChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
