import React from "react";
import {useState, useEffect} from "react";
import {Link} from "@reach/router"; 
import useMediaQuery from '@material-ui/core/useMediaQuery';
import json2mq from 'json2mq';
const Home = props => {
    const [img1,setImg1] = useState("/images/kenjilam_mountain.png");
    const matches = useMediaQuery(
        json2mq({
          maxWidth: 600,
        }),
      );
    const fetchImg = () =>{
        matches?
        setImg1("/images/kenjilam_mountain.png")
        :
        setImg1("/images/kenjilam_baltimore.png");
    }
    useEffect(() =>{
        fetchImg();
    },[matches]);

    const heroImage = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${img1}")`,
        height: 100+"%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",

    };
      
    const heroText = {
        textAlign: "center",
        color: "white",
        backgroundColor: "none",
        height: 100+"%"
    };

    return (
        
        <div style={heroImage}>
            <div className="text-white text-center text-nowrap pt-5 w-100" style={heroText}>
                <h1>Kenji Lam</h1>
                <p>Digital Marketing Specialist </p>
                <Link to="/aboutme" className="btn btn-success btn-sm">About me</Link>
            </div>        
        </div>
        
    );
}

export default Home