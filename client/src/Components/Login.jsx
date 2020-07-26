import React,{useState} from "react";
import axios from "axios";
import {navigate} from "@reach/router";
import Register from "./Register";
const Login = props =>{
    //////////
    const [Errors,setErrors] = useState ({});
    const [LoginEmail,setLoginEmail] = useState ("");
    const [LoginPass,setLoginPass] = useState("");
    //////////
    
    const Login = e =>{
      e.preventDefault();
      const LoginUser = {
          "LoginEmail": LoginEmail,
          "LoginPassword" : LoginPass
      }
      axios.post("/api/users/login",LoginUser)
        .then(res=>{
          if (res.data.errors){   
            setErrors(res.data.errors);
          }
          else{
            console.log("Login Successfully!");
            setErrors({});
            setLoginPass("");
            setLoginEmail("");
            props.setUser(res.data.user);
            props.login(true);
            navigate("/blog")
          }
        })
        .catch(err=> console.log(err));
    }
    const RegisterNow = e => props.checkSession();

    return(
        <div className="d-flex align-items-sm-center w-100 h-100 ">
        <div className="row w-100 m-0 p-3 text-white justify-content-between">
            <div className="col-md-6 ">
                <Register login={RegisterNow}/>
            </div>
            {/* //////////////////////////// */}
            <form onSubmit={Login} className="col-md-5 order-md-2 order-first form-group ">
                <h3 className="text-center mb-4">Login</h3>
                <div className="row mb-2 justify-content-end align-items-end">
                    <label  htmlFor="LoginEmail"
                            className="col-sm-4"
                            >Email:
                    </label>
                    <input  type="text" 
                            htmlFor="LoginEmail" 
                            value = {LoginEmail}
                            className="form-control col-sm-8"
                            onChange ={e=>setLoginEmail(e.target.value)}
                            />
                    <span className="text-warning">
                        {Errors.LoginEmail? Errors.LoginEmail[0] : null}
                    </span>
                </div>
                <div className="row mb-2 justify-content-end align-items-end">
                    <label  htmlFor="LoginPass"
                            className="col-sm-4"
                            >Password:
                    </label>
                    <input  type="password" 
                            htmlFor="LoginPass" 
                            value = {LoginPass}
                            className="form-control col-sm-8"
                            onChange ={e=>setLoginPass(e.target.value)}
                            />
                    <span className="text-warning">
                        {Errors.LoginPassword? Errors.LoginPassword[0] : null}
                    </span>
                </div>
                <div className="row justify-content-end">
                    <button type="submit" 
                            className="btn btn-success justify-self-end"
                            >Login
                    </button>
                </div>
            </form>
        </div>
        </div>
    );
}

export default Login;