import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import './styles/Navbar.css';

export default function Navbar(props) {
  const history = useHistory();
  function signOut() {
    localStorage.removeItem('token');
    history.push('/sign-in');
  }

  return (
    <>
      { props.user ? 
        (
          <nav className='nav'>
            <ul className="nav__list">
              <li>
                <p className="nav__link">{props.user}</p>
              </li>
              <li>
                <button onClick={signOut} className="nav__button">Выйти</button>
              </li>
            </ul>
          </nav>
        )
      :
        (
          <nav className="nav">
            <NavLink to="/sign-in" className="nav__link" activeClassName="nav__link_hidden">Войти</NavLink>
            <NavLink to="/sign-up" className="nav__link" activeClassName="nav__link_hidden">Регистрация</NavLink>
          </nav>
        )
      }
    </>
  );
}
