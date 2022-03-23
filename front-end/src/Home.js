import React, { useState, useEffect, useRef, useCallback } from "react" 
import { Link, useParams } from "react-router-dom" 
import axios from "axios" 
import { useNavigate } from "react-router-dom" 
import Post from "./Post" 
import "./App.css" 
import "./Home.css"

const Home = (props) => {
  const navigate = useNavigate() 
  const [postData, setPostData] = useState([]) 
  const [gameData, setGameData] = useState() 

  useEffect(() => {
    // fetch mock data for posts
    console.log(`fetching 10 posts...`) 
    axios("https://my.api.mockaroo.com/mock_post-feed.json?key=23d25ba0")
      .then((response) => {
        // extract the data from the server response
        setPostData(response.data) 
      })
      .catch((err) => {
        console.log(`Sorry, buster.  No more requests allowed today!`) 
        console.error(err) 

        // make some backup fake data
        const backupData = [
          {
            post_id: 1,
            game_name: "Dimethicone",
            tags: ["sed", "varius"],
            user: "kpolglase0",
            title: "Nisi at nibh in hac habitasse",
            body: "Etiam faucibus cursus urna ut tellus nulla ut erat id mauris vulputate elementum nullam varius nulla facilisi cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla",
            likes: 316,
          },
          {
            post_id: 2,
            game_name: "Benazepril Hydrochloride and Hydrochlorothiazide",
            tags: ["luctus", "integer", "eget"],
            user: "fbaudinot1",
            title:
              "A libero nam dui proin leo odio porttitor id consequat in consequat ut nulla sed accumsan felis ut at",
            body: "Ligula sit amet eleifend pede libero quis orci nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti cras in purus eu magna vulputate luctus cum sociis natoque penatibus et magnis dis",
            likes: 306,
          },
        ] 

        setPostData(backupData) 
      }) 
    axios("https://my.api.mockaroo.com/mock-games.json?key=23d25ba0")
      .then((response) => {
        // extract the data from the server response
        setGameData(response.data) 
      })
      .catch((err) => {
        console.log(`Sorry, buster.  No more requests allowed today!`) 
        console.error(err) 

        // make some backup fake data
        const backupGameData = [
          { game_id: 1, game_name: "Lisinopril" },
          { game_id: 2, game_name: "Fluoxetine Hydrochloride" },
          { game_id: 3, game_name: "HYDROXYZINE HYDROCHLORIDE" },
          { game_id: 4, game_name: "Sleep Nighttime Sleep Aid" },
          { game_id: 5, game_name: "Ondansetron" },
          { game_id: 6, game_name: "pravastatin sodium" },
          { game_id: 7, game_name: "Quality Choice" },
          { game_id: 8, game_name: "Fenofibric Acid" },
          { game_id: 9, game_name: "RITE AID RENEWAL" },
          { game_id: 10, game_name: "Diltiazem Hydrochloride" },
        ] 

        setGameData(backupGameData) 
      }) 
  }, []) 

  const handleGameClick = (e) => {
    navigate(`/megathread/${e.gameId}`) 
  } 

  const handleButtonClick = (e) => {
    navigate(`/megathread/${e.gameId}/subthread/${e.postId}`) 
  } 

  return (
    <main className="Home">
      <h1>Home page of the app</h1>
      <p>
        Link to <Link to="/about">About</Link> page.
      </p>
      <div className="game-list">
        {gameData &&
          gameData.map((item) => (
            <div
              className="game"
              onClick={() =>
                handleGameClick({
                  gameId: item.game_id,
                })
              }
            >
              {item.game_name}
            </div>
          ))}
      </div>
      <div className="posts">
        {postData &&
          postData.map((item) => (
            <div
              className="post"
              onClick={() =>
                handleButtonClick({
                  postId: item.post_id,
                  gameId: item.game_id,
                })
              }
            >
              <Post user={props.user} post={item}></Post>
            </div>
          ))}
      </div>
    </main>
  ) 
} 

export default Home 
