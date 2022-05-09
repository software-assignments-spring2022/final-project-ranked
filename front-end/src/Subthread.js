import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import CommentSection from "./CommentSection"
import Post from "./Post"
import _ from "lodash"
import "./css/Subthread.css"
import loadingIcon from "./Components/peepocomfy.gif"

const Subthread = (props) => {
  const jwtToken = localStorage.getItem("token")
  const [user, setUser] = useState({})
  const [data, setData] = useState([])
  const [loaded, setLoaded] = useState(false)

  // from the website link
  const { gameId } = useParams()
  const { postId } = useParams()

  //   the following side-effect will be called once upon initial render
  useEffect(async () => {
    setLoaded(false)
    window.scrollTo(0, 0)
    // fetching post data from backend
    console.log(`fetching post id=${postId}...`)
    await axios(`${process.env.REACT_APP_SERVER_HOSTNAME}/${postId}/post`)
      .then((response) => {
        // extract the data from the server response
        setData(response.data.sub_post)
      })
      .catch((err) => {
        console.log(`Sorry, couldn't get post data from backend...`)
        console.error(err)
        setData({})
      })
    console.log(`fetching account info...`)
    await axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/isLoggedIn`, {
        headers: { Authorization: `JWT ${jwtToken}` },
      })
      // set user's account info if logged-in
      .then((res) => {
        if (res.data.success) {
          setUser(res.data.user)
        }
      })
      .catch((err) => {
        if (err) console.log(`Log-in first if you want to comment!`)
      })
    setLoaded(true)
  }, [postId, jwtToken])

  return (
    <div className="Subthread">
      <div className="loading">{!loaded && <p><img src={loadingIcon} alt="loading"></img><br></br>LOADING...</p>}</div>
      {loaded && _.isEmpty(data) && (
          <div className="header"> This post doesn't exist! </div>
        )}
      {loaded && !_.isEmpty(data) && <Post user={user} post={data}></Post>}
      {loaded && !_.isEmpty(data) && (
        <div className="CommentSection">
          <CommentSection user={user} gameId={gameId} postId={postId} />
        </div>
      )}
      <div className="Subthread-footer">
        <h2>© 2022 Ranked</h2>
      </div>
    </div>
  )
}

export default Subthread