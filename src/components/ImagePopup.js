import React from 'react';

export default function ImagePopup(props) {
  return (
    <div className="popup popup_image">
      <figure className="popup__container-image">
        <img className="popup__container-modal-image" src={props.card.link} />
        <figcaption className="popup__container-caption">{props.card.name}</figcaption>
        <button className="popup__container-btn-close popup__container-btn-close_image" type="button" onClick={props.onClose}></button>
      </figure>
    </div>
  );
}

