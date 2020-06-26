import React from 'react';
import {useState} from 'react';
import  {Router, navigate, Link} from "@reach/router";
/////////////CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/dist/modal.js";
import "./App.css";
/////////////Components
import Menu from "./Components/Menu";
import Home from "./Components/Home";
import Footer from './Components/Footer';
import Login from './Components/Login';
import Messages from './Components/Messages';
import Invitation from "./Components/Invitation";
function App() {
  const [LoginStatus,setLoginStatus] = useState (false);
    return (
    <div  className="d-flex flex-column justify-content-between align-itmes-center position-absolute border w-100 p-4 border-danger"
            style ={{height: 100 + "%"}}>
      <Menu loginStatus={LoginStatus}
            login={setLoginStatus}/>
      <Router>
        <Home path="/"/>
        <Login path="/login"
               login={setLoginStatus}/>
        <Messages path="/messages"
                  login={LoginStatus}/>
        <Invitation path="/invitation"
                  login={LoginStatus}/>
        {/* <Gallery path="/gallery"/>
        <AboutMe path="/aboutme"/>
        <Experience path="/experience"/> */}
      </Router>
      <Footer/>
  </div>
  );
}

export default App;
