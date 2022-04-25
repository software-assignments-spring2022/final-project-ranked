import "./css/Megathread.css"
import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
// import Button from "react-bootstrap/Button"
import { useNavigate } from "react-router-dom"
import _ from "lodash"
import Post from "./Post"
import Newpost from "./Newpost"
// import usePostSearch from "./usePostSearch"

const Megathread = (props) => {
  const jwtToken = localStorage.getItem("token")
  const [user, setUser] = useState({})
  const navigate = useNavigate()
  // const [query, setQuery] = useState("")
  // const [pageNumber, setPageNumber] = useState(1)
  // start a state varaible with a blank array
  const [data, setData] = useState([])
  const [wantComent, setWantComment] = useState(false)
  const [newPost, setNewPost] = useState({})
  const [gamename, setGamename] = useState("")
  const [loaded, setLoaded] = useState(false)

  const { gameId } = useParams()

  // the following side-effect will be called once upon initial render
  useEffect(() => {
    // fetch post data from backend
    setLoaded(false)
    console.log(`fetching posts for megathread id=${gameId}...`)
    axios
      .get(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/megathread/${gameId}/posts`
      )
      .then((response) => {
        // extract the data from the server response
        setData(response.data.game_posts)
        setGamename(response.data.gamename)
      })
      .catch((err) => {
        console.log(`Sorry, couldn't get posts data from backend...`)
        console.error(err)
        setData([])
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
        if (err) console.log(`Log-in first if you want to post!`)
      })
      setLoaded(true)
  }, [newPost, gameId, jwtToken])

  // const {
  //   posts,
  //   hasMore,
  //   loading,
  //   error
  // } = usePostSearch(query, pageNumber)

  // const observer = useRef()
  // const lastPostElementRef = useCallback(node => {
  //   if (loading) return
  //   if (observer.current) observer.current.disconnect()
  //   observer.current = new IntersectionObserver(entries => {
  //     if (entries[0].isIntersecting && hasMore) {
  //       setPageNumber(prevPageNumber => prevPageNumber + 1)
  //     }
  //   })
  //   if (node) observer.current.observe(node)
  // }, [loading, hasMore])

  // const handleSearch = e => {
  //   setQuery(e.target.value)
  //   setPageNumber(1)
  // }

  const handleButtonClick = (e) => {
    navigate(`/megathread/${gameId}/subthread/${e}`)
  }

  return (
    <div className="Megathread">
      <div className="gameName">
      {_.isEmpty(gamename) && <div> This game doesn't exist! </div> && loaded}
      {!_.isEmpty(gamename) && <div>
        Game: {gamename}
      </div>}
      </div>
      {_.isEmpty(user) && <div className="gameName"> Log in first to post! </div> && !_.isEmpty(gamename)}
      {!_.isEmpty(gamename) && !_.isEmpty(user) && <div className="selfPosting">
        <button
          className="btn"
          onClick={() => {
            setWantComment(!wantComent)
          }}
        >
          New Post
        </button>
        {wantComent && (
          <Newpost
            user={user}
            setNewPost={setNewPost}
            setWantComment={setWantComment}
          />
        )}
      </div>}
      {!_.isEmpty(gamename) && _.isEmpty(data) && !wantComent &&
          <div className="header">
            Wow so empty... Be the first one to post!
          </div>}
      {!_.isEmpty(data) &&
          <div className="posts">
        {data.map((item) => (
            <div
              className="post"
              key={item._id}
              onClick={() => handleButtonClick(item._id)}
            >
              <Post key={item.post_id} user={user} post={item}></Post>
            </div>
          ))}
      </div>}

      {/* <div>{loading && 'Loading...'}</div>
      <div>{error && 'Error'}</div> */}

      <div className="footer">
        <h2>This is the footer.</h2>
      </div>
    </div>
  )
}

export default Megathread
