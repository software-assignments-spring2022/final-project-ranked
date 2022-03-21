// app.js
// import header features
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./Home"
// import About from "./About"
import Header from "./Header"

// styling
// import logo from './Components/ranked_arrow.png';
import './App.css';

function App() {
  return (
    <><div className="App">
      
    
    {/* <body>
      <p>just a paragraph to test</p>
    </body> */}
    <Router>
      <header className="App-header">
        <Header />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </Router>
    </div></>
  );
}

export default App;