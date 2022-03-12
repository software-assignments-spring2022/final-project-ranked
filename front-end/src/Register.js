import logo from './logo.svg';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Register.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

const Register = props => {
    return (
        <>
            <header className='Register-header'>header section</header>
            <main className='Register'>
                <div className='Register-tabDiv'>
                    <div className='Register-loginTab'>
                        <Link to='/login'>Login</Link>
                    </div>
                    <div className='Register-registerTab'>Register</div>
                </div>
                <div className='Register-registerDiv'>
                    <Form className='Register-form'>
                        <div className='Register-usernameForm'>
                            <Form.Label>Username</Form.Label>
                            <Form.Control placeholder="Enter username" />
                        </div>
                        <div className='Register-emailForm'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter username" />
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
                        </div>
                        <div className='Register-passwordForm'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </div>
                        <Button className='Register-submitBtn' href="/account" 
                        onClick={props.handleRegisterClick}>Register</Button>
                    </Form>
                </div>
            </main>
            <Card.Footer className='Register-footer'>© 2022 Ranked</Card.Footer>
        </>
    )
}

export default Register;