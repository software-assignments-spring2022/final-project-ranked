import { Link } from 'react-router-dom';
import './TermsConditions.css';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const TermsCondtions = props => {
    return (
        <>
            <main className='TermsConditions'>
                <div className='termsTitle'>
                    <img src={props.mockImg} alt="terms image" /> 
                    <div className='centered'><b>Terms & Conditions</b></div>
                </div>
                <div className='termsText'>
                    <DropdownButton id="dropdown-basic-button" title="Select Document">
                        <Dropdown.Item href="#/action-1">Document #1</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Document #2</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Docuement #3</Dropdown.Item>
                    </DropdownButton>
                    <h3>Table of Content</h3>
                    1. Topic 1 <br></br>
                    2. Topic 2 <br></br>
                    3. Topic 3 <br></br>
                    <h3>Current Document</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Nulla aliquet nunc bibendum ante mollis iaculis. 
                        Cras bibendum laoreet elit, rutrum lacinia purus lacinia lacinia. 
                        Sed semper mi purus, non fringilla justo semper ac.
                    </p>
                </div> 
                <div className="termsFooter">
                    <Link to='/about'>About Us</Link>
                </div>
            </main>
        </>
    )
};

export default TermsCondtions; 
            // <main className='termsConditions'>
            //     <div className='termsTitle'>Standard Header</div>
            //     <div className='termsTitle'><img src={props.mockImg}></img>
            //     <div className='centered'>Header Text</div>
            //     </div>

            //     <DropdownButton id="dropdown-basic-button" title="Dropdown button">
            //     <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            //     <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            //     <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            //     </DropdownButton>

            //     <div className='termsText'>
            //         <h1>Table of Content</h1>
            //         <br></br>
            //         <h2>Current Document</h2>
            //         <p>============================================================================</p>
            //     </div> 
                
            // </main>