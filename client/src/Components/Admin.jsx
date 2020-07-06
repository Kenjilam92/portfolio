import React from "react";
import axios from "axios";
import NoAuthority from "./NoAuthority";
import { useState } from "react";
import { Link } from "@reach/router";
import Modal from "./Modal";
import { useEffect } from "react";
const Admin = props => {
  const [Id,setId] = useState();
  const [FirstName,setFirstName]= useState();
  const [LastName,setLastName]= useState();
  const [Email,setEmail] = useState();
  const [Phone,setPhone] = useState();
  const [Role,setRole] = useState();
  const [Users,setUsers] = useState([]);
  const Delete = id =>{
    axios.delete(`/api/users/${id}`)
      .then(res => {
        res.data.errors?
        console.log (res.data.errors)
        :
        fetchUsers();
      })
      .catch(err=>console.log(err));
      
  }
  const Edit = (id, fname, lname, email,phone,role) =>{
    setId(id);
    setFirstName(fname);
    setLastName(lname);
    setEmail(email);
    setPhone(phone);
    setRole(role);
  }

  const Update = e => {
    e.preventDefault();
    axios.put(`api/users/${Id}`, {"role":Role})
      .then(res=>{
        res.data.errors?
        console.log(res.data.errors)
        :
        fetchUsers();
      })
      .catch(err=>console.log(err));
  }

  const fetchUsers = () =>{
    axios.get("/api/users")
      .then(res => {
        if (res.data.errors){
          console.log(res.data);
        }
        else{
          setUsers(res.data.users);
        }
      })
      .catch(err => console.log(err));
  }  
  
  useEffect(()=> {
    fetchUsers();
  },[]);

  return(
    <>
    {props.user.role==="Owner"?
    <div className="col">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="text-warning">Aministrator</h1>
          <Link to = "/blog" className ="btn btn-secondary">Go Back</Link>
        </div>
        <div className="row overflow-auto">
          <table className="table table.bodered text-white">
            <thead className="thead-dark">
              <tr>
                <th>Actions</th>
                <th>Name</th>
                <th>Role</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {Users.filter(u => u.role !== "Guest").map((user,i)=>
              <tr key={i}>
                <td className="text-left">
                  <nav className="btn-group">
                    <button className="btn btn-sm btn-success"
                            onClick={e=>Edit(user.userId, user.firstName, user.lastName, user.email, user.phone, user.role)}
                            data-toggle="modal" 
                            data-target="#editForm"
                            >Edit
                    </button>
                    <button className="btn btn-sm btn-danger"
                            onClick={e=>Delete(user.userId)}
                            >Delete
                    </button>
                  </nav>
                </td>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.role}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
              </tr>
              )}
            </tbody>
          </table>
        </div>
          <h2 className="text-warning">Guests</h2>
        <div className="row overflow-auto">  
          <table className="table table.bodered text-white">
            <thead className="thead-dark">
              <tr>
                <th>Actions</th>
                <th>Name</th>
                <th>Role</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
            {Users.filter(u=>u.role === "Guest").map((user,i)=>
            <tr key={i}>
              <td className="text-left">
                <nav className="btn-group">
                  <button className="btn btn-sm btn-success"
                          onClick={e=>Edit(user.userId, user.firstName, user.lastName, user.email, user.phone, user.role)}
                          data-toggle="modal" 
                          data-target="#editForm"
                          >Edit
                  </button>
                  <button className="btn btn-sm btn-danger"
                          onClick={e=>Delete(user.userId)}
                          >Delete
                  </button>
                </nav>
              </td>
              <td>{user.firstName} {user.lastName}</td>
              <td>{user.role}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
            )}
            </tbody>
          </table>
        </div>
        <Modal ModalId="editForm"
                ModalHeader="Change user role"
                FormId="updateUser">
          <form onSubmit={e=>Update(e)} id="updateUser" className="row">
            <p className="h5 col-sm-4">Name: </p>
            <p className="h5 col-sm-8">{FirstName} {LastName}</p>
            <p className="h5 col-sm-4">Email: </p>
            <p className="h5 col-sm-8">{Email}</p>
            <p className="h5 col-sm-4">Phone: </p>
            <p className="h5 col-sm-8">{Phone}</p>
            <label htmlFor="role"
                    className="h5 col-sm-4"
                  >Role:
            </label>
            <select type="text"
                  value={Role}
                  onChange={e=>setRole(e.target.value)}
                  className="form-control col-sm-6">
              <option value="Owner">Owner</option>
              <option value="Supervisor">Supervisor</option>
              <option value="Staff">Staff</option>
              <option value="Guest">Guest</option>
            </select>
        </form>
        </Modal>
    </div>
    :
    <NoAuthority/>}
    </>
  );
}

export default Admin;