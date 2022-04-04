import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css' 
import './ThreadRequest.css' 
import Form from 'react-bootstrap/Form' 
import Button from 'react-bootstrap/Button' 
import axios from 'axios'

const ThreadRequest = props => {
    const [gameName, setGameName] = useState("")
    const [reason, setReason] = useState("")
    const [question1, setQuestion1] = useState("")
    const [question2, setQuestion2] = useState("")

    const HandleThreadRequest = (e) => {
        e.preventDefault()
        
        axios
            .post("http://localhost:4000/threadrequest", {
                gameName: gameName,
                willModerate: question1,
                friendsWillModerate: question2,
                reason: reason
            })
            .then(res => {
                if(res.data.missing){
                    alert(res.data.missing)
                }
                else{
                    alert(res.data.success)
                }
            })
            .catch(err => {
                alert("There seems to be a problem with the server. Please try again later!")
                console.log(err)
            })
    }

    return (
    <>
        <main className='ThreadRequest'>
            <div className='ThreadRequest-div'>
                <p><b>Requesting a New Game Thread</b></p>
                <Form onSubmit={HandleThreadRequest}>
                    <div className='ThreadRequest-gameNameTextArea'>
                        <Form.Group>
                            <Form.Label>Game Name: </Form.Label>
                            <Form.Control as='textarea' rows={1} value={gameName} 
                                onChange={e => setGameName(e.target.value)} />
                        </Form.Group>
                    </div>
                    <div className='ThreadRequest-questionDiv'>
                        <p className='ThreadRequest-questonP'>1. Do you want to be the moderator of this game thread?</p>
                        <div className='ThreadRequest-questonBtns'>
                            <Form.Check
                                label='Yes'
                                name='question1'
                                type={'radio'}
                                onClick={e => setQuestion1(1)}
                            />
                            <Form.Check
                                label='No'
                                name='question1'
                                type={'radio'}
                                onClick={e => setQuestion1(0)}
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
                    <div className='ThreadRequest-textArea'>
                        <Form.Group>
                            <Form.Label>Reason for the request:</Form.Label>
                            <Form.Control as='textarea' rows={9} value={reason} 
                                onChange={e => setReason(e.target.value)} />
                        </Form.Group>
                        <Button type="submit" >Submit</Button>
                    </div>
                </Form>
            </div>
        </main>
    </>
    ) 
} 

export default ThreadRequest