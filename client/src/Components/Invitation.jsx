import React,{useState,useEffect} from "react";
import axios from "axios";
import Moment from 'react-moment';
import PleaseSignIn from "./PleaseSignIn";

const Invitation = props =>{
    const [Invitations,setInvitation] = useState([]);
    const [User,setUser] = useState({});
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
                    console.log(res.data);
                    setUser(res.data.user);
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
            "UserId": User.userId
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
                <form className="d-flex justify-content-around form-group text-white" onSubmit={CreateCode}>
                    <label htmlFor="Code">New Inviation:</label>
                    <input  type="text"
                            value={IVCode}
                            className = "form-control"
                            onChange={e=>setIVCode ( e.target.value ) }
                    />
                    <span className="text-warning">{Errors.Code? Errors.Code[0] : ""}</span>
                    <button className="btn btn-success btn-sm text-nowrap">Create Code</button>
                </form>
                <div className="row w-100 overflow-auto">
                    <table className="table table-bodered text-white">
                        <thead className="thead-dark">
                            <tr>
                                <th>Invitation Code</th>
                                <th>Used</th>
                                <th>Create At</th>
                                <th>Update At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Invitations.map((invitation,i) =>
                            <tr key={i}>
                                <td>{invitation.code}</td>
                                <td>{invitation.isUsed? "yes" : "not yet"}</td>
                                <td>
                                    <Moment format="YYYY-MM-DD - HH:mm" local>
                                        {invitation.createAt}
                                    </Moment>
                                </td>
                                <td>
                                    <Moment format="YYYY-MM-DD - HH:mm" local>
                                        {invitation.updateAt}
                                    </Moment>
                                </td>
                            </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        :
        <PleaseSignIn/>
        }
    </>
    );

}
export default Invitation;