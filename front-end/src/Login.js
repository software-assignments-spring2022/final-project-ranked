import { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/Login.css'
import axios from 'axios'

const Login = () => {
    // grab token from browser's local storage, if any
    const jwtToken = localStorage.getItem('token')
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    // whenever the Login page first loads, check to see if user is already logged in
    // if yes, redirect user to the Account page
    // if not, show the login form
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

    // handle user login request
    const HandleLoginClick = (e) => {
        e.preventDefault()

        axios
            .post(`${process.env.REACT_APP_SERVER_HOSTNAME}/login`, {
              username: username,
              password: password
            })
            .then(res => {
                if(res.data.missing){
                    alert(res.data.missing)
                }
                else if(res.data.notFound){
                    alert(res.data.notFound)
                }
                else if(res.data.incorrect){
                    alert(res.data.incorrect)
                }
                // login success, save the jwt to local storage
                // redirect user to the Account page
                else if(res.data.success){
                    localStorage.setItem('token', res.data.token)
                    window.location.href = '/account'
                    alert(res.data.success)
                    console.log(res.data)
                }
            })
            .catch(err => {
                console.log(err)
                alert('There seems to be a problem with the server, please try again later!')
            })
        setUsername('')
        setPassword('')
    } 

    return (
        <>
            {isLoggedIn ? ( <Navigate to='/account' /> ) : (
                <main className='Login'>
                    <div className='Login-tabDiv'>
                        <div className='Login-loginTab'>Login</div>
                        <div>
                            <Link className='Login-registerTab' to='/register'><p>Register</p></Link>
                        </div>
                    </div>
                    <div className='Login-loginDiv'>
                        <Form className='Login-form' onSubmit={HandleLoginClick}>
                            <div className='Login-usernameEmailForm'>
                                <Form.Label>Username</Form.Label>
                                <Form.Control 
                                    placeholder="Enter username" 
                                    value={username} 
                                    onChange={e => setUsername(e.target.value)}
                                />
                            </div>
                            <div className='Login-passwordForm'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    placeholder="Password"
                                    value={password} 
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            <Button type='submit' className='Login-submitBtn' >Login</Button>
                        </Form>
                    </div>
                </main>
            )}
        </>
    )
}

export default Login