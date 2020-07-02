import React from "react";
import {Link} from "@reach/router";
import axios from "axios";
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import json2mq from 'json2mq';

const Menu = props => {

    const theme = useTheme();
    const matches = useMediaQuery(
      json2mq({
        maxWidth: 600,
      }),
    );

    const Logout = () => {
            axios.get("api/logout")
                    .then(res => {
                    console.log(res.data);
                    })
                    .catch(err => console.log(err));
            props.login(false);
            }
    return(
      <>
      {matches?
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <a className="navbar-brand" href="#">Menu</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
            <Link   to="/" 
                    type="button" 
                    className="btn btn-success"
                    >Home
            </Link>
            <Link   to ="/aboutme" 
                    type="button" 
                    className="btn btn-success"
                    >About Me
            </Link>
            {/* <Link   to ="/progressing" 
                    type="button" 
                    className="btn btn-success"
                    >Education & Experiences
              </Link> */}
            <Link   to ="/progressing"
                    type="button" 
                    className="btn btn-success"
                    >Gallery
            </Link>
            <Link   to ="/projects" 
                    type="button" 
                    className="btn btn-success"
                    >Projects
            </Link>
            <Link   to={props.loginStatus? "/messages" : "/login" }
                    type="button" 
                    className="btn btn-success"
                    >{props.loginStatus? "Messages" : "Login"}
            </Link>
            {props.loginStatus?
            <Link   to ="/"
                    onClick={Logout} 
                    type="button" 
                    className="btn btn-danger"
                    >Logout
            </Link>
            :
            null
            }
        </div>
      </div>
    </nav>
      :
        <div className="d-flex justify-content-round btn-group" 
        role="group" 
        aria-label="Basic example">
                <Link   to="/" 
                        type="button" 
                        className="btn btn-success"
                        >Home
                </Link>
                <Link   to ="/aboutme" 
                        type="button" 
                        className="btn btn-success"
                        >About Me
                </Link>
                {/* <Link   to ="/" 
                        type="button" 
                        className="btn btn-success"
                        >Education & Experiences
                  </Link> */}
                <Link   to ="/progressing"
                        type="button" 
                        className="btn btn-success"
                        >Gallery
                </Link>
                <Link   to ="/projects"
                        type="button" 
                        className="btn btn-success"
                        >Projects
                </Link>
                <Link   to={props.loginStatus? "/messages" : "/login" }
                        type="button" 
                        className="btn btn-success"
                        >{props.loginStatus? "Messages" : "Login"}
                </Link>
                {props.loginStatus?
                <Link   to ="/"
                onClick={Logout} 
                type="button" 
                className="btn btn-danger"
                >Logout
                </Link>
                :
                null
                }
        </div>
        }
      </>
    );
}

export default Menu