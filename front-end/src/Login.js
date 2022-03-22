import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = props => {
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
                    <Form className='Login-form'>
                        <div className='Login-usernameEmailForm'>
                            <Form.Label>Username / Email</Form.Label>
                            <Form.Control placeholder="Enter username / email" />
                        </div>
                        <div className='Login-passwordForm'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </div>
                        <Button className='Login-submitBtn' href="/account" 
                        onClick={props.handleLoginClick}>Login</Button>
                    </Form>
                </div>
            </main>
        </>
    )
}

export default Login;