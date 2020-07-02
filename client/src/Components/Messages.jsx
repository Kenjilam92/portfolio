import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link} from "@reach/router";
import Moment from 'react-moment';
import PleaseSignIn from "./PleaseSignIn";
const Messages = props =>{
    const [Messages,setMessages] = useState([]);
    const [User, setUser] = useState({});
    const fetchmessages = () => {
        axios.get("api/messages")
            .then(res => {
                console.log("messages data", res.data);
                setMessages(res.data.messages);
                setUser(res.data.user);
            })
            .catch(err=> console.log(err))
    }
    
    useEffect (() => {
        console.log(props.login);
        fetchmessages();
    },[props.login]);
    return (
        <>
        {props.login?
        <>
        <div className="row justify-content-between align-items-end text-white mb-3 p-3">
            <h1>Welcome, <span className="text-warning">{User.name}</span>!</h1>
            <Link to="/invitation">Create an invitation</Link>
        </div>
        <div className="row w-100 overflow-auto">
        <table className="table table-bordered text-white">
            <thead className = "thead-dark">
                <tr>
                    <th>Receive Time</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Message</th>
                </tr>
            </thead>
            <tbody>
                {Messages.map( (message, i) =>
                <tr key={i}>
                    <td className="text-nowrap">
                        <Moment format="YYYY-MM-DD - HH:mm" local>
                            {message.createAt}
                        </Moment>
                    </td>
                    <td>{message.name}</td>
                    <td>{message.email}</td>
                    <td>{message.phone}</td>
                    <td>{message.text}</td>
                </tr>
                )}
            </tbody>
        </table>
        </div>
        </>
        :
        <PleaseSignIn/>
        }
        </>
    );
}
export default Messages
