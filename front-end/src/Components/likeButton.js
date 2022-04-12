import React, { useEffect, useState } from "react";
import cn from "classnames";
import { ReactComponent as Hand } from "./hand.svg";
import axios from "axios"
import "./likeButton.scss";

/*
This component is the like button. It should be applicable on Post objects and Comment objects (For now, only handling comments).
Since each like button is only associated with a single Post or Comment object, I do NOT need to render all comments associated with a single post in the state of this component.
Most of the bread and butter of this component is housed in the back-end/app.js file.
fetchComment() serves as a means to load the current state of our comment object (this means loading the number of likes and the likedUsers array).
voteComment() assumes that Comment.likedUsers is an array of userId's. 
*/

const particleList = Array.from(Array(10));

const LikeButton = (props) => {
  
  const [comment, setComment] = useState([])
  // completely unnecessary for now, but in the future, loaded and setLoaded states will help
  const [loaded, setLoaded] = useState(false)

  // setComment to whatever is returned from the api request
  const fetchComment = () => {
    // body of the request
    const payload = {
      'comment_id':props.details.comment_id
    }
    axios
      .post(`${process.env.REACT_APP_SERVER_HOSTNAME}/megathread/${props.gameId}/subthread/${props.postId}/comments/search`, payload)
      .then(response => {
        const comment = response.data.comment
        setComment(comment)
      })
      .catch(err => {
        console.log(err)
      })
      // again, unnecessary, but I think can be cool later
      .finally(() => {
        setLoaded(true)
      })
  }

  // the function that changes the value of the current comment's likes and likedUsers
  const voteComment = () => {
    // sets likes and likedUsers to what they currently are
    const likes = props.details.likes
    const likedUsers = [props.details.likedUsers]
    // loops through every user in the current list of likedUsers to find a match
    for (const user in props.details.likedUsers) {
      // if a match is found, then it removes that user from the likedUser list and decreases the likes count by 1 (it's removing their like)
      if (props.user_id === user) {
        const index = likedUsers.indexOf(props.user_id)
        likedUsers.splice(index, 1); likes--;
      }
    }
    // checks if the likes count is the same (if it is not then it was decremented above and this conditional should be ignored)
    if (likes === props.details.likes) {
      // then adds the user to the likedUser list and increments the likes count.
      likedUsers.push(props.user_id); likes++;
    }

    // body of the post request to the endpoint to update a comment
    const payload = {
      'comment_id': props.details.comment_id,
      'likes': likes + props.details.likes,
      'likedUsers': likedUsers
    }
    axios
      .post(`${process.env.REACT_APP_SERVER_HOSTNAME}/megathread/${props.gameId}/subthread/${props.postId}/comments`, payload)
      .then(response => {
        // endpoint returns an array of all comments associated with the post, so I have to loop through again
        const newComments = response.data.comments
        for (const i in newComments) {
          if (i.comment_id === props.details.comment_id) {
            // updates the current state of the comment in the front end
            setComment(i)
          }
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  // quick check if this is dealing with a Post or Comment object, but I have no idea if this part is correct
  const isPost = () => props.details.type === 'post';

  // aggregation function to keep useEffect() clean
  const vote = () => {
    if (isPost() === true) {
      return null
    } else {
      return voteComment()
    }
  }

  useEffect(() => {
    fetchComment()
  }, [])
  
  return (
    <button onClick={vote()}>Vote</button>
  )

};

export default LikeButton;

/*
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
*/