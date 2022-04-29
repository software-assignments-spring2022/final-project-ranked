import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./css/AboutUs.css"
import axios from "axios"

const AboutUs = () => {
  const [topImg, setTopImg] = useState([])
  const [firstImg, setFirstImg] = useState([])
  const [secondImg, setSecondImg] = useState([])
  const [thirdImg, setThirdImg] = useState([])

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/staticImg`)
      .then((res) => {
        if (res.data.allStaticImgs) {
          setTopImg(res.data.allStaticImgs.topImg)
          setFirstImg(res.data.allStaticImgs.firstImg)
          setSecondImg(res.data.allStaticImgs.secondImg)
          setThirdImg(res.data.allStaticImgs.thirdImg)
        }
      })
      .catch((err) => {
        console.log(err)
        alert(
          "There seems to be a problem with the server, please try again later!"
        )
      })
  })

  return (
    <main className="aboutUs">
      <div className="aboutUsTitle">
        <img src={topImg} alt="first image" />
        <div className="centered">
          <b>About Us</b>
        </div>
      </div>
      <div className="aboutContent">
        <div className="aboutPair">
          <div className="aboutImages">
            <img src={firstImg}></img>
          </div>
          <div className="aboutText">
            <p>
              <b>Our Mission</b>
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              aliquet nunc bibendum ante mollis iaculis. Cras bibendum laoreet
              elit, rutrum lacinia purus lacinia lacinia. Sed semper mi purus,
              non fringilla justo semper ac.
            </p>
          </div>
        </div>
        <div className="aboutPair">
          <div className="aboutImages">
            <img src={secondImg}></img>
          </div>
          <div className="aboutText">
            <p>
              <b>Our Values</b>
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              aliquet nunc bibendum ante mollis iaculis. Cras bibendum laoreet
              elit, rutrum lacinia purus lacinia lacinia. Sed semper mi purus,
              non fringilla justo semper ac.
            </p>
          </div>
        </div>
        <div className="aboutPair">
          <div className="aboutImages">
            <img src={thirdImg}></img>
          </div>
          <div className="aboutText">
            <p>
              <b>Our Goal</b>
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              aliquet nunc bibendum ante mollis iaculis. Cras bibendum laoreet
              elit, rutrum lacinia purus lacinia lacinia. Sed semper mi purus,
              non fringilla justo semper ac.
            </p>
          </div>
        </div>
      </div>
      <div className="aboutFooter">
        <Link to="/terms">Terms & Conditions</Link>
        <br></br>
        <Link to="/faq">FAQ</Link>
      </div>
    </main>
  )
}

export default AboutUs