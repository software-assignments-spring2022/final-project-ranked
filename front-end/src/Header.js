import "./css/Header.css"

// home menu button imports
import logo from "./Components/ranked_arrow.png"
import { React, useState, Fragment, PureComponent, useEffect } from "react" // latter two are specific to home button
import axios from "axios"

// search bar imports
import TextField from "@mui/material/TextField" // library where i ported the search from
import List from "./Components/SearchResults" /* this is a stand-in for page data, relevant "id"s should be fed in here for the search bar */

// hamburger menu imports
import Sidebar from "./Sidebar"
// import { slide as Menu } from 'react-burger-menu'

/**
 * here is where i did research for the search bar:
 * https://dev.to/salehmubashar/search-bar-in-react-js-545l
 *
 * here is where i did research for the hamburger menu:
 * https://github.com/negomi/react-burger-menu
 * https://www.digitalocean.com/community/tutorials/react-react-burger-menu-sidebar
 */

const Header = (props) => {
  // take input for the search bar using w useState() and inputHandler

  const [inputText, setInputText] = useState("")
  const [allGames, setAllGames] = useState([])
  const [allPosts, setAllPosts] = useState([])

  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase()
    setInputText(lowerCase)
  }

  // makes GET request for all games and all posts
  useEffect(() => {
    console.log(`fetching games and posts for search bar...`)
    axios(`${process.env.REACT_APP_SERVER_HOSTNAME}/search`) // empty file for .get() requests
      .then((response) => {
        // extract the data from the server response
        setAllGames(response.data.gamesArray)
        setAllPosts(response.data.postsArray)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  return (
    <header className="Header-header">
      <nav className="Header-navbar">
        <ul className="nav-links">
          <li className="nav-item">
            <div className="logo-image">
              {/* home button */}
              <a href="/">
                <img src={logo} alt="Logo" />
              </a>
            </div>
          </li>
          <li className="nav-item">
            {/* search bar */}
            <div className="search">
              <TextField
                id="outlined-basic"
                onChange={inputHandler}
                value={inputText}
                variant="outlined"
                fullWidth
                label="Search"
              />
              <List
                setInputText={setInputText}
                allGames={allGames}
                allPosts={allPosts}
                input={inputText}
              />
            </div>
            {/* this is dropdown where search results display */}
            {/* <List input={inputText}/>   */}
          </li>
          <li className="nav-item">
            {/* burger menu */}
            <div className="menu">
              <Sidebar />
            </div>
            {/* pageWrapId={'page-wrap'} outerContainerId={'outer-container'} */}
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header