import React, { useState } from "react"
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
import NewPost from "./Newpost"
import Megathread from "./Megathread"
import Subthread from "./Subthread"
import Logout from "./Logout"
import Admin from "./Admin"
import "./css/App.css"
const App = () => {
  const [user, setUser] = useState({})

  return (
    <>
      <div className="App">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/terms" element={<Terms />}></Route>
            <Route path="/faq" element={<FAQ />}></Route>
            <Route path="/admin" element={<Admin />}></Route>
            <Route path="/threadrequest" element={<ThreadRequest />}></Route>
            <Route path="/account" element={<Account />}></Route>
            <Route path="/logout" element={<Logout />} />
            <Route path="/megathread/new" element={<NewPost user={user} />} />
            <Route
              path="/megathread/:gameId"
              element={<Megathread user={user} />}
            />
            <Route
              path="/megathread/:gameId/subthread/:postId"
              element={<Subthread user={user} />}
            />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App