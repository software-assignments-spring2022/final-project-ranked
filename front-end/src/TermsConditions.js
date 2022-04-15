import React from "react"
import { Link } from "react-router-dom"
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/TermsConditions.css'

const TermsCondtions = () => {
  const mockImg = 'https://picsum.photos/200/300'

    return (
      <>
        <main className='TermsConditions'>
          <div className='termsTitle'>
            <img src={mockImg} alt='terms image' /> 
            <div className='centered'><b>Terms & Conditions</b></div>
          </div>

          <div className='termsText'>
            <DropdownButton id='dropdown-basic-button' title='Select Document'>
              <Dropdown.Item href="#/action-1">Document #1</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Document #2</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Document #3</Dropdown.Item>
            </DropdownButton>
            <h3>Table of Contents</h3>
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