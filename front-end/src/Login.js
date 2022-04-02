import { useState } from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Login.css'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axios from "axios"

const Login = props => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const HandleLoginClick = (e) => {
        e.preventDefault()

        axios
            .post("http://localhost:4000/login", {
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
                else{
                    window.location.href = "/account"
                }
            })
            .catch(err => {
              console.log(err)
            })
        setUsername('')
        setPassword('')
    } 

    return (
        <>
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
                            <Form.Label>Username / Email</Form.Label>
                            <Form.Control 
                                placeholder="Enter username / email" 
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
        </>
    )
}

export default Login 
