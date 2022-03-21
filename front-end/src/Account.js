import logo from "./logo.svg"
import "./Account.css"

const Account = (props) => {
  return (
    <main className="Account">
      <header className="Account-header">header section</header>
      <img
        className="Account-image"
        src={props.mockImgSource}
        alt="user profile image"
      ></img>
      <div className="Account-tabDiv">
        <div className="Account-infoTab">Overview</div>
        <div className="Account-adminTab">Admin</div>
      </div>
      <div className="Account-infoDiv">
        <div className="Account-details">
          <p>
            {" "}
            <b>Username:</b> {props.username}
          </p>
        </div>
        <div className="Account-details">
          <p>
            {" "}
            <b>Email address:</b> {props.email}
          </p>
        </div>
        <div className="Account-details">
          <p>
            {" "}
            <b>Country:</b> {props.country}
          </p>
        </div>
        <button
          className="Account-resetPwBtn"
          onClick={props.handleResetPwClick}
        >
          Reset Password
        </button>
        <button className="Account-delAccBtn" onClick={props.handleDelAccClick}>
          Deactivate Account
        </button>
      </div>
    </main>
  )
}

export default Account
