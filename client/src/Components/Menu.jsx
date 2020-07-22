import React from "react";
import {Link} from "@reach/router";
import axios from "axios";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import json2mq from 'json2mq';
import $ from "jquery";

const Menu = props => {

  const matches = useMediaQuery(
    json2mq({
      maxWidth: 600,
    }),
  );
  const hideNavbar = () =>{
        $("#navbarNavAltMarkup").collapse('hide');
      }

  const Logout = () => {
    axios.get("api/logout")
      .then(res => {
      console.log(res.data);
      props.setLoginStatus(false);
      props.setUser({});
      props.setUsers([]);
      props.setMessages([]);
      })
      .catch(err => console.log(err));
      if(matches){
        hideNavbar();
      }
  }
  return(
    <>
    {matches?
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
    <Link className="navbar-brand ml-3" to="/">Kenji Lam</Link>
    <button className="navbar-toggler" type="button" 
            data-toggle="collapse" 
            data-target="#navbarNavAltMarkup" 
            aria-controls="navbarNavAltMarkup" 
            aria-expanded="false" 
            aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
          <Link   to="/" 
                  className="btn btn-success"
                  onClick={hideNavbar}
                  >Home
          </Link>
          <Link   to ="/aboutme" 
                  className="btn btn-success"
                  onClick={hideNavbar}
                  >About Me
          </Link>
          {/* <Link   to ="/progressing"
                  className="btn btn-success"
                  onClick={hideNavbar}
                  >Gallery
          </Link> */}
          <Link   to ="/projects"
                  className="btn btn-success"
                  onClick={hideNavbar}
                  >Projects
          </Link>
          <Link   to = "/contact"
                  className="btn btn-success"
                  >Contact
          </Link>
          {props.loginStatus?
          <Link   to ="/blog"
                  className="btn btn-success"
                  onClick={hideNavbar}
                  >Blog
          </Link>
          :null}
          {props.loginStatus?
          <Link   to ="/"
                  onClick={Logout}  
                  className="btn btn-danger"
                  >Logout
          </Link>
          :
          <Link   to ="/login"
                  className="btn btn-success"
                  onClick={hideNavbar}
                  >Login
          </Link>
          }
      </div>
    </div>
  </nav>
    :
      <div className="d-flex justify-content-round btn-group" role="group" aria-label="Basic example">
          <Link   to="/" 
                  className="btn btn-success"
                  >Home
          </Link>
          <Link   to ="/aboutme" 
                  className="btn btn-success"
                  >About Me
          </Link>
          {/* <Link   to ="/progressing"
                  className="btn btn-success"
                  >Gallery
          </Link> */}
          <Link   to ="/projects"
                  className="btn btn-success"
                  >Projects
          </Link>
          <Link   to = "/contact"
                  className="btn btn-success"
                  >Contact
          </Link>
          {props.loginStatus?
          <Link   to ="/blog"
                  className="btn btn-success"
                  >Blog
          </Link>
          :null}
          {props.loginStatus?
          <Link   to ="/"
                  onClick={Logout}  
                  className="btn btn-danger"
                  >Logout
          </Link>
          :
          <Link   to ="/login"
                  className="btn btn-success"
                  >Login
          </Link>
          }
      </div>
      }
    </>
  );
}

export default Menu