import React, { useEffect, useState } from 'react';
import './HeaderComponent.scss';
import NavComponent from '../NavComponent/NavComponent';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import logo from '../../assets/images/WeGo.svg'; 

export default function HeaderComponent() {
    return (
     
        <header id='globalHeader'>
          <div id='headerContent'>
            <NavLink to="/">
              <img src={logo} alt="WeGo Logo" />
            </NavLink>
            <div id='navContainer'>
              <NavComponent />
            </div>
          </div>
        </header>
    );
}


