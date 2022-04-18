import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Popover from 'react-bootstrap/Popover' 
import OverlayTrigger from 'react-bootstrap/OverlayTrigger' 
import axios from 'axios'
import './css/Account.css'
import Form from "react-bootstrap/Form"
import FileBase64 from 'react-file-base64'
import Button from "react-bootstrap/Button"

const Account = () => {
    const jwtToken = localStorage.getItem('token')
    console.log(`JWT token from Account page: ${jwtToken}`)
    const [accountInfo, setAccountInfo] = useState({})
    const [threadRequestList, setThreadRequestList] = useState([])
    const [photo, setPhoto] = useState([])

    const handleDelAccClick = () => {
        alert('Hope to see you again soon!') 
    }

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      };

      const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setPhoto(base64);
      }

      const handleSubmit = (e) => {
        e.preventDefault() // prevent the default browser form submission stuff
          // send the data of new post to a server
          axios
          .post(`${process.env.REACT_APP_SERVER_HOSTNAME}/profile`, {
              username:accountInfo.username,
              photo: photo
            })
        .then(res => {
            if(res.data.missing){
                alert(res.data.missing)
            }
            else{
                alert(res.data.success)
                setPhoto("")
            }
        })
        .catch(err => {
            alert("There seems to be a problem with the server. Please try again later!")
            console.log(err)
        })
      }

    useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/isLoggedIn`, {
            headers: { Authorization: `JWT ${jwtToken}` }
        })
        // set user's account info if logged-in
        .then(res => {
            if(res.data.success){
                setAccountInfo(res.data.user)

                // grab user's previously submitted thread requests
                axios
                .post(`${process.env.REACT_APP_SERVER_HOSTNAME}/account`, {
                    userID: res.data.user._id
                })
                .then(res => {
                    if(res.data.threadRequestList){
                        setThreadRequestList(res.data.threadRequestList)
                    }
                })
            }
        })
        .catch(err => {
            if(err){
                window.location.href = '/login'
                alert('Account page is only accessible for authenticated user. Please login or register first!')
            }
        })
    }, [])

    // overlay component
    const showPreviousRequests = (
        <Popover>
            <Popover.Header>Message from Ranked:</Popover.Header>
            {(threadRequestList.length === 0) ? (
                <Popover.Body>
                    You have no submitted thread requests at this time!
                </Popover.Body>
            ) : (
                threadRequestList.map(each => (
                    <Popover.Body key={each._id}>
                        Requested Game Megathread: {each.gameName}
                        <br></br>
                        Submitted on: {each.dateRequested}
                        <br></br>
                        Approval Status: <b>{each.approvalStatus}</b>
                    </Popover.Body>
                ))
            )}
        </Popover>
    )

    return (
        <main className='Account'>
            <img className='Account-image' src={accountInfo.photo} alt='user profile image'></img>
            <div className='Account-tabDiv'>
                <div className='Account-infoTab'>Overview</div>
                <div>
                    <Link className='Account-adminTab' to='/admin'><p>Admin</p></Link>
                </div>
            </div>
            <div className='Account-infoDiv'>
                <div className='Account-details'>
                    <p> <b>Username:</b> {accountInfo.username}</p>
                </div>
                <div className='Account-details'>
                    <p> <b>Email address:</b> {accountInfo.email}</p>
                </div>
                <div className='Account-details'>
                    <p> <b>Joined on:</b> {accountInfo.joinDate}</p>
                </div>
                <OverlayTrigger trigger='click' placement='top' overlay={showPreviousRequests}>
                    <button className='Account-resetPwBtn'>Check Requests Status</button>
                </OverlayTrigger>
                <button className='Account-delAccBtn' onClick={handleDelAccClick}>Deactivate Account</button>
                <Form onSubmit={handleSubmit} encType='multipart/formdata'>
                <Form.Group controlId="formFile" className="mb-3">
                <Form.Control 
                type="file" 
                accept=".png, .jpg, .jpeg"
                name="photo"
                 onChange={e => handleFileUpload(e)}
                />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                </Form>
            </div>
        </main>
    )
}

export default Account