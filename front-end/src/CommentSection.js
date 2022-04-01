import { useState, useEffect } from "react"
import axios from "axios"
import "./Subthread.css"
import comments from "./mock-comment-section.json"
import Comment from "./Comment"
import "./CommentSection.css"

const CommentSection = props => {
  const [comment, setComment] = useState("") 

  const handleSubmit = (e) => {
    e.preventDefault()  // prevent the default browser form submission stuff

    alert(`You commented!`) 

    // send the data of the new puppy to a server
    // this server doesn't exist, so we will see an error in the console
    // axios' get() and post() methods return a promise, so we can use our javascript Promise or async/await expertise here to deal with the resolution or rejection of the request
    axios
      .post("https://someserversomehwere.com/puppy/save", {
        comment: comment,
      })
      .then((response) => {
        // success
        console.log(`Received server response: ${response.data}`)
      })
      .catch((err) => {
        // failure
        console.log(`Received server error: ${err}`)
      })
  }

  return (
    <div className="CommentSection">
      {comments &&
        comments.map((item) => <Comment key={item.userId} type={0} details={item}></Comment>)}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            id="comment_field"
            type="text"
            placeholder="Comment something!"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div className="sendButton">
          <input type="submit" value="send" />
        </div>
      </form>
    </div>
  )
}

export default CommentSection