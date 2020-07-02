import React from 'react';
import {useState} from 'react';
import  {Router} from "@reach/router";

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
import Messages from './Components/Messages';
import Invitation from "./Components/Invitation";
import Progressing from './Components/Progressing';
import AboutMe from './Components/AboutMe';
import ProjectList from './Components/ProjectList';
function App() {
  const [LoginStatus,setLoginStatus] = useState (false);
    return (
    <div  className="d-flex flex-column justify-content-between w-100 h-100 p-4 position-absolute">
      <div className="align-self-start w-100">
        <Menu loginStatus={LoginStatus}
              login={setLoginStatus}/>
      </div>
      <div className="align-self-center w-100">
        <Router>
          <Home path="/"/>
          <Login path="/login"
                login={setLoginStatus}/>
          <Messages path="/messages"
                    login={LoginStatus}/>
          <Invitation path="/invitation"
                    login={LoginStatus}/>
          <AboutMe path="/aboutme"/>
          <ProjectList path="/projects"/>
          {/* <Gallery path="/gallery"/>
          <AboutMe path="/aboutme"/>
        <Experience path="/experience"/> */}
        <Progressing path ="/progressing"/>
        </Router>
      </div>
      <div className="align-self-end w-100">
        <Footer/>
      </div>
  </div>
  );
}

export default App;
