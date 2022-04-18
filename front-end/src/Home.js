import React, { useState, useEffect, useCallback } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Post from "./Post"
import "./css/App.css"
import "./css/Home.css"
import _ from "lodash"

const Home = (props) => {
  const navigate = useNavigate()
  const [postData, setPostData] = useState([])
  const [gameData, setGameData] = useState()
  const [loaded, setLoaded] = useState(false)

  /**
   * A nested function that fetches posts from the back-end server.
   */
  const fetchPosts = () => {
    // fetch data for posts
    console.log(`fetching posts from backend...`)
    axios(`${process.env.REACT_APP_SERVER_HOSTNAME}/posts`)
      .then((response) => {
        // extract the data from the server response
        setPostData(response.data.home_posts)
      })
      .catch((err) => {
        console.log(`Sorry, couldn't get posts data from backend...`)
        console.error(err)
        setPostData([])
      })
  }

  /**
   * A nested function that fetches game names from the back-end server. (To be completed)
   */
  const fetchGameNames = () => {
    // fetch data for game names
    axios(`${process.env.REACT_APP_SERVER_HOSTNAME}/games`)
      .then((response) => {
        // extract the data from the server response
        setGameData(response.data.games)
      })
      .catch((err) => {
        console.log(`Sorry, buster.  No more requests allowed today!`)
        console.error(err)
      })
  }

  useEffect(() => {
    setLoaded(false)
    fetchPosts()
    fetchGameNames()
    setLoaded(true)
  }, [])

  const handleGameClick = (e) => {
    navigate(`/megathread/${e.gameId}`)
  }

  const handleButtonClick = (e) => {
    navigate(`/megathread/${e.gameId}/subthread/${e.postId}`)
  }

  return (
    <main className="Home">
      <div className="game-list">
        {!_.isEmpty(gameData) &&
          gameData.map((item) => (
            <div
              className="game"
              key={item._id}
              onClick={() =>
                handleGameClick({
                  gameId: item._id,
                })
              }
            >
              <pre>{item.gamename}</pre>
            </div>
          ))}
        {_.isEmpty(gameData) &&
        <div className="no games">
          Wow so empty... Head over to `link to /threadrequest` to request for a game you want on this website!
        </div> && loaded}
      </div>
      <div className="posts">
        {_.isEmpty(postData) &&
          <div className="no games">
            Wow so empty... Be the first to post something on RANKED
          </div> && loaded}
        {!_.isEmpty(postData) &&
          postData.map((item) => (
            <div
              className="post"
              key={item._id}
              onClick={() =>
                handleButtonClick({
                  postId: item._id,
                  gameId: item.toMegathread,
                })
              }
            >
              <Post key={item._id} user={props.user} post={item}></Post>
            </div>
          ))}
      </div>
    </main>
  )
}

export default Home
