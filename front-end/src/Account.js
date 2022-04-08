import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Account.css'

const Account = () => {
    const [accountInfo, setAccountInfo] = useState({})
    const handleResetPwClick = () => {
        alert('An reset password email has been sent to you!') 
    } 
    const handleDelAccClick = () => {
        alert('Hope to see you again soon!') 
    }

    useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/account`)
        .then(res => setAccountInfo(res.data.user))
        .catch(err => {
            console.log('There seems to be a problem with the server, please try again later!')
            console.log(err)
        })  
    }, [])

    return (
        <main className='Account'>
            <img className='Account-image' src={'https://picsum.photos/200/300'} alt='user profile image'></img>
            <div className='Account-tabDiv'>
                <div className='Account-infoTab'>Overview</div>
                <div>
                    <Link className='Account-adminTab' to='/admin'><p>Admin</p></Link>
                </div>
            </div>
            <div className='Account-infoDiv'>
                <div className='Account-details'>
                    <p> <b>Username:</b> {accountInfo.username}</p>
                </div>
                <div className='Account-details'>
                    <p> <b>Email address:</b> {accountInfo.email}</p>
                </div>
                <div className='Account-details'>
                    <p> <b>Country:</b> {accountInfo.country}</p>
                </div>
                <button className='Account-resetPwBtn' onClick={handleResetPwClick}>Reset Password</button>
                <button className='Account-delAccBtn' onClick={handleDelAccClick}>Deactivate Account</button>
            </div>
        </main>
    )
}

export default Account