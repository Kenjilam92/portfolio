import React from "react";
import {useState} from "react";
import axios from "axios";
import {navigate} from "@reach/router";
const Register = props => {
    const [Name,setName] = useState("");
    const [Email,setEmail] = useState("");
    const [Phone,setPhone] = useState("");
    const [Pass,setPass] = useState("");
    const [CFPass,setCFPass] = useState ("");
    const [Errors,setErrors] = useState ({});
    const [Code,setCode] = useState("");
    const Register = e =>{
        e.preventDefault();
        
        
        
        const newUser = {
            "Name" : Name,
            "Email" : Email,
            "Phone" : Phone,
            "Password" : Pass,
            "CFPass" : CFPass
        };
        axios.post(`/api/users/register/${Code}`,newUser)
            .then(res=> {
                if(res.data.errors){
                    console.log("validation");
                    setErrors(res.data.errors);
                }
                else{
                    setName("");
                    setEmail("");
                    setPhone("");
                    setPass("");
                    setCFPass("");
                    setErrors({});    
                    navigate("/messages");
                }
            })
            .catch (err=>console.log(err));
    }
    ////////////////////////////////////
    
    return(
        <>
            <form onSubmit={Register} className="form-group ">
                <h3 className="text-center mb-4">Register</h3>
                <div className="row mb-2 justify-content-end align-items-end">
                    <label  htmlFor="Code"
                            className="col-sm-4"
                            >Invitation Code:
                    </label>
                    <input  type="text" 
                            htmlFor="Code" 
                            value = {Code}
                            className="form-control col-sm-8"
                            onChange ={e=>setCode(e.target.value)}
                            />
                    <span className="text-warning">
                        {Errors.code? Errors.code : null}
                    </span>
                </div>
                <div className="row mb-2 justify-content-end align-items-end">
                    <label  htmlFor="Name"
                            className="col-sm-4"
                            >Name:
                    </label>
                    <input  type="text" 
                            htmlFor="Name" 
                            value = {Name}
                            className="form-control col-sm-8"
                            onChange ={e=>setName(e.target.value)}
                            />
                    <span className="text-warning">
                        {Errors.Name? Errors.Name[0] : null}
                    </span>
                </div>
                <div className="row mb-2 justify-content-end align-items-end">
                    <label  htmlFor="Phone"
                            className="col-sm-4"
                            >Phone:
                    </label>
                    <input  type="text" 
                            htmlFor="Phone" 
                            value = {Phone}
                            className="form-control col-sm-8"
                            onChange ={e=>setPhone(e.target.value)}
                            />
                    <span className="text-warning">
                        {Errors.Phone? Errors.Phone[0] : null}
                    </span>
                </div>
                <div className="row mb-2 justify-content-end align-items-end">
                    <label  htmlFor="Email"
                            className="col-sm-4"
                            >Email:
                    </label>
                    <input  type="text" 
                            htmlFor="Email" 
                            value = {Email}
                            className="form-control col-sm-8"
                            onChange ={e=>setEmail(e.target.value)}
                            />
                    <span className="text-warning">
                        {Errors.Email? Errors.Email[0] : null}
                    </span>
                </div>
                <div className="row mb-2 justify-content-end align-items-end">
                    <label  htmlFor="Pass"
                            className="col-sm-4"
                            >Password:
                    </label>
                    <input  type="password" 
                            htmlFor="Pass" 
                            value = {Pass}
                            className="form-control col-sm-8"
                            onChange ={e=>setPass(e.target.value)}
                            />
                    <span className="text-warning">
                        {Errors.Password? Errors.Password[0] : null}
                    </span>
                </div>
                <div className="row mb-2 justify-content-end align-items-end">
                    <label  htmlFor="CFPass"
                            className="col-sm-4"
                            >Confirm PW:
                    </label>
                    <input  type="password" 
                            htmlFor="CFPass" 
                            value = {CFPass}
                            className="form-control col-sm-8"
                            onChange ={e=>setCFPass(e.target.value)}
                            />
                    <span className="text-warning">
                        {Errors.CFPass? Errors.CFPass[0] : null}
                    </span>
                </div>
                
                <div className="row justify-content-end">
                    <button type="submit" 
                            className="btn btn-success justify-self-end"
                            >Register
                    </button>
                </div>
            </form>
        </>
    );
}

export default Register;