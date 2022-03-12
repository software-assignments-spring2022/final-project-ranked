import React, { useState} from "react"
import logo from './logo.svg';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminPanel.css';
import ThreadRequest from "./ThreadRequest";
import threadrequests from "./mock-thread-request-section";



const AdminPanel = (reqList, props) => {
    const [requestIndex, setRequestIndex] = useState(0)

    return (
        <main className='AdminPanel'>
            <header className='AdminPanel-header'>
                header section here
            </header>
            <div className='AdminPanel-viewRequestsSection'>
                {threadrequests && threadrequests.map(item => (
                    <ThreadRequest id={requestIndex} details={item}></ThreadRequest>
                ))}
            </div>
            <div className='AdminPanel-requestResponseSection'>
                <button onClickAccept = { ()=> {
                    setRequestIndex(requestIndex+1) 
                    props.handleAcceptClick
                }}>
                    Click to accept the thread request
                </button>
                <button onClickDeny = { ()=> {
                    setRequestIndex(requestIndex+1)
                    props.handleDenyClick
                }}>
                    Click to deny the thread request
                </button>
                <button onClickSkip = { ()=> {
                    setRequestIndex(requestIndex+1)
                    props.handleSkipClick
                }}>
                    Click to skip the thread request for now
                </button>
            </div>
        </main>
    );
};

export default AdminPanel;