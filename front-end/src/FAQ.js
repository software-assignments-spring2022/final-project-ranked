import { Link } from "react-router-dom"
import "./css/FAQ.css"

const FAQ = () => {
  return (
    <>
      <main className="FAQ">
        <h3>Frequently Asked Questions</h3>
        <div className="FAQ-question1Div">
          <b>
            <em>Q: How do I create a new game thread?</em>
          </b>
          <p>
            A: You can submit your request to the Ranked administrators by
            filling out the form on the{" "}
            <Link to="/threadrequest">Request Thread</Link> page in order to
            create a new game thread for the game that you and your friends are
            interested in.
          </p>
        </div>
        <div className="FAQ-questionXDiv">
          <b>
            <em>
              Q: How do I check the status of my submitted thread requests?
            </em>
          </b>
          <p>
            A: Once your request has been submitted, you can check the approval
            status of your request by clicking the{" "}
            <button className="FAQ-button1">Check Requests Status</button>{" "}
            button in your <Link to="/account">Account</Link> page.
          </p>
        </div>
        <div className="FAQ-questionXDiv">
          <b>
            <em>Q: How do I create a new Ranked account?</em>
          </b>
          <p>
            A: To register a Ranked account, you can click the hamburger menu in
            the top right corner and click{" "}
            <Link to="/register">Login/Register</Link>.
          </p>
        </div>
        <div className="FAQ-questionXDiv">
          <b>
            <em>Q: How do I change my profile picture?</em>
          </b>
          <p>
            A: To change your default Ranked profile picture, you can click the{" "}
            <button className="FAQ-button2">Change Profile Picture</button>{" "}
            button in your <Link to="/account">Account</Link> page and upload an
            image.
          </p>
        </div>
      </main>
    </>
  )
}

export default FAQ