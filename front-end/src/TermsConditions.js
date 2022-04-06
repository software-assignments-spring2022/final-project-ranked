import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import 'bootstrap/dist/css/bootstrap.min.css'
import './TermsConditions.css'

const TermsCondtions = () => {
    const [data, setData] = useState([])

    useEffect(() => {
      // fetch static data from server
      console.log("fetching static file TermsConditions.txt from the back-end")
      axios
        .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/terms`)
        // .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/static/TermsConditions.html`)
        .then((response) => {
          // extract the data from the server response
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
        <main className='TermsConditions'>
          <div className='termsTitle'>
            <img src={data[0]} alt='terms image' /> 
            <div className='centered'><b>{data[1]}</b></div>
          </div>

          <div className='termsText'>
            <DropdownButton id='dropdown-basic-button' title='Select Document'>
              <Dropdown.Item href="#/action-1">{data[2]}</Dropdown.Item>
              <Dropdown.Item href="#/action-2">{data[3]}</Dropdown.Item>
              <Dropdown.Item href="#/action-3">{data[4]}</Dropdown.Item>
            </DropdownButton>
            <h3>{data[5]}</h3>
            {data[6]}<br></br>
            {data[7]}<br></br>
            {data[8]}<br></br>
            <h3>{data[9]}</h3>
            <p>{data[10]}</p>
          </div>

          <div className="termsFooter">
            <Link to='/aboutus'>{data[11]}</Link>
          </div>
        </main>
      </>
    )
}

export default TermsCondtions 