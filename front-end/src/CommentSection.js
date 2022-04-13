import { useState, useEffect } from "react"
import axios from "axios"
import "./css/Subthread.css"
import Comment from "./Comment"
import CommentForm from "./CommentSubmitForm"
import "./css/CommentSection.css"

const CommentSection = props => {
  const [data, setData] = useState([])
  const [newComment, setNewComment] = useState({})

  useEffect(() => {
    window.scrollTo(0, 0)
    // fetch some mock data about animals for sale
    // the id of the animal that was clicked on is passed as a part of the match field of the props
    console.log(`fetching comments for gameId=${props.gameId} id=${props.postId}...`)
    axios(`${process.env.REACT_APP_SERVER_HOSTNAME}/megathread/${props.gameId}/subthread/${props.postId}/comments`)
        .then(response => {
            // extract the data from the server response
            console.log(`Retrieving comments from backend`)
            setData(response.data.comments)
        })
        .catch(err => {
            console.log(`Couldn't retrieve comments for game:post_id ${props.gameId}:${props.postId}`)
            console.error(err) // the server returned an error... probably too many requests... until we pay!
            setData([])
        })
}, [newComment])

  return (
    <div className="CommentSection">
      {data &&
        data.map((item) => <Comment key={item.comment_id} type={0} details={item} setNewComment={setNewComment} ></Comment>)}
      <CommentForm user={props.user} replyTo={"root"} setNewComment={setNewComment} />
    </div>
  )
}

export default CommentSection