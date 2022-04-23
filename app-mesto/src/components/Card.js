import React from 'react';

export default function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <li className="cards__item" id="" onClick={handleClick}>
      <img className="cards__image" src={props.card.link} />
      <button className="cards__btn-trash" type="button"></button>
      <div className="cards__info">
        <h2 className="cards__title">{props.card.name}</h2>
        <div className="cards__like-container">
          <button className="cards__btn-like" type="button"></button>
          <span className="cards__like-counter">{props.card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}
