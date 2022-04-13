import './css/Header.css'

// home menu button imports
// import { Link } from "react-router-dom"   // may change this to 'NavLink' later on
import logo from './Components/ranked_arrow.png';
import { React, useState, Fragment, PureComponent } from "react"; // latter two are specific to home button
// import axios from 'axios';

// search bar imports
import TextField from "@mui/material/TextField";    // library where i ported the search from
import List from "./Components/List"      /* this is a stand-in for page data, relevant "id"s should be fed in here for the search bar */

// hamburger menu imports
import Sidebar from './Sidebar';
// import { slide as Menu } from 'react-burger-menu'

/**
 * here is where i did research for the search bar:
 * https://dev.to/salehmubashar/search-bar-in-react-js-545l 
 * 
 * here is where i did research for the hamburger menu:
 * https://github.com/negomi/react-burger-menu 
 * https://www.digitalocean.com/community/tutorials/react-react-burger-menu-sidebar 
 */


const Header = props => {
  // take input for the search bar using w useState() and inputHandler

  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  return (
    <header className="Header-header">
      <nav className="Header-navbar">
        <ul className="nav-links">
          <li className="nav-item">
            <div className="logo-image">
              {/* home button */}
              <a href="/">
                <img src={logo} alt='Logo'/>
              </a>
            </div>
          </li>
          <li className="nav-item">
            {/* search bar */}
            <div className="search">
              <TextField
                id="outlined-basic"
                onChange={inputHandler}     
                variant="outlined"
                fullWidth
                label="Search"
              />
            </div>
            {/* this will be the backend tag file */}
            <List input={inputText}/>  
          </li>
          <li className="nav-item">
            {/* burger menu */}
            <div className='menu'>
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