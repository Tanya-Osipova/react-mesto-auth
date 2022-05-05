import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">&copy; <span>{new Date().getFullYear()}</span> Mesto Russia</p>
    </footer> 
  );
}
