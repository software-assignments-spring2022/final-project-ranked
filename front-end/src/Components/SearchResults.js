import { React, useState, useEffect } from "react"
// import axios from 'axios'
// import data from "./SearchResultData.json"
import "./../css/SearchResults.css"
import { useNavigate } from "react-router-dom"

function List(props) {
  // create a new array by filtering the original array
  // filteredData --> element.id
  // this will return the "game-name" of each tag

  const navigate = useNavigate()

  // games are pulled from the title of each megathread
  const filteredGames = props.allGames.filter((game) => {
    if (props.input === "") {
      // return nothing when nothing has been typed into search bar
      // console.log("empty")
    } else {
      // console.log(game.gamename)
      return game.gamename.toLowerCase().includes(props.input)
    }
  })
  // tags are pulled from all created posts
  const filteredPosts = props.allPosts.filter((post) => {
    if (props.input === "") {
      // return nothing when nothing has been typed into search bar
      // console.log("empty")
    } else {
      // this should index through available tags given a post and return to main
      return post.title.toLowerCase().includes(props.input)
    }
  })

  const handleClick = (e) => {
    navigate(`/megathread/${e._id}`)
    props.setInputText("")
  }

  const handleClick2 = (e) => {
    navigate(`/megathread/${e.megathread}/subthread/${e._id}`)
    props.setInputText("")
  }

  return (
    <ul>
      {filteredGames.map((item) => (
        // with tags.json, feed back relevant posts
        // may need to index thru the array of posts

        // original code
        // this returns the game-name,posts
        // key={item.id} after "search-result" and before >
        // maybe remove .gamename from item call below

        // return <a> link to the megathread housing this game
        <li
          key={item._id}
          onClick={() => handleClick({ _id: item._id })}
          className="search-result-game"
        >
          {item.gamename}
        </li>
      ))}
      {filteredPosts.map((item) => (
        // with tags.json, feed back relevant posts
        // may need to index thru the array of posts

        // original code
        // this returns the game-name,posts
        <li
          key={item._id}
          onClick={() =>
            handleClick2({ _id: item._id, megathread: item.toMegathread })
          }
          className="search-result-post"
        >
          {item.title}
        </li>
      ))}
    </ul>
  )
}

export default List
