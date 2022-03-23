import { Link } from "react-router-dom"
import "./App.css"
// import "./Home.css"

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