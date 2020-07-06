import React from "react";
import Project from "./Project";
import Card from "./Card"

const ProjectList = props =>{
  return(
    <div className="col m-3">
      <h1 className="text-center text-white" style={{marginLeft:  (-25)+"px"}}>Projects</h1>
      <Project imgLink="/images/project/vanhoagroup.png"
               imgAlt="vanhoagroup.com">
        <div className="row align-content-center">
          <div className="col-xl-6">
            <p ><a className="h2 text-warning" href="http://vanhoagroup.com">vanhoagroup.com</a></p>
            <ul style={{marginLeft:  (-25)+"px"}}>
              <li>Mobile - Friendly</li>
              <li>A commercial project that was built by using online building platform Wix.com</li>
              <li>SEO strategies is applied </li>
              <li>Located at <span >top 3</span> of Google Search Results with the keyword - <a className="font-weight-bold text-warning" href="https://www.google.com/search?q=moc+khoa+cao+su&oq=moc+khoa+cao+su&aqs=chrome..69i57j69i59j69i60l3.3399j0j1&sourceid=chrome&ie=UTF-8">“moc khoa cao su”</a>, which mean “rubber keychain” in Vietnamese</li>
            </ul>
          </div>
          <div className="col-xl-5">
            <p className="h5 font-weight-bold text-warning">Technologies:</p>
            <div className="d-flex w-100 overflow-auto">
              <Card imglink="/images/skill/wix.png" imgalt="Wix.com">Wix</Card>
              <Card imglink="/images/skill/seo.png" imgalt="seo">SEO</Card>
              <Card imglink="/images/skill/googleads.png" imgalt="GoogleAdwords">Google Adwords</Card>
              <Card imglink="/images/skill/facebookads.png" imgalt="FacebookAds">Facebook Ads</Card>
            </div>
          </div>
        </div>
      </Project>
      <Project imgLink="/images/project/flashcardsgame.png"
               imgAlt="flashcards_game">
        <div className="row align-content-center">
          <div className="col-xl-6">
            <p ><a className="h2 text-warning" href="https://github.com/Kenjilam92/flashcards_game">The Flashcards Game (progressing)</a></p>
            <ul style={{marginLeft:  (-25)+"px"}}>
              <li>Mobile - Friendly</li>
              <li>A private project that was built by using MERN framework</li>
              <li>A great study tools which help user learning new words or concepts.</li>
              <li>Users can adjust display settings, and applied CRUD command to manage the flashcards database.</li>
              <li>Algorithms were applied to calculate flashcards that user forget most and give a direction for user to practice on.</li>
            </ul>
          </div>
          <div className="col-xl-5">
            <p className="h5 font-weight-bold text-warning">Technologies:</p>
            <div className="d-flex w-100 overflow-auto">
              <Card imglink="/images/skill/html.png" imgalt="Wix.com">HTML</Card>
              <Card imglink="/images/skill/css.png" imgalt="seo">CSS</Card>
              <Card imglink="/images/skill/javascript.png" imgalt="JavaScript">JS</Card>
              <Card imglink="/images/skill/bootstrap.png" imgalt="Bootstrap">Bootstrap</Card>
              <Card imglink="/images/skill/jquery.png" imgalt="jQuery">jQuery</Card>
            </div>
            <div className="d-flex w-100 overflow-auto">
              <Card imglink="/images/skill/mongodb.png" imgalt="MongoDB">MongoDB</Card>
              <Card imglink="/images/skill/expressjs.png" imgalt="ExpressJS">Express JS</Card>
              <Card imglink="/images/skill/react.png" imgalt="React">React JS</Card>
              <Card imglink="/images/skill/nodejs.png" imgalt="NodeJS">Node JS</Card>
            </div>
          </div>
        </div>
      </Project>
      <Project imgLink="/images/project/portfolio.png"
               imgAlt="flashcards_game">
        <div className="row align-content-center">
          <div className="col-xl-6">
            <p ><a className="h2 text-warning" href="https://github.com/Kenjilam92/flashcards_game">My Portfolio</a></p>
            <ul style={{marginLeft:  (-25)+"px"}}>
              <li>Mobile - Friendly</li>
              <li>A personal project was built by a combination of 2 different languages C# and JavaScript</li>
              <li>The backend use ASP.NET framework, and connect MySQL database</li>
              <li>API protected</li>
              <li>The frontend use the React Application</li>
              <li>The website allows visitor leaves messages that only super user can see</li>
              <li>The new user must have an invitation code which is created by super user to complete register section.</li>
            </ul>
          </div>
          <div className="col-xl-5">
            <p className="h5 font-weight-bold text-warning">Technologies:</p>
            <div className="d-flex w-100 overflow-auto">
              <Card imglink="/images/skill/html.png" imgalt="Wix.com">HTML</Card>
              <Card imglink="/images/skill/css.png" imgalt="seo">CSS</Card>
              <Card imglink="/images/skill/javascript.png" imgalt="JavaScript">JS</Card>
              <Card imglink="/images/skill/c-sharp.png" imgalt="C#">C#</Card>
              <Card imglink="/images/skill/bootstrap.png" imgalt="Bootstrap">Bootstrap</Card>
              <Card imglink="/images/skill/jquery.png" imgalt="jQuery">jQuery</Card>
            </div>
            <div className="d-flex w-100 overflow-auto">
              <Card imglink="/images/skill/mysql.png" imgalt="MySQL">MySQL</Card>
              <Card imglink="/images/skill/dotnet.png" imgalt="dotnet">.NET</Card>
              <Card imglink="/images/skill/asp.png" imgalt="ASP">ASP Core</Card>
              <Card imglink="/images/skill/react.png" imgalt="React">React JS</Card>
              <Card imglink="/images/skill/nodejs.png" imgalt="NodeJS">Node JS</Card>
              <Card imglink="/images/skill/aws.png" imgalt="aws">AWS</Card>
            </div>
          </div>
        </div>
      </Project>
      <p className="h2 text-center text-white" style={{marginLeft:  (-25)+"px"}}> ... <br/> More projects is progressing </p>
    </div>
  );
}
export default ProjectList;