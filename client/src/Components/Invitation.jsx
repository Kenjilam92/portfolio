import React,{useState,useEffect} from "react";
import axios from "axios";
import Moment from 'react-moment';
import PleaseSignIn from "./PleaseSignIn";
import NoAuthority from "./NoAuthority";
import {Link} from "@reach/router";
const Invitation = props =>{
    const [Invitations,setInvitation] = useState([]);
    const [IVCode,setIVCode] = useState ("");
    const [Errors,setErrors] = useState({});
    const fetchInvitation = () =>{
        axios.get("api/invitations")
            .then(res =>{
                if (res.data.errors)
                {
                    console.log(res.data.errors);
                }
                else
                {
                    setInvitation(res.data.invitations);
                }
            })
            .catch(err=> console.log(err));
    }
    useEffect(()=>{
        fetchInvitation();
    },[props.login]);

    const CreateCode = e =>{
        e.preventDefault();
        const newInvitation = {
            "Code" : IVCode,
            "UserId": props.user.userId
        }
        console.log(newInvitation);
        axios.post("/api/invitation/new",newInvitation)
            .then(res => {
                console.log(res.data);
                if (res.data.errors){
                    setErrors(res.data.errors)
                }
                else{
                console.log(res.data.msg);
                setErrors({});
                setIVCode("");
                fetchInvitation();
                }
            })
            .catch (err=>console.log(err));
    };

    return(
        <>
        {props.login?
            <div className="col w-100">
                {props.user.role === "Owner" || props.user.role === "Supervisor" ?
                <form className="row align-items-center justify-content-around text-white m-3" onSubmit={CreateCode}>
                    
                    <label  htmlFor="Code"
                            className="col-sm-2 h5"
                            >New Inviation:
                    </label>
                    <input  type="text"
                            value={IVCode}
                            className = "form-control col-sm-6"
                            onChange={e=>setIVCode ( e.target.value ) }
                            />
                    <button className="col-sm-2 btn btn-success btn-sm "
                            >Create Code
                    </button>
                </form>
                :null}
                 <p className="text-warning text-center">{Errors.Code? Errors.Code[0] : ""}</p>
                {props.user.role === "Owner" || props.user.role === "Supervisor" || props.user.role === "Staff"?
                <>
                <div className="d-flex justify-content-between mb-3">
                    <h3 className="text-warning">Invitations</h3>
                    <Link to = "/blog" className ="btn btn-secondary">Go Back</Link>
                </div>
                <div className="row overflow-auto">
                    <table className="table table-bodered text-white">
                        <thead className="thead-dark">
                            <tr className="text-nowrap text-center">
                                <th>Codes</th>
                                <th>Used</th>
                                <th>Create At</th>
                                <th>Update At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Invitations.map((invitation,i) =>
                            <tr key={i}
                                className={invitation.isUsed? "text-nowrap text-center" : "text-nowrap text-center text-warning"}>
                                <td>{invitation.code}</td>
                                <td>{invitation.isUsed? "yes" : "not yet"}</td>
                                <td>
                                    <Moment format="YYYY-MM-DD" local>
                                        {invitation.createAt}
                                    </Moment>
                                    <br/>
                                    <Moment format="HH:mm" local>
                                        {invitation.createAt}
                                    </Moment>
                                </td>
                                <td>
                                    <Moment format="YYYY-MM-DD" local>
                                        {invitation.updateAt}
                                    </Moment>
                                    <br/>
                                    <Moment format="HH:mm" local>
                                        {invitation.updateAt}
                                    </Moment>
                                </td>
                            </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                </>
                :
                <NoAuthority/>
                }
            </div>
        :
        <PleaseSignIn/>
        }
    </>
    );

}
export default Invitation;