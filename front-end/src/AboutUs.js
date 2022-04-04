import React, { useState, useEffect } from "react"
import axios from "axios"
import "./AboutUs.css"

const AboutUs = (props) => {
  const [data, setData] = useState([])

  useEffect(() => {
    // fetch static data from server
    console.log(`fetching static file AboutUs.html`)
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/static/AboutUs.html`)
      .then((response) => {
        // extract the data from the server response
        setData(response.data)
      })
      .catch((err) => {
        console.log(`Can't reach backend server`)
        console.error(err)

        setData(<p>can't reach this page sorry</p>)
      })
  }, [])

  return (<main className="aboutUs"> {data} </main>)
}

export default AboutUs
