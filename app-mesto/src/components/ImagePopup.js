import React from 'react';

export default function ImagePopup(props) {
  return (
    <div className={`popup popup_image ${props.isOpen ? "popup_opened" : ""}`}>
      <figure className="popup__container-image">
        <img className="popup__container-modal-image" src={props.card.link} alt={props.card.name} />
        <figcaption className="popup__container-caption">{props.card.name}</figcaption>
        <button 
          className="popup__container-btn-close popup__container-btn-close_image" 
          type="button" 
          onClick={props.onClose}>
        </button>
      </figure>
    </div>
  );
}

