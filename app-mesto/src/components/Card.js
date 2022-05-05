import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
     props.onCardLike(props.card);
  }

  function handleDeleteClick(){
    props.onCardDelete(props.card)
  }

  return (
    <li className="cards__item" id="">
      <img className="cards__image" src={props.card.link} onClick={handleClick} alt={props.card.name} />
      <button 
        className={`cards__btn-trash ${isOwn ? "cards__btn-trash_active" : ""}`} 
        type="button" 
        onClick={handleDeleteClick}>
      </button>
      <div className="cards__info">
        <h2 className="cards__title">{props.card.name}</h2>
        <div className="cards__like-container">
          <button 
            className={`cards__btn-like ${isLiked ? "cards__btn-like_active" : ""}`} 
            type="button" 
            onClick={handleLikeClick}>
          </button>
          <span className="cards__like-counter">{props.card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}
