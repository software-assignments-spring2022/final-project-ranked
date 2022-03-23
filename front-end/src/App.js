import React, { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./Home"
import PrimaryNav from "./PrimaryNav"
import Header from "./Header"
import Megathread from "./Megathread"
import Subthread from "./Subthread"
import Login from "./Login"
import Logout from "./Logout"
import Register from "./Register"
import Account from "./Account"

// styling
// import logo from './Components/ranked_arrow.png';
import './App.css';

const App = props => {
  const [user, setUser] = useState({})
  return (
    <div className="App">
      <Router>
        <PrimaryNav user={user} setuser={setUser} />
        <Routes>
          <Route 
            path="/" 
            element={<Home user={user}/>} 
          />
          <Route
            path="/megathread/:gameId"
            element={<Megathread user={user} />}
          />

          <Route
            path="/megathread/:gameId/subthread/:postId"
            element={<Subthread user={user} />}
          />
          <Route
          path="/login"
          element={<Login user={user} setuser={setUser} />}
          />
          <Route
            path="/logout"
            element={<Logout user={user} setuser={setUser} />}
          />
          <Route
            path="/register"
            element={<Register user={user} setuser={setUser} />}
          />
          <Route
            path="/account"
            element={<Account user={user} setuser={setUser} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
