import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import CommentSection from "./CommentSection"
import Post from "./Post"
import backupData from "./mock-backupPosts.json"
// import comment_info from "./mock-comment-section.json"
import "./Subthread.css"

const Subthread = (props) => {
  const jwtToken = localStorage.getItem("token")
  const [user, setUser] = useState({})
  const [data, setData] = useState([])

  // from the website link
  const { gameId } = useParams()
  const { postId } = useParams()

  //   the following side-effect will be called once upon initial render
  useEffect(() => {
    window.scrollTo(0, 0)
    // fetch some mock data about animals for sale
    // the id of the animal that was clicked on is passed as a part of the match field of the props
    console.log(`fetching post id=${postId}...`)
    axios(
      `${process.env.REACT_APP_SERVER_HOSTNAME}/megathread/${gameId}/subthread/${postId}/post`
    )
      .then((response) => {
        // extract the data from the server response
        setData(response.data.sub_post)
      })
      .catch((err) => {
        // Mockaroo, which we're using for our Mock API, only allows 200 requests per day on the free plan
        console.log(`Sorry, buster.  No more requests allowed today!`)
        console.error(err) // the server returned an error... probably too many requests... until we pay!

        setData(backupData[postId - 1])
      })
    console.log(`fetching account info...`)
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/isLoggedIn`, {
        headers: { Authorization: `JWT ${jwtToken}` },
      })
      // set user's account info if logged-in
      .then((res) => {
        if (res.data.success) {
        //   console.log(res.data.user)
          setUser(res.data.user)
        }
      })
      .catch((err) => {
        if (err) console.log(`Log-in first if you want to comment!`)
      })
  }, [postId])
  
  return (
    <div className="Subthread">
      {/* <button className="back-button" onClick={goBack}> Back </button> */}
      <Post user={user} post={data}></Post>
      <div className="CommentSection">
        <CommentSection user={user} gameId={gameId} postId={postId} />
      </div>
    </div>
  )
}

export default Subthread
