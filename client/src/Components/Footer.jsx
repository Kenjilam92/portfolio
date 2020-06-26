import React from "react";

const Footer = props =>{
    return(
        <div className="d-flex bg-success p-2 justify-content-around">
            <a href ="https://www.facebook.com/Kenjil.lam"><img className="w-50" src="/images/Facebook_2.png" alt="Facebook"/></a>
            <a href ="https://www.instagram.com/kenji_lam1992/"><img className="w-50" src="/images/Instagram_2.png" alt="instagram"/></a>
            <a href ="https://www.Linkedin.com/in/kenjilam92/"><img className="w-50" src="/images/Linkedin_2.png" alt="LinkedIn"/></a>
            <a href ="https://github.com/Kenjilam92"><img className="w-50" src="/images/Github_2.png" alt="github"/></a>
            <a href ="https://twitter.com/kenjilam92"><img className="w-50" src="/images/Twitter_2.png" alt="twitter"/></a>
        </div>
    );
}

export default Footer;