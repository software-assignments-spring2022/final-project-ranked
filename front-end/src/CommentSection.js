import { useState, useEffect } from "react"
import axios from "axios"
import "./Subthread.css"
import comments from "./mock-comment-section.json"
import Comment from "./Comment"
import "./CommentSection.css"

const CommentSection = props => {
  const [data, setData] = useState([])
  const [comment, setComment] = useState({}) 

  useEffect(() => {
    window.scrollTo(0, 0)
    // fetch some mock data about animals for sale
    // the id of the animal that was clicked on is passed as a part of the match field of the props
    console.log(`fetching comments for gameId=${props.gameId} id=${props.postId}...`)
    axios(`${process.env.REACT_APP_SERVER_HOSTNAME}/megathread/${props.gameId}/subthread/${props.postId}/comments`)
        .then(response => {
            // extract the data from the server response
            setData(response.data.comments)
        })
        .catch(err => {
            // Mockaroo, which we're using for our Mock API, only allows 200 requests per day on the free plan
            console.log(`Sorry, buster.  No more requests allowed today!`)
            console.error(err) // the server returned an error... probably too many requests... until we pay!

            setData([])
        })
}, [])

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
      {data &&
        data.map((item) => <Comment key={item.userId} type={0} details={item}></Comment>)}
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