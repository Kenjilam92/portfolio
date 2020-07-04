import React from "react";
import Card from "./Card";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import json2mq from 'json2mq';
import {Link} from "@reach/router";
const AboutMe = props =>{
  const matches = useMediaQuery(
    json2mq({
      maxWidth: 1024,
    }),
  );
  return(
    <>
      <div className="row justify-content-center mt-4 mb-4">
        {matches?
        null
        :
        <div className="col-lg-3 text-center">
          <img className="w-100 rounded float-right"src="/images/kenjilam92.jpg" alt="Kenji Lam"/>
        </div>
        }
        <div className="col-xl-7 col-lg-9 text-white">
          {matches?
          <div className="text-center">
              <img  className="rounded-circle m-2"
                    src="../images/kenjilam92_square.jpg" 
                    alt="Kenji Lam"
                    style={{width : 150 + "px"}}
                    />
          </div>
          :null}
          <h3 className="font-weight-bold text-warning">AboutMe:</h3>
          <p className="text-wrap">
            Hello,<br/>
            My name is <span className="text-warning font-weight-bold ">Kenji</span>! I am a digital marketing specialist and full-stack website developer. I have more than three years of experience building websites and developing online marketing strategies. One of my previous projects is even located within the top 3 results of Google Search! <Link to="/projects"><i>(details)</i></Link> This expertise provides my clients with greater access to their targeted population. With my help, you can achieve high visibility and increased web traffic on all major search engines, such as Google, Bing, and Yahoo.
            </p>
          <p className="text-wrap">
            I have a great passion for technology and mathematic. I typed my first line of code to solve algorithms when I was in high school. However, the internet and the technology of my country, Vietnam, in the 2000s, was not so advanced. Therefore, I focused on business fields and mathematics and got my bachelor's degree in Marketing Management. In 2014, I had my first job as a Digital Marketer, who helped to analyze data and developed SEO strategies for commercial websites. This opportunity brought me closer to the web developer career.  In 2016, I became a permanent resident of the United States and invested two years in college to understand the culture and market in the U.S. During adapting to the new life, I have been working on side-projects and developing my coding skills. Specifically, I can use multiple coding languages include Python, C#, and JavaScript.  Also, I have proficiency in full-stack frameworks, such as Django, ASP.NET core MVC, MERN, etc., which connect with different database systems like MongoDB, MySQL, SQLite. 
            </p>
          <p className="text-wrap">
            In the following years, besides continuously developing other coding languages, frameworks, and data management. I am still available in a fulltime position or side projects. If you are interested in me, please don't hesitate to leave me a message! It will be my pressure to work with you.
            </p>
          <p className="h3 font-weight-bold text-warning">Technical Skills:</p>
          <div className="d-flex w-100 flex-wrap text-white justify-content-center">
              <Card imglink="/images/skill/seo.png" imgalt="SEO">SEO</Card>
              <Card imglink="/images/skill/facebookads.png" imgalt="FacebookAds">Facebook Ads</Card>
              <Card imglink="/images/skill/googleads.png" imgalt="Google Adwords">Google Adwords</Card>
              <Card imglink="/images/skill/aws.png" imgalt="aws">AWS</Card>
              <Card imglink="/images/skill/html.png" imgalt="html">HTML</Card>
              <Card imglink="/images/skill/css.png" imgalt="css">CSS</Card>
              <Card imglink="/images/skill/javascript.png" imgalt="javascript">JavaScript</Card>
              <Card imglink="/images/skill/c-sharp.png" imgalt="c#">C#</Card>
              <Card imglink="/images/skill/python.png" imgalt="python">Python</Card>
              <Card imglink="/images/skill/react.png" imgalt="react">React</Card>
              <Card imglink="/images/skill/dotnet.png" imgalt="dotnet">.NET</Card>
              <Card imglink="/images/skill/aspcoremvc.png" imgalt="ASP_core_MVC">ASP Core MVC</Card>
              <Card imglink="/images/skill/expressjs.png" imgalt="expressjs">Express JS</Card>
              <Card imglink="/images/skill/nodejs.png" imgalt="nodejs">Node JS</Card>
              <Card imglink="/images/skill/django.png" imgalt="django">Django</Card>
              <Card imglink="/images/skill/bootstrap.png" imgalt="bootstrap">Bootstrap</Card>
              <Card imglink="/images/skill/jquery.png" imgalt="jquery">jQuery</Card>
              <Card imglink="/images/skill/socket.png" imgalt="socket">Socket IO</Card>
              <Card imglink="/images/skill/ajax.png" imgalt="ajax">Ajax</Card>
              <Card imglink="/images/skill/mysql.png" imgalt="mysql">MySQL</Card>
              <Card imglink="/images/skill/sqlite.png" imgalt="splite">SQLite</Card>
              <Card imglink="/images/skill/mongodb.png" imgalt="mongodb">MongoDB</Card>
              <Card imglink="/images/skill/wix.png" imgalt="Wix.com">Wix</Card>
              <Card imglink="/images/skill/coreldraw.png" imgalt="CorelDraw">CorelDraw</Card>
              <Card imglink="/images/skill/photoshop.png" imgalt="Photoshop">Photoshop</Card>
          </div>
        </div>
      </div>
    </>
  );
}
export default AboutMe;