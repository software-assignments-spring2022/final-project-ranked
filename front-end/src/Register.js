import { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import './Register.css'
import axios from 'axios'

const Register = () => {
    const jwtToken = localStorage.getItem('token')
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    // check to see whether user is logged in when Register page first loads
    // if yes, redirect user to the Account page
    // if not, show the register form
    useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/isLoggedIn`, {
            headers: { Authorization: `JWT ${jwtToken}` }
        })
        .then(res => {
            if(res.data.success){
                setIsLoggedIn(true)
            }
        })
    }, [])

    // handle user register request
    const HandleRegisterClick = e => {
        e.preventDefault()

        axios
            .post(`${process.env.REACT_APP_SERVER_HOSTNAME}/register`, {
                username: username,
                password: password,
                email: email
            })
            .then(res => {
                if(res.data.missing){
                    alert(res.data.missing)
                }
                else if(res.data.invalidNameFormat){
                    alert(res.data.invalidNameFormat)
                }
                else if(res.data.duplicated){
                    alert(res.data.duplicated)
                }
                // register success, save the jwt to local storage
                // redirect user to the Account page
                else if(res.data.success){
                    localStorage.setItem('token', res.data.token)
                    window.location.href = '/account'
                    alert(res.data.success)
                    console.log(res.data)
                }
            })
            .catch(err => {
                alert('There seems to be a problem with the server, please try again later!')
                console.log(err)
            })
    } 

    return (
        <>
            {isLoggedIn ? ( <Navigate to='/account' /> ) : (
                <main className='Register'>
                    <div className='Register-tabDiv'>
                        <div className='Register-loginTab'>
                            <Link to='/login'><p>Login</p></Link>
                        </div>
                        <div className='Register-registerTab'>Register</div>
                    </div>
                    <div className='Register-registerDiv'>
                        <Form className='Register-form' onSubmit={HandleRegisterClick}>
                            <div className='Register-usernameForm'>
                                <Form.Label>Username</Form.Label>
                                <Form.Control 
                                    placeholder="Enter username" 
                                    value={username} 
                                    onChange={e => setUsername(e.target.value)}
                                />
                            </div>
                            <div className='Register-emailForm'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    placeholder="Enter email" 
                                    value={email} 
                                    onChange={e => setEmail(e.target.value)}
                                />
                                <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                                </Form.Text>
                            </div>
                            <div className='Register-passwordForm'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    placeholder="Enter password"
                                    value={password} 
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            <Button className='Register-submitBtn' type='submit'>Register</Button>
                        </Form>
                    </div>
                </main>
            )}
        </>
    )
}

export default Register