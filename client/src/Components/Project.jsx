import React from "react";

const Project = props =>{
  return(
    <div className="row border-bottom border-white pt-3 pb-3 w-100">
      <div className="col-sm-3">
        <img src={props.imgLink} alt={props.imgAlt} className="w-100"/>
      </div>
      <div className="col-sm-9 text-white">
        {props.children}
      </div>
    </div>
  );
}
export default Project;