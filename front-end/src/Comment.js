import React from "react"
import axios from "axios"
import "./css/Comment.css"
import "./css/CommentSection.css"
import CommentForm from "./CommentSubmitForm"
import _ from "lodash"
import Moment from "react-moment"

const Comment = (props) => {
  const [wantReply, setwantReply] = React.useState(false)
  const [likes, setLikes] = React.useState(props.details.likes)

  const PreviousComment = (props) => {
    let prev = props.previous.user_id
    let prevText = props.previous.text
    let id = props.previous._id

    return (
      <section className="previous">
        <pre>
          <p>
            <small>
              {id}({prev}) ---&gt {props.id}({props.user})
            </small>{" "}
          </p>
          <h4>{prev} Wrote: </h4>
          <p>{prevText}</p>
          <h4>
            ===========================================================================================================================
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
            <p>&nbspCommented:&nbsp</p>
            <Moment fromNow>{props.details.time}</Moment>
          </div>
        </section>

        <section className="body">
          <pre>{props.details.text}</pre>
        </section>

        <section className="like">
          <button className="likeButton" onClick={handleLike}>
            {" "}
            LIKE{" "}
          </button>
          <div className="likes"> {likes} </div>
        </section>
      </div>
      <section className="replyform">
        {wantReply && !_.isEmpty(props.user) && (
          <CommentForm
            user={props.user}
            replyTo={props.details._id}
            setNewComment={props.setNewComment}
          />
        )}
      </section>

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