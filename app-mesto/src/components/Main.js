import React from 'react';
import updateIcon from '../images/vector/update.svg'
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__image-container">
            <img className="profile__image" src={currentUser.avatar} alt="avatar" />
            <img className="profile__update-icon" src={updateIcon} alt="update icon" onClick={props.onEditAvatar} />
          </div>
          <div className="profile__info">
            <div>
              <h1 className="profile__name">{currentUser.name}</h1>
              <p className="profile__job">{currentUser.about}</p>
            </div>
            <div>
              <button className="profile__btn-edit" type="button" onClick={props.onEditProfile}></button>
            </div>
          </div>
        </div>
        <button className="profile__btn-add" type="button" onClick={props.onAddPlace}></button>
      </section>
      <section className="cards">
        <ul className="cards__list">
          {props.cards.map(card => 
            <Card 
              key={card._id} 
              card={card} 
              onCardClick={props.onClick} 
              onCardLike={props.onCardLike} 
              onCardDelete={props.onCardDelete}
            />
          )}
        </ul>
      </section>
    </main>
  );
}