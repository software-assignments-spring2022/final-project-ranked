import React, { useState, useEffect } from "react"
import { Navigate } from "react-router-dom"
import axios from "axios"
import "./Comment.css"
import LikeButton from "./Components/likeButton";
import Button from "react-bootstrap/esm/Button"
import CommentForm from "./CommentSubmitForm"


const Comment = props => {
  const [wantReply, setwantReply] = React.useState(false)
  var key = 0

  const indent = num => {
    const i = "L       "
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
            <p>{indent(props.type)}id: {props.details.comment_id}</p>
            <p>{indent(props.type)}user: {props.details.user_id}</p>
            <p>{indent(props.type)}time: {props.details.time}</p>
          </pre>
        </section>
        
        <section className="body">
          <pre>
            <p>{indent(props.type)}{props.details.text}</p>
            <p>{indent(props.type)}likes: {props.details.likes}</p>
          </pre>
        </section>
      </div>
      <section className="replyform">
          <pre>
            {wantReply && <CommentForm user={props.user} replyTo={props.details.comment_id} setNewComment={props.setNewComment}/>}
          </pre>
        </section>

      <section className="replies">
        {props.details.replies && props.details.replies.map(item => (
          <Comment key={key++} type={props.type + 1} details={item}></Comment>
        ))}
      </section>
    </div>
  )
}

export default Comment
