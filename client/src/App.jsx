import React from 'react';
import {useState,useEffect} from 'react';
import  {Router} from "@reach/router";
import axios from 'axios';
/////////////CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/dist/modal.js";
import "bootstrap/js/dist/collapse.js";
import "./App.css";
/////////////Components
import Menu from "./Components/Menu";
import Home from "./Components/Home";
import Footer from './Components/Footer';
import Login from './Components/Login';
import MessagesP from './Components/Messages';
import Invitation from "./Components/Invitation";
import Progressing from './Components/Progressing';
import AboutMe from './Components/AboutMe';
import ProjectList from './Components/ProjectList';
import Admin from './Components/Admin';
import UserPage from './Components/UserPage';
import Error404 from './Components/Error404';

function App() {
  const [LoginStatus,setLoginStatus] = useState (false);
  const [User,setUser] = useState ({});
  const CheckBackEndSession = () =>{
    axios.get("/api/session")
      .then(res=>{
        if(res.data.errors){
        console.log(res.data.error)
        }
        else{
          setLoginStatus(res.data.isSignIn);
          res.data.user? setUser(res.data.user): setUser({});
        }
      })
      .catch(err=>console.log(err));
  }

  useEffect (()=>{
    CheckBackEndSession();
  },[]);

  return (
    <div  className="d-flex flex-column justify-content-between w-100 h-100  position-absolute">
      <div className="align-self-start w-100">
        <Menu loginStatus={LoginStatus}
              setLoginStatus={setLoginStatus}
              user={User}
              setUser={setUser}/>
      </div>
      <div className="align-self-center w-100">
        <Router>
          <Home        path ="/"/>
          <AboutMe     path ="/aboutme"/>
          <ProjectList path ="/projects"/>
          <Progressing path ="/progressing"/>
          <Error404    path ="*"/>

          <Login       path ="/login"
                       loginStatus={LoginStatus}
                       login={setLoginStatus}
                       user={User}
                       setUser={setUser}/>

          <MessagesP   path ="/messages"   
                       login={LoginStatus} 
                       user={User}/>

          <Invitation  path ="/invitation"
                       user={User}
                       login={LoginStatus}/>

          <Admin       path ="/admin"      
                       user={User}
                       login={LoginStatus}
                       />

          <UserPage    path ="/blog"
                       checkSession={CheckBackEndSession}
                       user={User}
                       login={LoginStatus}/>

        </Router>
      </div>
      <div className="align-self-end w-100">
        <Footer/>
      </div>
  </div>
  );
}

export default App;
