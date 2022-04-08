import { useState, useEffect } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Admin.css'

const Admin = () => {
    const [threadRequestList, setThreadRequestList] = useState([])
    const [approvalStatus, setApprovalStatus] = useState("")
    const [gameName, setGameName] = useState("")

    // fetch thread requests data from the back-end and load it onto the front-end
    useEffect(() => {
        axios
        .get("http://localhost:4000/admin")
        .then(res => {
            console.log(res.data.threadRequestList)
            setThreadRequestList(res.data.threadRequestList)
        })
        .catch(err => {
            console.log(err)
            alert("There seems to be a problem with the server, please try again later!")
        })  
    }, [])

    // let back-end to process a thread request's approval status
    const HandleRequest = (e) => {
        e.preventDefault()

        axios
            .post("http://localhost:4000/admin", {
                approvalStatus: approvalStatus,
                gameName: gameName
            })
            .then(res => {
                if(res.data.missing){
                    alert(res.data.missing)
                }
                else if(res.data.alreadyProcessed){
                    alert(res.data.alreadyProcessed)
                }
                else if(res.data.success){
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
                Check a game to mark it as accepted.
            </div>

            {threadRequestList.map(eachRequest => (
                <div className='Admin-eachThreadRequest' key={eachRequest.gameName}>
                    Game Name: {eachRequest.gameName}
                    <br></br>
                    Will Moderate: <b>{eachRequest.willModerate ? 'Yes' : 'No'}</b>
                    <br></br>
                    Friends to Moderate: <b>{eachRequest.friendsWillModerate ? 'Yes' : 'No'}</b>
                    <br></br>
                    Reason for Request: "{eachRequest.reason}"
                    <br></br>
                    Approval Status: {eachRequest.approvalStatus}
                    <div className='Admin-eachRequestFormDiv'>
                        <Form onSubmit={HandleRequest}>
                            <Form.Check
                                label='Approve'
                                name='processRequestForm'
                                type={'radio'}
                                onClick={e => {
                                    setApprovalStatus(1)
                                    setGameName(eachRequest.gameName)
                                }}
                            />
                            <Form.Check
                                label='Reject'
                                name='processRequestForm'
                                type={'radio'}
                                onClick={e => {
                                    setApprovalStatus(0)
                                    setGameName(eachRequest.gameName)
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