import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import {InputField} from './Form'

export default function App() {
  const [isEditProfilePopupOpen,setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen,setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen,setIsEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({name: '', link: ''})

  // Avatar Popup
  function onEditAvatar() {
    setIsEditAvatarPopupOpen(true);
  }
  
  // Profile Popup
  function onEditProfile() {
    setIsEditProfilePopupOpen(true);
  }

  // Place Popup
  function onAddPlace() {
    setIsAddPlacePopupOpen(true);
  }   

  // Image Popup
  function handleCardClick(card) {
    setSelectedCard(card);
  } 

  // Close All Popups
  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({name: '', link: ''})
  }

  // Close Popup on esc key and click
  useEffect(() => {
    document.addEventListener("click", handlePopupClick);
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("click", handlePopupClick);
      document.removeEventListener("keydown", handleEscapeKey);

    };
  }, [isEditProfilePopupOpen,isAddPlacePopupOpen,isEditAvatarPopupOpen]);

  function handlePopupClick(e) {
    if (e.target.classList.contains('popup_opened')) {
      closeAllPopups()
    }  
  }
   function handleEscapeKey(e) {
    if(e.key === 'Escape') {
      closeAllPopups();
    }   
  }

  return (
    <div>
      <Header />
      <Main onEditProfile={onEditProfile} onAddPlace={onAddPlace} onEditAvatar={onEditAvatar} onClick={handleCardClick} />
      <Footer />
      <PopupWithForm name='edit' title='Редактировать профиль' onClose={closeAllPopups} isOpen={isEditProfilePopupOpen}>
        <InputField  id="name" value="Жак-Ив Кусто" type="text" maxLength='40' />
        <span className="name-input-error popup__container-input-error"></span>
        <InputField  id="job" value="Исследователь океана" type="text" maxLength='40' />
        <span className="job-input-error popup__container-input-error"></span>
      </PopupWithForm>
      <PopupWithForm name='add' title='Новое место' onClose={closeAllPopups} isOpen={isAddPlacePopupOpen}>
        <InputField  id="img-name" placeholder="Название" type="text" maxLength='30'/>
        <span className="img-name-input-error popup__container-input-error"></span>
        <InputField  id="img-link" placeholder="Ссылка на картинку" type="url" maxLength='30'/>
        <span className="img-link-input-error popup__container-input-error"></span>
      </PopupWithForm>
      <PopupWithForm name='avatar' title='Обновить аватар' onClose={closeAllPopups}  isOpen={isEditAvatarPopupOpen}>
        <InputField  id="avatar-link" placeholder="Ссылка на картинку" type="url" />
        <span className="avatar-link-input-error popup__container-input-error"></span>
      </PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={selectedCard.name !== ''} />
    </div>
  );
}


