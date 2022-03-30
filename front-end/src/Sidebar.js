// sidebar
import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './Sidebar.css';

export default props => {
  return (
    <Menu right >
      <a className="menu-item" href="/login">
        Login
      </a>
      <a className="menu-item" href="/static/AboutUs.html">
        About
      </a>
      <a className="menu-item" href="/threadrequest">
        Thread Request
      </a>
    </Menu>
  ) 
} 