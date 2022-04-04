import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import "./AboutUs.css"

const AboutUs = () => {
  const [data, setData] = useState([])
  
  useEffect(() => {
    // fetch static data from server
    console.log("fetching static file AboutUs.txt from the back-end")
    axios
      .get("http://localhost:4000/aboutus")
      // .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/static/AboutUs.html`)
      .then((response) => {
        // extract and parse the data (by each new line) from the server response
        setData(response.data.split(/\r?\n/))
      })
      .catch((err) => {
        console.log("Can't reach the back-end server!")
        console.error(err)
        alert("There seems to be a problem with the server, please try again later!")
      })
  }, [])

  return (
    <>
      <main className='aboutUs'>
          <div className='aboutUsTitle'>
              <img src={data[0]} alt='title image' />
              <div className='centered'><b>{data[1]}</b></div>
          </div>

          <div className='aboutContent'>
              <div className='aboutPair'>
                  <div className='aboutImages'>
                      <img src={data[0]}></img>
                  </div>
                  <div className='aboutText'>
                      <p><b>{data[2]}</b></p>
                      <p>{data[5]}</p>
                  </div> 
              </div>
              <div className='aboutPair'>
                  <div className='aboutImages'>
                      <img src={data[0]}></img>
                  </div>
                  <div className='aboutText'>
                      <p><b>{data[3]}</b></p>
                      <p>{data[5]}</p>
                  </div> 
              </div>
              <div className='aboutPair'>
                  <div className='aboutImages'>
                      <img src={data[0]}></img>
                  </div>
                  <div className='aboutText'>
                      <p><b>{data[4]}</b></p>
                      <p>{data[5]}</p>
                  </div> 
              </div>
          </div>

          <div className='aboutFooter'>
              <Link to='/terms'>Terms & Conditions</Link><br></br>
              <Link to='/faq'>FAQ</Link>
          </div>
      </main>
    </>
  )
}

export default AboutUs