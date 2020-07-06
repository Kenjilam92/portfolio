import React from "react";
import Info from "./Info";
import SendMessage from "./SendMessage";

const Home = props =>{
    return (
        <div className="w-100 oveflow-auto">
        {/* body */}
        <div className="row m-0 p-3 text-white justify-content-center align-items-start" style={{minHeight : 35+ "vh"}}>  
          {/* picture */}
          <div className="col-xl-2 col-md-4 text-center me">
            <img className="w-100 "src="/images/kenjilam92.jpg" alt="Kenji Lam"/>
          </div>
          <div className="col-xl-10 col-md-8">
            <div className="row justify-content-center align-items-start">
              <div className="col-xl-7 d-flex justify-content-center">
                <Info/>
              </div>
              <div className="col-xl-5">
                <SendMessage/>
              </div>
            </div>
          </div>
        </div>
    
      </div>
    );
}
export default Home