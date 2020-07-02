import React from "react";
import Project from "./Project";

const ProjectList = props =>{
  return(
    <div className="row m-3">
      <Project imgLink="/images/project/vanhoagroup.png"
               imgAlt="vanhoagroup.com">
        <p ><a className="h2 text-warning text-responsive" href="http://vanhoagroup.com">vanhoagroup.com</a></p>
        <p></p>
        <ul>
          <li>This is a commercial project that was built by using online building platform Wix.com</li>
        </ul>
      </Project>
    </div>
  );
}
export default ProjectList;