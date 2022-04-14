import { useState, useEffect } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/Admin.css'

const Admin = () => {
    const jwtToken = localStorage.getItem('token')
    console.log(`JWT token from Admin page: ${jwtToken}`)
    const [threadRequestList, setThreadRequestList] = useState([])
    const [approvalStatus, setApprovalStatus] = useState("")
    const [requestID, setRequestID] = useState("")

    // check if currently logged-in user is admin or not
    // if yes, show data in the admin panel
    // otherwise, send a error msg and redirect user to the homepage
    useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/isLoggedIn`, {
            headers: { Authorization: `JWT ${jwtToken}` }
        })
        .then(res => {
            if(res.data.success){
                if(res.data.user.username === `${process.env.REACT_APP_ADMIN}`){
                    // fetch thread requests data from the DB and load it onto the front-end
                    axios
                    .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/admin`)
                    .then(res => {
                        setThreadRequestList(res.data.threadRequestList)
                    })
                    .catch(err => {
                        console.log(err)
                        alert("There seems to be a problem with the server, please try again later!")
                    })  
                }
                else{
                    window.location.href = '/'
                    alert("Access denied! You don't have permission to view this page.")
                }
            }
        })
        .catch(err => {
            if(err){
                window.location.href = '/'
                alert("Access denied! You don't have permission to view this page.")
            }
        })
    }, [])

    // process thread request's approval status in the back-end
    const HandleRequest = (e) => {
        e.preventDefault()

        axios
        .post(`${process.env.REACT_APP_SERVER_HOSTNAME}/admin`, {
            approvalStatus: approvalStatus,
            requestID: requestID
        })
        .then(res => {
            if(res.data.missing){
                alert(res.data.missing)
            }
            else if(res.data.alreadyProcessed){
                window.location.href = '/admin'
                alert(res.data.alreadyProcessed)
            }
            else if(res.data.success){
                window.location.href = '/admin'
                alert(res.data.success)
            }
        })
        .catch(err => {
            alert("There seems to be a problem with the server. Please try again later!")
            console.log(err)
        })
    }

    return (
        <main className='Admin'>
            <div className='Admin-reminderDiv'>
                <p><b>Admin Panel</b></p>
                Submitted Thread Requests
                <br></br>
                -----------------------------
            </div>

            {threadRequestList.map(eachRequest => (
                <div className='Admin-eachThreadRequest' key={eachRequest._id}>
                    Game Name: {eachRequest.gameName}
                    <br></br>
                    Will Moderate: {eachRequest.willModerate ? '✅' : '❌'}
                    <br></br>
                    Friends to Moderate: {eachRequest.friendsWillModerate ? '✅' : '❌'}
                    <br></br>
                    Reason: "{eachRequest.reason}"
                    <br></br>
                    At: {eachRequest.dateRequested}
                    <br></br>
                    By: {eachRequest.requestedUsername}
                    <br></br>
                    Approval Status: <i><b>{eachRequest.approvalStatus}</b></i>
                    <div className='Admin-eachRequestFormDiv'>
                        <Form onSubmit={HandleRequest}>
                            <Form.Check
                                label='Approve'
                                name='processRequestForm'
                                type={'radio'}
                                onClick={e => {
                                    setApprovalStatus(1)
                                    setRequestID(eachRequest._id)
                                }}
                            />
                            <Form.Check
                                label='Reject'
                                name='processRequestForm'
                                type={'radio'}
                                onClick={e => {
                                    setApprovalStatus(0)
                                    setRequestID(eachRequest._id)
                                }}
                            />
                            <Button type='submit' className='Admin-eachRequestFormBtn'>Submit</Button>
                        </Form>
                    </div>
                </div>
            ))}
        </main>
    )
}

export default Admin