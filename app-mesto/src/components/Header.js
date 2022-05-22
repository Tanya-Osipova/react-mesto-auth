import React from 'react';
import logo from '../images/logo/logo.svg';
import Navbar from './Navbar';

export default function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />
      <Navbar {...props} />
    </header>
  );
}

