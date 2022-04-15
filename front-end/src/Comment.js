import React from "react"
// import axios from "axios"
import "./css/Comment.css"
// import LikeButton from "./Components/likeButton";
// import Button from "react-bootstrap/esm/Button"
import CommentForm from "./CommentSubmitForm"
import _ from 'lodash'


const Comment = props => {
  const [wantReply, setwantReply] = React.useState(false)
  
  const indent = num => {
    const i = "L     "
    let ans = ""
    let a = 0
    while (a < num) {
      ans += i
      a++
    }
    return ans
  }

  const handleClick = () => {
    setwantReply(!wantReply)
  }

  return (
    <div className="Comment">

      <div className="Comment-body" onClick={handleClick}>
        <section className="user">
          <pre>
            {/* <p>{indent(props.type)}id: {props.details._id}</p> */}
            <p>{indent(props.type)}user: {props.details.user_id}</p>
            <p>{indent(props.type)}time: {props.details.time}</p>
          </pre>
        </section>
        
        <section className="body">
          <pre>
            <p>{indent(props.type)}{props.details.text}</p>
            {/* <p>{indent(props.type)}<LikeButton></LikeButton>likes: {props.details.likes}</p> */}
          </pre>
        </section>
      </div>
      <section className="replyform">
          <pre>
            {wantReply && !_.isEmpty(props.user) && <CommentForm user={props.user} replyTo={props.details._id} setNewComment={props.setNewComment}/>}
          </pre>
        </section>

      <section className="replies">
        {props.details.replies && props.details.replies.map(item => (
          <Comment user={props.user} key={item._id} type={props.type + 1} details={item} setNewComment={props.setNewComment}></Comment>
        ))}
      </section>
    </div>
  )
}

export default Comment
