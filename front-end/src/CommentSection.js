import { useState, useEffect } from "react"
import axios from "axios"
import "./css/Subthread.css"
import Comment from "./Comment"
import CommentForm from "./CommentSubmitForm"
import _ from "lodash"
import "./css/CommentSection.css"

const CommentSection = (props) => {
  const [data, setData] = useState([])
  const [newComment, setNewComment] = useState({})

  useEffect(() => {
    window.scrollTo(0, 0)
    console.log(
      `fetching comments for gameId=${props.gameId} id=${props.postId}...`
    )
    axios(`${process.env.REACT_APP_SERVER_HOSTNAME}/${props.postId}/comments`)
      .then((response) => {
        console.log(`Retrieving comments from backend`)
        setData(response.data.comments)
      })
      .catch((err) => {
        console.log(
          `Couldn't retrieve comments for game:post_id ${props.gameId}:${props.postId}`
        )
        console.error(err)
        setData([])
      })
  }, [newComment, props.gameId, props.postId])

  return (
    <div className="CommentSection">
      {!_.isEmpty(data) &&
        data.map((item) => (
          <Comment
            user={props.user}
            key={item._id}
            type={0}
            details={item}
            setNewComment={setNewComment}
          ></Comment>
        ))}
      {_.isEmpty(props.user) && (
        <div className="noUser">Login first to comment!</div>
      )}
      {!_.isEmpty(props.user) && (
        <div className="replyForm">
          <CommentForm
            user={props.user}
            replyTo={"root"}
            setNewComment={setNewComment}
          />
        </div>
      )}
    </div>
  )
}

export default CommentSection