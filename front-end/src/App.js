import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Terms from "./TermsConditions"
import FAQ from "./FAQ"
import Home from "./Home"
import Header from "./Header"
import About from "./AboutUs"
import Login from "./Login"
import Register from "./Register"
import Account from "./Account"
import ThreadRequest from "./ThreadRequest"
import Card from 'react-bootstrap/Card'
import Megathread from "./Megathread"
import Subthread from "./Subthread"
import Logout from "./Logout"
import Admin from "./AdminPanel"
import axios from "axios"

// styling
import './App.css' 

const App = () => {
  const [user, setUser] = useState({}) 

  // for Account.js
  const [accountInfo, setAccountInfo] = useState({})
  const handleResetPwClick = () => {
      alert('An reset password email has been sent to you!') 
  } 
  const handleDelAccClick = () => {
      alert('Hope to see you again soon!') 
  }
  const backUpAccountData = {"username":"wmattisssen0","email":"bsenussi0@eepurl.com","country":"Ecuador"}
  useEffect(() => {
      axios("https://my.api.mockaroo.com/ranked_account_page.json?key=9fd06810")
      .then(res => setAccountInfo(res.data))
      .catch(err => {
          // console.log("reached 200 requests limit for today :( using backup data as for now")
          console.log(err)
          setAccountInfo(backUpAccountData)
      })  
  }, [])
  
  // for ThreadRequest.js
  const handleRequestClick = () => {
    alert('Request submitted! We will get back to you ASAP.') 
  } 

  // for Register.js
  const handleRegisterClick = () => {
    alert(`Welcome, ${accountInfo.username}!`) 
  }

  return (
    <>
      <div className="App">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} ></Route>
            <Route path="/login" element={<Login />} ></Route>
            <Route path="/register" element={<Register handleRegisterClick={handleRegisterClick} />}></Route>
            <Route path="/aboutus" element={<About />}></Route>
            <Route path="/terms" element={<Terms mockImg={'https://picsum.photos/200/300'} />} ></Route>
            <Route path="/faq" element={<FAQ />} ></Route>
            <Route path="/admin" element={<Admin />} ></Route>
            <Route path="/threadrequest" element={
              <ThreadRequest handleRequestClick={handleRequestClick} />} >
            </Route>
            <Route path="/account" element={
              <Account
                mockImgSource={'https://picsum.photos/200/300'}
                username={accountInfo.username}
                email={accountInfo.email}
                country={accountInfo.country}
                handleResetPwClick={handleResetPwClick}
                handleDelAccClick={handleDelAccClick}
              />}>
            </Route>
            <Route path="/logout" element={<Logout user={user} setuser={setUser} />} />
            <Route path="/megathread/:gameId" element={<Megathread user={user} />} />
            <Route path="/megathread/:gameId/subthread/:postId" element={<Subthread user={user} />} />
          </Routes>
        </Router>
        {/* <Card.Footer className='App-footer'>© 2022 Ranked </Card.Footer> */}
      </div>
    </>
  ) 
}

export default App 
