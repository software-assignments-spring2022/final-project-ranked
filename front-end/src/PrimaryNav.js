import React from "react"
import "./PrimaryNav.css"
import { Link } from "react-router-dom"
import Sidebar from "./Sidebar"

const PrimaryNav = props => {
  // we assume a function named setuser is passed as a prop to this component

  // show a login link if the user is not yet logged in
  let logInOutComponent = <Link to="/login">Login</Link>
  // show a logout link if the user is already logged in
  if (props.user.success)
    logInOutComponent = (
      <>
        <Link to="/logout">Logout {props.user.username}</Link>
      </>
    )

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/animals">Animals</Link>
      <Link to="/megathread/1">Megathread</Link>
      <Link to="/megathread/1/subthread/1">Subthread</Link>
      {logInOutComponent}
        {/* <Sidebar pageWrapId={"page-wrap"} outerContainerId={"PrimaryNav"}/> */}
    </nav>
  )
}

export default PrimaryNav
