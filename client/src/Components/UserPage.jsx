import React from "react";
import {Link} from "@reach/router"
import PleaseSignIn from "./PleaseSignIn";
import Progressing from "./Progressing";


const UserPage = props => {
  
  return(
    <>
    {props.login?
        <div className="col text-white">
          <div className="row justify-content-between align-items-end text-white mb-3 p-3">
            <h1>Hello, <span className="text-warning">{props.user.firstName}</span>!</h1>
            <h2>Status: <span className="text-warning"> {props.user.role}</span></h2>
            {props.user.role==="Owner" || props.user.role==="Supervisor" || props.user.role ==="Staff" ?
            <nav className="btn-group">
              {props.user.role === "Owner"?
              <Link   to="/admin"
                      className="btn btn-success"
                      >Admin
              </Link>
              :null}
              {props.user.role === "Owner" || props.user.role === "Supervisor" || props.user.role === "Staff"?
              <Link   to="/messages"
                      className="btn btn-success"
                      >Messages
              </Link>
              :null}
              <Link   to="/invitation"
                      className="btn btn-success"
                      >Invitation codes
              </Link>
            </nav>
            :null}
          </div>
          <div className="col border border-white">
            <h3>Dashboard</h3>
            <Progressing/>
          </div>
        </div>
      :
      <PleaseSignIn/>
    }
  </>
  );
}
export default UserPage;