// home
import { Link } from "react-router-dom"
// import "./Home.css"
import "./App.css"

// import Header from "./Header"
// import logo from './Components/ranked_arrow.png';


const Home = () => {

  // an array of post data... imagine this is fetched from a back-end server API
  // we hard-code it here so we can focus on React.js, not back-end code
  // const posts = [
  //   {
  //       name: "Spot",
  //       content: "Schnauzer",
  //   },
  //   {
  //       name: "Spot",
  //       content: "Schnauzer",
  //   },
  //   {
  //       name: "Spot",
  //       content: "Schnauzer",
  //   },
  //   {
  //       name: "Spot",
  //       content: "Schnauzer",
  //   },
  // ]

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
