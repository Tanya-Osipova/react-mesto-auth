import React, { useState, useEffect } from 'react';
import updateIcon from '../images/vector/update.svg'
import { api } from '../utils/Api';
import Card from './Card';

export default function Main(props) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserInfo().then((res) => {
      setUserName(res.name)
      setUserAvatar(res.avatar)
      setUserDescription(res.about)
    })
    api.getCards().then((card) => {
      setCards(card)
    })
    .catch(err => {
      console.log(err); 
    });
  },[])

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__image-container">
            <img className="profile__image" src={userAvatar} alt="avatar" />
            <img className="profile__update-icon" src={updateIcon} alt="update icon" onClick={props.onEditAvatar} />
          </div>
          <div className="profile__info">
            <div>
              <h1 className="profile__name">{userName}</h1>
              <p className="profile__job">{userDescription}</p>
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
          {cards.map(card => <Card key={card._id} card={card} onCardClick={props.onClick} />)}
        </ul>
      </section>
    </main>
  );
}