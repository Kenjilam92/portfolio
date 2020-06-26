import React from "react";
import {Link} from "@reach/router";
import axios from "axios";
const Menu = props => {



    const Logout = () => {
            axios.get("api/logout")
                    .then(res => {
                    console.log(res.data);
                    })
                    .catch(err => console.log(err));
            props.login(false);
            }
    return(
        <div className="d-flex justify-content-round btn-group " 
              role="group" 
              aria-label="Basic example">
                <Link   to="/" 
                        type="button" 
                        className="btn btn-success"
                        >Home
                </Link>
                <Link   to ="/" 
                        type="button" 
                        className="btn btn-success"
                        >About Me
                </Link>
                <Link   to ="/" 
                        type="button" 
                        className="btn btn-success"
                        >Education & Experiences
                  </Link>
                <Link   to ="/"
                        type="button" 
                        className="btn btn-success"
                        >Gallery
                </Link>
                <Link   to ="/" 
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
    );
}

export default Menu