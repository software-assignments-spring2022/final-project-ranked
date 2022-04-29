import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

const CommentSection = (props) => {
  const [comment, setComment] = useState("")
  const { postId } = useParams()

  const handleSubmit = (e) => {
    e.preventDefault() // prevent the default browser form submission stuff
    let id = ""
    props.replyTo === "root" ? (id = postId) : (id = props.replyTo)

    alert(`You commented!`)

    axios
      .post(`${process.env.REACT_APP_SERVER_HOSTNAME}/${id}/comments/save`, {
        user: props.user,
        comment: comment,
        replyTo: props.replyTo,
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