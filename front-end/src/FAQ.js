import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import axios from "axios"
import './FAQ.css';

const FAQ = () => {
    const [data, setData] = useState([])

    useEffect(() => {
      // fetch static data from server
      console.log("fetching static file FAQ.txt from the back-end")
      axios
        .get("http://localhost:4000/faq")
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
            <main className='FAQ'>
                <h3>{data[0]}</h3>
                <div className='FAQ-question1Div'>
                    <em>{data[1]}</em>
                    <p>{data[2]} <Link to='/threadrequest'>{data[3]}</Link> {data[4]}</p>
                </div>
                <div className='FAQ-questionXDiv'>
                    <em>{data[5]}</em>
                    <p>{data[6]} <b>{data[7]}</b>.</p>
                </div>
                <div className='FAQ-questionXDiv'>
                    <em>{data[8]}</em>
                    <p>{data[9]} <b>{data[10]}</b> {data[11]} <Link to='/account'>{data[12]}</Link> {data[13]} </p>
                </div>
                <div className='FAQ-questionXDiv'>
                    <em>{data[14]}</em>
                    <p>{data[15]} <b>{data[16]}</b> {data[17]} <Link to='/account'>{data[18]}</Link> {data[19]}</p>
                </div>
            </main>
        </>
    )
};

export default FAQ