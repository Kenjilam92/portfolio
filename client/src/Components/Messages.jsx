import React from "react";
import axios from "axios";
import {Link} from "@reach/router";
import { useEffect, useState} from "react";
import Moment from 'react-moment';
import PleaseSignIn from "./PleaseSignIn";
import NoAuthority from "./NoAuthority";
const Messages = props =>{

    const [Messages,setMessages] = useState([]);
    const fetchmessages = () => {
        axios.get("/api/messages")
            .then(res => {
            if (res.data.errors){
                console.log(res.data.errors);
            }
            else{
                setMessages(res.data.messages);
            }
            })
            .catch(err=> console.log(err))
    }
    const Delete = id => {
        axios.delete(`/api/messages/${id}`)
            .then(res=>{
                res.data.errors?
                console.log(res.data.errors)
                :
                console.log(res.data.msg);
                fetchmessages();
            })
            .catch(err=>console.log(err));
    }
    const Replied = id => {
        axios.get(`/api/messages/${id}/replied`)
            .then(res=>{
                res.data.errors?
                console.log(res.data.errors)
                :
                fetchmessages();
            })
            .catch(err=>console.log(err));
    }
    const UnReplied = id => {
        axios.get(`/api/messages/${id}/unreplied`)
            .then(res=>{
                res.data.errors?
                console.log(res.data.errors)
                :
                fetchmessages();
            })
            .catch(err=>console.log(err));
    }

    useEffect(()=> {
        fetchmessages();
      },[]);
    
    return (
        <>
        {props.login?
            <>
            {props.user.role ==="Guest"?
                <NoAuthority/>
                :
                <div className="col p-3">
                    <div className="d-flex justify-content-between mb-3">
                        <h3 className="text-warning">New Messages</h3>
                        <Link   to = "/blog"
                                className ="btn btn-secondary">Go Back</Link>
                    </div>
                    <div className="row overflow-auto">
                        <table className="table table-bordered text-white">
                            <thead className = "thead-dark">
                                <tr>
                                    <th>Actions</th>
                                    <th>Name</th>
                                    <th>Message</th>
                                    {props.user.role === "Owner"||props.user.role ==="Supervisor"?
                                    <>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th className="text-nowrap text-center">Receive Time</th>
                                    </>
                                    :null}
                                </tr>
                            </thead>
                            <tbody>
                                {Messages.filter(m => m.isReplied===false).map( (message, i) =>
                                <tr key={i}>
                                    {props.user.role==="Owner"|| props.user.role==="Supervisor"?
                                    <td className="text-left">
                                        <nav className="btn-group">
                                            <button className="btn btn-sm btn-success"
                                                    onClick={e=>Replied(message.messageId)}
                                                    >Replied
                                            </button>
                                            {props.user.role==="Owner"?
                                            <button className="btn btn-sm btn-danger"
                                                    onClick={e=>Delete(message.messageId)}
                                                    >Delete
                                            </button>
                                            :null}
                                        </nav>
                                    </td>
                                    :null}
                                    <td>{message.name}</td>
                                    <td>{message.text}</td>
                                    {props.user.role==="Owner"|| props.user.role==="Supervisor"?
                                    <>
                                    <td>{message.email}</td>
                                    <td>{message.phone}</td>
                                    </>
                                    :null}
                                    <td className="text-nowrap text-center">
                                        <Moment format="YYYY-MM-DD" local>
                                            {message.createAt}
                                        </Moment>
                                        <br/>
                                        <Moment format="HH:mm" local>
                                            {message.createAt}
                                        </Moment>
                                    </td>
                                </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    
                    {props.user.role==="Owner"?
                    <>
                    <h3 className="text-warning">Replied Messages</h3>
                    <div className="row overflow-auto">
                        <table className="table table-bordered text-white">
                            <thead className = "thead-dark">
                                <tr>
                                    <th>Actions</th>
                                    <th>Name</th>
                                    <th>Messages</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th className="text-nowrap text-center">Receive Time</th>
                                    <th className="text-nowrap text-center">Replied Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Messages.filter(m => m.isReplied===true).map( (message, i) =>
                                <tr key={i}>
                                    <td className="text-left">
                                        <nav className="btn-group">
                                            <button className="btn btn-warning btn-sm text-danger"
                                                    onClick={e=>UnReplied(message.messageId)}
                                                    >Not Replied
                                            </button>
                                            <button className="btn btn-sm btn-danger"
                                                    onClick={e=>Delete(message.messageId)}
                                                    >Delete
                                            </button>
                                        </nav>
                                    </td>
                                    <td>{message.name}</td>
                                    <td>{message.text}</td>
                                    <td>{message.email}</td>
                                    <td>{message.phone}</td>
                                    <td className="text-nowrap text-center">
                                        <Moment format="YYYY-MM-DD" local>
                                            {message.createAt}
                                        </Moment>
                                        <br/>
                                        <Moment format="HH:mm" local>
                                            {message.createAt}
                                        </Moment>
                                    </td>
                                    <td className="text-nowrap text-center">
                                        <Moment format="YYYY-MM-DD" local>
                                            {message.updateAt}
                                        </Moment>
                                        <br/>
                                        <Moment format="HH:mm" local>
                                            {message.updateAt}
                                        </Moment>
                                    </td>
                                </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    </>
                    :null}
                </div>
            }
            </>
            :
            <PleaseSignIn/>
        }
        </>
    );
}
export default Messages
