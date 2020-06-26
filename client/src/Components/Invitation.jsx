import React,{useState,useEffect} from "react";
import axios from "axios";

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
            <div className="row w-100">
              
                    <form className="col-sm-2 form-group text-white" onSubmit={CreateCode}>
                        <label htmlFor="Code">New Inviation:</label>
                        <input  type="text"
                                value={IVCode}
                                className = "form-control"
                                onChange={e=>setIVCode ( e.target.value ) }
                        />
                        <span className="text-warning">{Errors.Code? Errors.Code[0] : ""}</span>
                        <button className="btn btn-success">Create Code</button>
                    </form>
        
                
                <table className="col-sm-10 table table-bodered text-white">
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
                            <td>{invitation.createAt}</td>
                            <td>{invitation.updateAt}</td>
                        </tr>
                        )}
                    </tbody>
                </table>
                
            </div>
        :
        <p className="h1 text-warning"> Please Sign In to see this page</p>
        }
        </>
    );

}
export default Invitation;