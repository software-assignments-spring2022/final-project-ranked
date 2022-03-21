<<<<<<< HEAD
import logo from "./logo.svg"
import "./App.css"
=======
// app.js
// import header features
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./Home"
// import About from "./About"
import Header from "./Header"

// styling
// import logo from './Components/ranked_arrow.png';
import './App.css';
>>>>>>> 51ba3adafe4a91e4cc268da7383c708ff84372a6

function App() {
  return (
    <><div className="App">
      <header className="App-header">
        <Header />
      </header>
    </div>
<<<<<<< HEAD
  )
}

export default App
=======
    <body>
      <p>just a paragraph to test</p>
    </body>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router></>
  );
}

export default App;
>>>>>>> 51ba3adafe4a91e4cc268da7383c708ff84372a6
