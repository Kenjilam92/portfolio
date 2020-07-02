import React from "react";
import Card from "./Card";

const AboutMe = props =>{
  return(
    <>
      <div className="row align-items-center">
        <div className="col-xl-2 col-md-4 text-center me">
          <img className="w-100"src="/images/kenjilam92.jpg" alt="Kenji Lam"/>
        </div>
        <div className="col-xl-10 col-md-8 text-white">
          <div className="row">
            <div className="col-md-7 text-center">
              <p className="h3 font-weight-bold text-warning">Languages:</p>
              <div className="row w-100 justify-content-around">
                <Card imglink="/images/skill/html.png" imgalt="html">HTML</Card>
                <Card imglink="/images/skill/css.png" imgalt="css">CSS</Card>
                <Card imglink="/images/skill/javascript.png" imgalt="javascript">JavaScript</Card>
                <Card imglink="/images/skill/c-sharp.png" imgalt="c#">C#</Card>
                <Card imglink="/images/skill/python.png" imgalt="python">Python</Card>
              </div>
              <p className="h3 font-weight-bold text-warning">Frameworks:</p>
              <div className="row w-100 justify-content-around">
                <Card imglink="/images/skill/react.png" imgalt="react">React</Card>
                <Card imglink="/images/skill/dotnet.png" imgalt="dotnet">.NET</Card>
                <Card imglink="/images/skill/expressjs.png" imgalt="expressjs">Express JS</Card>
                <Card imglink="/images/skill/nodejs.png" imgalt="nodejs">Node JS</Card>
                <Card imglink="/images/skill/django.png" imgalt="django">Django</Card>
              </div>
            </div>
            <div className="col-md-5">
            <p className="h3 font-weight-bold text-warning">Tools:</p>
            <div className="row w-100 justify-content-around">
              <Card imglink="/images/skill/bootstrap.png" imgalt="bootstrap">Bootstrap</Card>
              <Card imglink="/images/skill/jquery.png" imgalt="jquery">jQuery</Card>
              <Card imglink="/images/skill/socket.png" imgalt="socket">Socket IO</Card>
            </div>
            <p className="h3 font-weight-bold text-warning">Database:</p>
            <div className="row w-100 justify-content-around">
              <Card imglink="/images/skill/ajax.png" imgalt="ajax">Ajax</Card>
              <Card imglink="/images/skill/mysql.png" imgalt="mysql">MySQL</Card>
              <Card imglink="/images/skill/sqlite.png" imgalt="splite">SQLite</Card>
              <Card imglink="/images/skill/mongodb.png" imgalt="mongodb">MongoDB</Card>
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AboutMe;