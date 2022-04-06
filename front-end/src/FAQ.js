import { Link } from 'react-router-dom';
import './FAQ.css';

const FAQ = props => {
    return (
        <>
            <main className='FAQ'>
                <h3>Frequently Asked Questions</h3>
                <div className='FAQ-question1Div'>
                    <em>Q: How do I create a new game thread?</em>
                    <p>A: You can submit your request to the Ranked administrators by filling out the request 
                    form on the <Link to='/threadrequest'>Request a Thread</Link> page in order to create a 
                    new game thread for the game that you and your friends are interested in.</p>
                </div>
                <div className='FAQ-questionXDiv'>
                    <em>Q: How do I create an account?</em>
                    <p>A: To register an Ranked account, you can click the hamburger menu in the top right 
                    corner and click <b>Register</b>.</p>
                </div>
                <div className='FAQ-questionXDiv'>
                    <em>Q: How do I change my account password?</em>
                    <p>A: To change your Ranked account password, you can simply click the <b>Reset Password</b> button 
                    in your <Link to='/account'>Account</Link> page.</p>
                </div>
                <div className='FAQ-questionXDiv'>
                    <em>Q: How do I delete my account?</em>
                    <p>A: To deactivate your Ranked account, you can click the <b>Deactivate Account</b> button 
                    in your <Link to='/account'>Account</Link> page.</p>
                </div>
            </main>
        </>
    )
};

export default FAQ