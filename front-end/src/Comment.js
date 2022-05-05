import React, { useState, useEffect } from "react"
import axios from "axios"
import "./css/Comment.css"
import CommentForm from "./CommentSubmitForm"
import _ from "lodash"
import Moment from "react-moment"

const Comment = (props) => {
  const [wantReply, setwantReply] = React.useState(false)
  const [likes, setLikes] = React.useState(props.details.likes)
  const [liked, setLiked] = React.useState("LIKE")

  useEffect(() => {
    if(props.details.likedUsers.indexOf(props.user._id) >= 0)
      setLiked("LIKED")
  }, [])

  const PreviousComment = (props) => {
    let prev = props.previous.user_id
    let prevText = props.previous.text
    let id = props.previous._id

    return (
      <section className="previous">
        <pre>
          <p>
            <small>
              {id}({prev}) ---&gt; {props.id}({props.user})
            </small>{" "}
          </p>
          <h4>{prev} Wrote: </h4>
          <p>{prevText}</p>
          <h4>
            ======================================================================================================
          </h4>
        </pre>
      </section>
    )
  }

  const handleClick = () => {
    setwantReply(!wantReply)
  }

  const handleDelete = () => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/${props.details._id}/comment/delete`,
        {
          user: props.user,
        }
      )
      .then((response) => {
        // success
        console.log(`Deleted comment ${response.data.comment}`)
        props.setNewComment(response.data.comment)
      })
      .catch((err) => {
        // failure
        console.log(`Received server error: ${err}`)
      })
  }

  const handleLike = () => {
    if (!_.isEmpty(props.user)) {
      axios
        .post(
          `${process.env.REACT_APP_SERVER_HOSTNAME}/${props.details._id}/comment/like`,
          {
            user: props.user,
          }
        )
        .then((response) => {
          console.log(`Liked or Unliked comment ${response.data.comment}`)
          setLikes(response.data.comment.likes)
          liked === "LIKED" ? setLiked("LIKE") : setLiked("LIKED")
        })
        .catch((err) => {
          console.log(`Received server error: ${err}`)
        })
    } else {
      alert(`log in before liking!`)
    }
  }

  return (
    <div className="Comment">
      <div className="Comment-body" onClick={handleClick}>
        {props.previous ? (
          <PreviousComment
            id={props.details._id}
            user={props.details.user_id}
            previous={props.previous}
          />
        ) : (
          <br></br>
        )}

        {props.user.username === props.details.user_id && (
          <button className="deleteButton" onClick={handleDelete}>
            {" "}
            delete{" "}
          </button>
        )}
        <section className="user">
          <div className="user-info">
            <img
              className="user-image"
              src={props.details.user_image}
              alt="user profile image"
            ></img>
            <p className="userId">user: {props.details.user_id}</p>
          </div>
          <p className="comment-time">&nbsp;Commented:<Moment fromNow>{props.details.time}</Moment>&nbsp; </p>
        </section>

        <section className="body">
          <pre>{props.details.text}</pre>
        </section>

        <section className="like">
          <button className="likeButton" onClick={handleLike}>
          <span className="normal">{" "}
            {liked}{" "}</span><span className="thumb" role="img" aria-label="Like">👍</span>
          </button>
          <div className="likes"> {likes} </div>
        </section>
      </div>
        {wantReply && !_.isEmpty(props.user) && (

      <div className="C-replyform">
          <CommentForm
            user={props.user}
            replyTo={props.details._id}
            setNewComment={props.setNewComment}
          />

      </div>
        )}

      <section className="replies">
        {props.details.replies &&
          props.details.replies.map((item) => (
            <Comment
              user={props.user}
              key={item._id}
              type={props.type + 1}
              details={item}
              setNewComment={props.setNewComment}
              previous={props.details}
            ></Comment>
          ))}
      </section>
    </div>
  )
}

export default Comment