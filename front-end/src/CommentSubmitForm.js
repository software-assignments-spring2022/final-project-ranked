import { useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import "./Subthread.css"
import "./CommentSection.css"

const CommentSection = props => {
  const [comment, setComment] = useState("") 
  const {gameId} = useParams()
  const {postId} = useParams() 

  const handleSubmit = (e) => {
    e.preventDefault()  // prevent the default browser form submission stuff

    alert(`You commented!`) 

    // send the data of the new puppy to a server
    // this server doesn't exist, so we will see an error in the console
    // axios' get() and post() methods return a promise, so we can use our javascript Promise or async/await expertise here to deal with the resolution or rejection of the request
    axios
      .post(`${process.env.REACT_APP_SERVER_HOSTNAME}/megathread/${gameId}/subthread/${postId}/comments/save`, {
        // user: props.user
        comment: comment,
        replyTo: props.replyTo
      })
      .then((response) => {
        // success
        console.log(`Received server response: ${response.data.comments}`)
        props.setNewComment(response.data.comment)
      })
      .catch((err) => {
        // failure
        console.log(`Received server error: ${err}`)
      })
      setComment("")
  }

  return (
    <div className="CommentSectionForm">
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
          <input type="submit" disabled={!comment} value="send" />
        </div>
      </form>
    </div>
  )
}

export default CommentSection