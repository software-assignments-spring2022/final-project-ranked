import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css' 
import './css/ThreadRequest.css' 
import Form from 'react-bootstrap/Form' 
import Button from 'react-bootstrap/Button' 
import axios from 'axios'

const ThreadRequest = () => {
    const jwtToken = localStorage.getItem('token')
    const [gameName, setGameName] = useState("")
    const [reason, setReason] = useState("")
    const [question1, setQuestion1] = useState("")
    const [question2, setQuestion2] = useState("")

    const handleClick = e => {
        console.log(e.target.name);
        let ele = document.getElementsByName(e.target.name)
        ele[0].checked ? setQuestion1(1) : setQuestion1(0)
        console.log(question1)
    }

    const HandleThreadRequest = (e) => {
        e.preventDefault()

        // only logged-in user can submit a thread request
        axios
            .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/isLoggedIn`, {
                headers: { Authorization: `JWT ${jwtToken}` }
            })
            // grab userID and username if logged-in, since admin
            // needs to have access to this info
            .then(res => {
                if(res.data.success){
                    // let back-end handles the thread request
                    axios
                        .post(`${process.env.REACT_APP_SERVER_HOSTNAME}/threadrequest`, {
                            gameName: gameName,
                            willModerate: question1,
                            friendsWillModerate: question2,
                            reason: reason,
                            username: res.data.user.username,
                            userID: res.data.user._id
                        })
                        .then(res => {
                            if(res.data.missing){
                                alert(res.data.missing)
                            }
                            else{
                                // window.location.href = '/'
                                for(let i of document.getElementsByName("question1")){
                                    i.checked = false
                                }
                                for(let i of document.getElementsByName("question2")){
                                    i.checked = false
                                }
                                setGameName("")
                                setReason("")
                                alert(res.data.success)
                            }
                        })
                        .catch(err => {
                            alert("There seems to be a problem with the server. Please try again later!")
                            console.log(err)
                        })
                }
            })
            .catch(err => {
                if(err){
                    window.location.href = '/login'
                    alert('Please login or register first before trying to submit a thread request!')
                }
            })
    }

    return (
    <>
        <main className='ThreadRequest'>
            <div className='ThreadRequest-div'>
                <p><b>Requesting a New Game Thread</b></p>
                <Form onSubmit={HandleThreadRequest}>
                    <div className='ThreadRequest-gameNameTextAreaDiv'>
                        <Form.Group>
                            <Form.Label>Game Name: </Form.Label>
                            <Form.Control className='ThreadRequest-gameNameTextArea' 
                                as='textarea' rows={1} value={gameName} 
                                onChange={e => setGameName(e.target.value)} />
                        </Form.Group>
                    </div>
                    <div className='ThreadRequest-questionDiv'>
                        <p className='ThreadRequest-questonP'>1. Do you want to be the moderator of this game thread?</p>
                        <div className='ThreadRequest-questonBtns'>
                            <Form.Check
                                label='Yes'
                                name="question1"
                                type={'radio'}
                                onClick={e => handleClick(e)}
                            />
                            <Form.Check
                                label='No'
                                name="question1"
                                type={'radio'}
                                onClick={e => handleClick(e)}
                            />
                        </div>
                    </div>
                    <div className='ThreadRequest-questionDiv'>
                        <p className='ThreadRequest-questonP'>
                            2. Do you have other friends who also want to moderate this thread?
                        </p>
                        <div className='ThreadRequest-questonBtns'>
                            <Form.Check
                                label='Yes'
                                name='question2'
                                type={'radio'}
                                onClick={e => setQuestion2(1)}
                            />
                            <Form.Check
                                label='No'
                                name='question2'
                                type={'radio'}
                                onClick={e => setQuestion2(0)}
                            />
                        </div>
                    </div>
                    <div className='ThreadRequest-textAreaDiv'>
                        <Form.Group>
                            <Form.Label>Reason for the request:</Form.Label>
                            <Form.Control className='ThreadRequest-textArea'
                                as='textarea' rows={9} value={reason} 
                                onChange={e => setReason(e.target.value)} />
                        </Form.Group>
                        <Button type='submit'>Submit</Button>
                    </div>
                </Form>
            </div>
        </main>
    </>
    ) 
} 

export default ThreadRequest