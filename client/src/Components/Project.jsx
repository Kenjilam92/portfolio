import React from "react";

const Project = props =>{
  return(
    <div className="row border-bottom border-white pt-3 pb-3 w-100">
      <div className="col-lg-5 col-xl-3 justify-content-center mb-4">
        <img src={props.imgLink} alt={props.imgAlt} className="w-100"/>
      </div>
      <div className="col-lg-7 col-xl-9 text-white ">
        {props.children}
      </div>
    </div>
  );
}
export default Project;