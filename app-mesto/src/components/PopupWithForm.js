import React from 'react';
import Form from './Form';

export default function PopupWithForm(props) {
  return (
    <div className={`popup popup_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
      <div className={`popup__container popup__container_${props.name}`}>
        <h3 className="popup__container-title">{props.title}</h3>
          <Form {...props} />
        <button className="popup__container-btn-close" onClick={props.onClose} type="button"></button>
      </div>
    </div>
  );
}

