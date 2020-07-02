import React from "react";

const Card = props => {
    return(
        <div className="p-2 text-center">
            <img src={props.imglink} 
                 alt={props.imgalt}
                 className="rounded-circle"
                 style={{height : 75+"px"}}
                 />
            <p>{props.children}</p>
        </div>
    );
}
export default Card;