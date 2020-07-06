import React from "react";

const Progressing = props =>{
    return(
        <div className="row text-center align-items-center">
            <div className="col-sm-3">
                <img className="w-75 rounded-circle"
                     src="../images/kenjilam92_square.jpg" 
                     alt="Kenji Lam"/>
            </div>
            <div className="col-sm-9">
              <p className="h1 text-warning">Sorry! This section is progressing and will be published soon!</p>
            </div>
        </div>
    );
}

export default Progressing;