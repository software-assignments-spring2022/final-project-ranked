// App.js
// import header features
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Terms from "./TermsConditions"
import FAQ from "./FAQ"
import Home from "./Home"
import About from "./AboutUs"
import Header from "./Header"
import Login from "./Login"
import Register from "./Register"
import Account from "./Account"
import ThreadRequest from "./ThreadRequest"
import Card from 'react-bootstrap/Card'

// styling
import './App.css';

// const App = props => {
//   const [user, setUser] = useState({})
//   return (
//     <div className="App">
//       <Router>
//         <PrimaryNav user={user} setuser={setUser} />
//         <Routes>
//           <Route 
//             path="/" 
//             element={<Home user={user}/>} 
//           />
//           <Route
//             path="/megathread/:gameId"
//             element={<Megathread user={user} />}
//           />

//           <Route
//             path="/megathread/:gameId/subthread/:postId"
//             element={<Subthread user={user} />}
//           />
//           <Route
//           path="/login"
//           element={<Login user={user} setuser={setUser} />}
//           />
//           <Route
//             path="/logout"
//             element={<Logout user={user} setuser={setUser} />}
//           />
//           <Route
//             path="/register"
//             element={<Register user={user} setuser={setUser} />}
//           />
//           <Route
//             path="/account"
//             element={<Account user={user} setuser={setUser} />}
//           />
//         </Routes>
//       </Router>
//     </div>
//   )
// }
const App = () => {
  const handleResetPwClick = () => {
    alert('an reset password email has been sent to you!');
  };

  const handleDelAccClick = () => {
    alert('hope to see you again soon!');
  };

  const handleRequestClick = () => {
    alert('Request submitted! We will get back to you ASAP.');
  };

  const handleLoginClick = () => {
    alert('Welcome back, Jason!');
  };

  const handleRegisterClick = () => {
    alert('Welcome, M2JT!');
  };

  return (
    <>
      <div className="App">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} ></Route>
            <Route path="/login" element={<Login handleLoginClick={handleLoginClick} />} ></Route>
            <Route path="/register" element={<Register handleRegisterClick={handleRegisterClick} />}></Route>
            <Route path="/about" element={<About mockImg={'https://picsum.photos/200/300'} />} ></Route>
            <Route path="/terms" element={<Terms mockImg={'https://picsum.photos/200/300'} />} ></Route>
            <Route path="/faq" element={<FAQ />} ></Route>
            <Route path="/threadrequest" element={
              <ThreadRequest handleRequestClick={handleRequestClick} />} >
            </Route>
            <Route path="/account" element={
              <Account
                mockImgSource={'https://picsum.photos/200/300'}
                username={'jason'}
                email={'random@something.com'}
                country={'United States'}
                // username={jsonData[0]['username']} 
                // email={jsonData[0]['email']} 
                // country={jsonData[0]['country']}
                handleResetPwClick={handleResetPwClick}
                handleDelAccClick={handleDelAccClick}
              />}>
            </Route>
          </Routes>
        </Router>
        {/* <Card.Footer className='App-footer'>© 2022 Ranked </Card.Footer> */}
      </div>
    </>
  );
}

export default App;
