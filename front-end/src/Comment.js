import React from "react"
import axios from "axios"
import "./css/Comment.css"
// import LikeButton from "./Components/likeButton";
// import Button from "react-bootstrap/esm/Button"
import CommentForm from "./CommentSubmitForm"
import _ from 'lodash'


const Comment = props => {
  const [wantReply, setwantReply] = React.useState(false)
  /*
  const indent = num => {
    const i = "|     "
    let ans = ""
    let a = 0
    while (a < num) {
      ans += i
      a++
    }
    return ans
  }
  */
  const indent = "      "
  const handleClick = () => {
    setwantReply(!wantReply)
  }

  return (
    <div className="Comment">

      <div className="Comment-body" onClick={handleClick}>

      {props.previous ? <PreviousComment id={props.details.id} user={props.details.user_id} previous={props.previous} /> : <br></br>}

        <section className="user">
          
          <pre>
            { <p>{indent}<a id={props.details._id}>id: {props.details._id}</a></p> }
            <p>{indent}user: {props.details.user_id}</p>
            <p>{indent}time: {props.details.time}</p>
          </pre>
        </section>
        
        <section className="body">
          <pre>
            <p>{indent}{props.details.text}</p>
            {/* <p>{indent}<LikeButton props={props}></LikeButton>likes: {props.details.likes}</p> */}
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
          <Comment user={props.user} key={item._id} type={props.type + 1} details={item} setNewComment={props.setNewComment} previous={props.details}></Comment>
        ))}
      </section>
    </div>
  )
}

const PreviousComment = props => {
console.log(props.previous)
let prev = props.previous.user_id
let prevText = props.previous.text
let id = props.previous._id

return (
  <section className="previous">
  <pre>
      <p><small>{id}({prev}) ---&gt; {id}({props.user})</small> </p>
      <h4>{prev} Wrote: </h4>
      <p>{prevText}</p>
      <h4>===========================================================================================================================</h4>
  </pre>      

  </section>
)
}


export default Comment
