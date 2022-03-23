import { Link } from 'react-router-dom';
import './Account.css';

const Account = props => {
    return (
        <main className='Account'>
            <img className='Account-image' src={props.mockImgSource} alt='user profile image'></img>
            <div className='Account-tabDiv'>
                <div className='Account-infoTab'>Overview</div>
                <div>
                    <Link className='Account-adminTab' to='/admin'><p>Admin</p></Link>
                </div>
            </div>
            <div className='Account-infoDiv'>
                <div className='Account-details'>
                    <p> <b>Username:</b> {props.username}</p>
                </div>
                <div className='Account-details'>
                    <p> <b>Email address:</b> {props.email}</p>
                </div>
                <div className='Account-details'>
                    <p> <b>Country:</b> {props.country}</p>
                </div>
                <button className='Account-resetPwBtn' onClick={props.handleResetPwClick}>Reset Password</button>
                <button className='Account-delAccBtn' onClick={props.handleDelAccClick}>Deactivate Account</button>
            </div>
        </main>
    )
}

export default Account