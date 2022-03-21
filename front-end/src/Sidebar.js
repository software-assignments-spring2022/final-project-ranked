// sidebar

import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './Sidebar.css';

export default props => {
  return (
    <Menu right >
      <a className="menu-item" href="/Login">
        Login
      </a>
      <a className="menu-item" href="/About">
        About
      </a>
      <a className="menu-item" href="/Contact">
        Contact
      </a>
    </Menu>
  );
};