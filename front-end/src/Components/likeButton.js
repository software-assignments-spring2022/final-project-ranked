import React, { useEffect, useState } from "react";
import cn from "classnames";
import { ReactComponent as Hand } from "./hand.svg";
import axios from "axios"
import "./likeButton.scss";

const particleList = Array.from(Array(10));

const LikeButton = (props) => {
  const [liked, setLiked] = useState(null);
  const [clicked, setClicked] = useState(false);
  

  return (
    <button
      onClick={() => {
        console.log("Hi!")
        setLiked(!liked);
        if (liked === true){
         //axios get function for likes, then post function. props.type for post or comment
        }
        else {
          //this.props.details.likes--;
    
        }
    
        setClicked(true);
      }}
      onAnimationEnd={() => setClicked(false)}
      className={cn("like-button-wrapper", {
        liked,
        clicked,
      })}
    >
      {liked && (
        <div className="particles">
          {particleList.map((_, index) => (
            <div
              className="particle-rotate"
              style={{
                transform: `rotate(${
                  (360 / particleList.length) * index + 1
                }deg)`,
              }}
            >
              <div className="particle-tick" />
            </div>
          ))}
        </div>
      )}
      <div className="like-button">
        <Hand />
        <span>Like</span>
        <span className={cn("suffix", { liked })}>d</span>
      </div>
    </button>
  );
};

export default LikeButton;