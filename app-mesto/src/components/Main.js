import React, { useState, useEffect } from 'react';
import updateIcon from '../images/vector/update.svg'
import { api } from '../utils/Api';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Main(props) {
  const [cards, setCards] = useState([]);
  const currentUser = React.useContext(CurrentUserContext)

  useEffect(() => {
    api.getCards().then((card) => {
      setCards(card)
    })
    .catch(err => {
      console.log(err); 
    });
  },[])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  }

  function handleCardDelete(card){
    api.deleteCard(card._id).then(() => {
      setCards(cards.filter(f => f._id !== card._id))
    })
  }

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
          {cards.map(card => <Card key={card._id} card={card} onCardClick={props.onClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete}/>)}
        </ul>
      </section>
    </main>
  );
}