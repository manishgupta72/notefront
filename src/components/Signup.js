import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Signup = (props) => {
    const navigate = useNavigate();
    const [Credentials, setCredentials] = useState({ name: "", email: "", password: "" });
    const UserCreate = async (e) => {
        e.preventDefault();
        //Todo: Api call
        //Api call
        
        const response = await fetch("https://inotebookback-w3v6.onrender.com/api/auth/createuser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: Credentials.name,
                email: Credentials.email,
                password: Credentials.password,
            }),
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            //save the auto in local storage and redirect
            localStorage.setItem('token', json.authtoken)
            navigate('/login');
            props.showAlert("Account Created Successfully", "success")
        } else {
            props.showAlert("Invalid Credentials", "danger")
        }
    };

    const onChange = (e) => {


        setCredentials({ ...Credentials, [e.target.name]: e.target.value });
    };

    const check = () => {
        let cpass=document.getElementById("cpassword");

        if (cpass.value.length>0) {
           if(cpass.value!==Credentials.password)
           {
            props.showAlert("confirm password should be same","danger")
           }else{
            props.showAlert("confirm password Mathched be same","success")
           }
          }
    };
    return (
        <div className="container my-5">
            <h2>Create an Account  to continue iNotebook</h2>
            <form onSubmit={UserCreate}>
                <div className="my-4">
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input
                        type="name"
                        className="form-control"
                        id="name"
                        name="name"
                        value={Credentials.name}
                        onChange={onChange}
                        required
                        minLength={3}
                    />
                </div>
                <div className="mb-3">
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
                        minLength={5}
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
                        minLength={5}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">
                        Confirm  Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="cpassword"
                        name="cpassword"
                        onKeyUp={check}
                        required
                        minLength={5}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Signup
                </button>
            </form>
        </div>
    );
}

export default Signup