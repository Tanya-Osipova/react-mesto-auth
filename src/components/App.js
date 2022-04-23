import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Popup from './PopupWithForm';
import ImagePopup from './ImagePopup';

export default function App() {
  const [isEditProfilePopupOpen,setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen,setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen,setIsEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({name: '', link: ''})

  // Avatar Popup
  function onEditAvatar() {
    const popup = document.querySelector('.popup_avatar');
    setIsEditAvatarPopupOpen(true);
    popup.classList.add('popup_opened');
    return () => {
      popup.classList.remove('popup_opened');
      setIsEditAvatarPopupOpen(false);
    }
  }
  
  // Profile Popup
  function onEditProfile() {
    const popup = document.querySelector('.popup_edit');
    setIsEditProfilePopupOpen(true);
    popup.classList.add('popup_opened');
    return () => {
      popup.classList.remove('popup_opened');
      setIsEditProfilePopupOpen(false);
    }
  }

  // Place Popup
  function onAddPlace() {
    const popup = document.querySelector('.popup_add');
    setIsAddPlacePopupOpen(true);
    popup.classList.add('popup_opened');
    return () => {
      popup.classList.remove('popup_opened');
      setIsAddPlacePopupOpen(false);
    }
  }   

  // Image Popup
  function handleCardClick(card) {
    const popup = document.querySelector('.popup_image');
    setSelectedCard(card);
    popup.classList.add('popup_opened');
    return () => {
      popup.classList.remove('popup_opened');
      setSelectedCard('');
    }
  } 

  // Close All Popups
  function closeAllPopups() {
    const popup = document.querySelector('.popup_opened');
    popup.classList.remove('popup_opened');
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({name: '', link: ''})
  }

  // Close Popup on esc key
  useEffect(() => {
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [handleEscapeKey]);

  function handleEscapeKey(e) {
    if(e.key === 'Escape') {
      closeAllPopups();
    }   
  }

  // Close the Popup when the user clicks anywhere outside of it
  window.onclick = function(event) {
    if (event.target.classList.contains('popup_opened')) {
      closeAllPopups()
    }
  }

  return (
    <div>
      <Header />
      <Main onEditProfile={onEditProfile} onAddPlace={onAddPlace} onEditAvatar={onEditAvatar} onClick={handleCardClick} />
      <Footer />
      <Popup name='edit' title='Редактировать профиль' onClose={closeAllPopups} />
      <Popup name='add' title='Новое место' onClose={closeAllPopups} />
      <Popup name='avatar' title='Обновить аватар' onClose={closeAllPopups} />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </div>
  );
}


