import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './css/Account.css'

const Account = () => {
    const jwtToken = localStorage.getItem('token')
    console.log(`JWT token from Account page: ${jwtToken}`)

    const [accountInfo, setAccountInfo] = useState({})
    const handleResetPwClick = () => {
        alert('An reset password email has been sent to you!') 
    } 
    const handleDelAccClick = () => {
        alert('Hope to see you again soon!') 
    }

    useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/isLoggedIn`, {
            headers: { Authorization: `JWT ${jwtToken}` }
        })
        // set user's account info if logged-in
        .then(res => {
            if(res.data.success){
                console.log(res.data.user)
                setAccountInfo(res.data.user)
            }
        })
        .catch(err => {
            if(err){
                window.location.href = '/login'
                alert('Account page is only accessible for authenticated user. Please login or register first!')
            }
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
                    <p> <b>Joined on:</b> {accountInfo.joinDate}</p>
                </div>
                <button className='Account-resetPwBtn' onClick={handleResetPwClick}>Reset Password</button>
                <button className='Account-delAccBtn' onClick={handleDelAccClick}>Deactivate Account</button>
            </div>
        </main>
    )
}

export default Account