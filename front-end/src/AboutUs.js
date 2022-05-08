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
      <div className="aboutUs-wrapperDiv">
        <div className="aboutUsTitle">
          <img src={topImg} alt="first image" />
          <div className="centered">
            <h1 className="centered-title">About Us</h1>
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
                We want to improve the gaming space.

                In terms of friendliness and companionship, this is exactly where the entire 
                industry should shine, however there are pockets rife with discontent and severe 
                rudeness. 

                For years, experiencing toxicity mid-game has been inevitable. Solving it through a
                report, a ban, or an account suspension is only putting a bandaid on a wound that needs 
                stitches. Our platform was designed for a single task: stop letting toxicity be inevitable.

                For us, the issue wasn't that players are inherently rude and frustrated, it's that the 
                community is too accepting of this behavior. Our platform is one that tries to improve the 
                gaming space through demolishing the established acceptance of toxic behavior in-game and 
                in-communities. By constructing our platform from scratch, we're building a community free 
                of toxicity that sets an example for the rest of the space.
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
                For speedy and effective development, we roll out our updates as soon as 
                they are tested and start garnering feedback from you guys, our users. 
                After we get an idea of how you feel about it, we immediately go back to 
                the drawing board and readjust. These are the values we started building our 
                platform with, these are the values we will continue building our platform 
                with, and these are the values we will defend.

                For appropriate commenting and content, we believe it's simple. If you don't 
                have something constructive or funny to comment/post, don't say anything at all. 
                That's it. If our moderators find your comments/posts to be out of line with 
                either of those rules, it will get taken down.

                For our team standards (apart from how develop our platform), we respect each 
                others' opinions and we value each others' opinions. If anyone disrespects one 
                another for no reason, they are penalized. 
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
                Our Mission and Goals are aligned, but not the same. 

                The one task we need to accomplish is in creating a space where casual, consistent, 
                and competitive gamers alike all look forward to browsing through. We want to give 
                our users the experience of learning, talking, and joking about their favorite games 
                in a single place: Ranked. 
              </p>
            </div>
          </div>
        </div>
        <div className="aboutFooter">
          <Link to="/terms">Terms & Conditions</Link>
          <br></br>
          <Link to="/faq">FAQ</Link>
        </div>
      </div>
    </main>
  )
}

export default AboutUs