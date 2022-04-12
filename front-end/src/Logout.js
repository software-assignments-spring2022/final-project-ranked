import React, { useEffect } from "react"
import { Navigate } from "react-router-dom"

const Logout = () => {
  // when the Logout component loads, log out the user
  useEffect(() => {
    localStorage.removeItem("token")
    alert("You have successfully logged out!")
  }, [])

  // redirect the user to the home screen
  return <Navigate to="/" />
}

export default Logout