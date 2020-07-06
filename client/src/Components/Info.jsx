import React from "react";

import useMediaQuery from '@material-ui/core/useMediaQuery';
import json2mq from 'json2mq';

const Info = props => {
    const matches = useMediaQuery(
      json2mq({
        maxWidth: 992,
      }),
    );

    return(
      <>
        <div className="row w-100 ml-3">
          {matches?
          <div className="row w-100 mb-2 align-items-center border-bottom border-white">
            <div className="col-sm-5 text-center">
              <img  className="w-75 rounded-circle m-2"
                    src="../images/kenjilam92_square.jpg" 
                    alt="Kenji Lam"/>
            </div>
            <div className="col-sm-7 text-center">
              <h1 className="h2 font-weight-bold text-nowrap text-warning">Kenji Lam</h1>
              <p className="h5 font-italic">Digital Marketing Specialist</p>
            </div> 
          </div>
          :
          <div className="row w-100 mb-2 align-items-end border-bottom border-white">
              <h1 className="h2 col-sm-5 font-weight-bold text-nowrap text-warning">Kenji Lam</h1>
              <p className="h4 col-sm-7 text-nowrap font-italic">Digital Marketing Specialist</p>
          </div>
          }
          <div className="row w-100 mb-2 align-items-end border-bottom border-white">
            <p className="col-sm-5 font-weight-bold">Location:</p>
            <p className="col-sm-7">Washington D.C. Metropolian Area</p>
          </div>

          <div className="row w-100 mb-2 align-items-end border-bottom border-white">
            <p className="col-sm-5 font-weight-bold">Email:</p>
            <p className="col-sm-7">kenji.lam.92@gmail.com</p>
          </div>

          <div className="row w-100 mb-2 align-items-end border-bottom border-white">
            <p className="col-sm-5 font-weight-bold">Phone:</p>
            <p className="col-sm-7">703-622-0116</p>
          </div>

          <div className="row w-100 mb-2 align-items-end border-bottom border-white">
            <p className="col-sm-5 font-weight-bold">Career Status:</p>
            <p className="col-sm-7">Freelancer</p>
          </div>
        </div>
      </>
    );
}

export default Info