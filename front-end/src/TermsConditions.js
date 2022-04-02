import React, { useState, useEffect } from "react"
import axios from "axios"
import './TermsConditions.css'

const TermsCondtions = props => {
    const [data, setData] = useState([])

    useEffect(() => {
      // fetch static data from server
      console.log(`fetching static file TermsConditions.html`)
      axios
        .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/static/TermsConditions.html`)
        .then((response) => {
          // extract the data from the server response
          setData(response.data)
        })
        .catch((err) => {
          console.log(`Can't reach backend server`)
          console.error(err)
  
          setData(<h>can't reach this page sorry</h>)
        })
    }, [])
  
    return (
        <>
            <main className='TermsConditions'>
                {data}
            </main>
        </>
    )
}

export default TermsCondtions 