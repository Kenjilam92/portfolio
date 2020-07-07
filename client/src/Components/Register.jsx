import React from "react";
import {useState} from "react";
import axios from "axios";
import {navigate} from "@reach/router";
const Register = props => {
    const [FirstName,setFirstName] = useState("");
    const [LastName,setLastName] = useState("");
    const [Email,setEmail] = useState("");
    const [Phone,setPhone] = useState("");
    const [Pass,setPass] = useState("");
    const [CFPass,setCFPass] = useState ("");
    const [Errors,setErrors] = useState ({});
    const [Code,setCode] = useState("");
    const Register = e =>{
        e.preventDefault();
        if (Code===""||Code===" ")
        {   
            setErrors({code : "Invitation code is required"});
        }
        else{
        const newUser = {
            "FirstName" : FirstName,
            "LastName" : LastName,
            "Email" : Email,
            "Phone" : Phone,
            "Password" : Pass,
            "CFPass" : CFPass
        };
        axios.post(`/api/users/register/${Code}`,newUser)
            .then(res=> {
                if(res.data.errors){
                    setErrors(res.data.errors);
                }
                else{
                    setFirstName("");
                    setLastName("");
                    setEmail("");
                    setPhone("");
                    setPass("");
                    setCFPass("");
                    setErrors({});
                    props.login();
                    navigate("/blog");
                }
            })
            .catch (err=>console.log(err));
        }
        
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
                            placeholder="Code is required! Please contact me for the code!"
                            onChange ={e=>setCode(e.target.value)}
                            />
                    <span className="text-warning">
                        {Errors.code? Errors.code : null}
                    </span>
                </div>
                <div className="row mb-2 justify-content-end align-items-end">
                    <label  htmlFor="FirstName"
                                className="col-sm-4"
                                >First Name:
                        </label>
                    <input  type="text" 
                            htmlFor="FirstName" 
                            value = {FirstName}
                            className="form-control col-sm-8"
                            onChange ={e=>setFirstName(e.target.value)}
                            />
                    <span className="text-warning">
                        {Errors.FirstName? Errors.FirstName[0] : null}
                    </span>
                </div>
                <div className="row mb-2 justify-content-end align-items-end">    
                    <label  htmlFor="LastName"
                            className="col-sm-4"
                            >Last Name:
                    </label>
                    <input  type="text" 
                            htmlFor="LastName" 
                            value = {LastName}
                            className="form-control col-sm-8"
                            onChange ={e=>setLastName(e.target.value)}
                            />
                    <span className="text-warning">
                        {Errors.LastName? Errors.LastName[0] : null}
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