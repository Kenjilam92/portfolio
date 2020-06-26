import React from "react";

const Info = props => {
    return(
      <>
        <table className="table text-white">
          <thead>
            <tr>
              <th><h1 className="font-weight-bold">Kenji Lam</h1></th>
              <th><p  className="h2 font-italic">Digital Marketing Specialist</p></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Location:</th>
              <td>Washington D.C. Metropolian Area</td>
            </tr>
            <tr>
              <th>Email:</th>
              <td>kenji.lam.92@gmail.com</td>
            </tr>
            <tr>
              <th>Phone:</th>
              <td>703-622-0116</td>
            </tr>
            <tr>
              <th>Career Status:</th>
              <td>Freelancer</td>
            </tr>
          </tbody>
        </table>
        
        {/* <div className="row">
          <p className="col-sm-4 font-weight-bold"></p>
          <p className="col-sm-8"></p>
        </div>
        <div className="row">
          <p className="col-sm-4 font-weight-bold"></p>
          <p className="col-sm-8"></p>
        </div>
        <div className="row">
          <p className="col-sm-4 font-weight-bold"></p>
          <p className="col-sm-8"></p>
        </div>
        <div className="row">
          <p className="col-sm-4 font-weight-bold"></p>
          <p className="col-sm-8"></p>
        </div> */}
      </>
    );
}

export default Info