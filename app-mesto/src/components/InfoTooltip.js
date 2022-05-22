import React from 'react';
import Success from '../images/vector/success.svg';
import Failure from '../images/vector/failure.svg';

export default function InfoTooltip(props) {
  return (
    <div className={`popup popup_message ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <img className='popup__image' src={props.message === 'Success' ? Success : Failure} />
        <p 
          className='popup__message'>
            {props.message === 'Success' ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </p>
        <button 
          className="popup__container-btn-close" 
          type="button" 
          onClick={props.onClose}>
        </button>
      </div>
    </div>
  );
}

