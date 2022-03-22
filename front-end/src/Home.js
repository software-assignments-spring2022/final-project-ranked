// home
import { Link } from "react-router-dom"
//import "./Home.css"

// import Header from "./Header"
// import logo from './Components/ranked_arrow.png';


const Home = () => {
  return (
    <main className="Home">
      <h1>Home page of the app</h1>
      <p>
        Link to <Link to="/about">About</Link> page.
      </p>
    </main>
  )
}

export default Home
