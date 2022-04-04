import React, { useState, useEffect } from "react"
import { Navigate } from "react-router-dom"
import axios from "axios"
import "./Comment.css"
import LikeButton from "./Components/likeButton";

const Comment = props => {

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

  return (
    <div className="Comment">
      <section className="user">
        <pre>
          <p>{indent(props.type)}user: {props.details.userId}</p>
        </pre>
      </section>
      <section>
      <LikeButton />
      <br></br><br></br>
      </section>
      <section className="body">
        <pre>
          <p>{indent(props.type)}{props.details.text}</p>
        </pre>
      </section>
      <section className="likes">
        <pre>
          <p>{indent(props.type)}likes: {props.details.likes}</p>
        </pre>
      </section>
      <section className="replies">
        {props.details.replies && props.details.replies.map(item => (
          <Comment key={item.userId} type={props.type + 1} details={item}></Comment>
        ))}
      </section>
    </div>
  )
}

export default Comment
