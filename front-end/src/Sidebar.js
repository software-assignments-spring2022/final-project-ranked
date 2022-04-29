import { useState, useEffect } from "react"
import { slide as Menu } from "react-burger-menu"
import "./css/Sidebar.css"
import axios from "axios"

export default (props) => {
  const jwtToken = localStorage.getItem("token")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/isLoggedIn`, {
        headers: { Authorization: `JWT ${jwtToken}` },
      })
      .then((res) => {
        if (res.data.success) {
          setIsLoggedIn(true)
        }
      })
  }, [])

  return (
    <Menu right>
      {/* change Login to Account if logged-in */}
      {isLoggedIn ? (
        <a className="menu-item" href="/account">
          Account
        </a>
      ) : (
        <a className="menu-item" href="/login">
          Login/Register
        </a>
      )}
      <a className="menu-item" href="/about">
        About Us
      </a>
      <a className="menu-item" href="/threadrequest">
        Thread Request
      </a>
      {/* show logout only if logged-in */}
      {isLoggedIn ? (
        <a className="menu-item" href="/logout">
          Logout
        </a>
      ) : (
        ""
      )}
    </Menu>
  )
}