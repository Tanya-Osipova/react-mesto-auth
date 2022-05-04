import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import {InputField} from './Form';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';

export default function App() {
  const [isEditProfilePopupOpen,setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen,setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen,setIsEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({name: '', link: ''})
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // User info
    api.getUserInfo().then((res) => {
      setCurrentUser(res)
    })
    .catch(err => {
      console.log(err); 
    });
    // Card
    api.getCards().then((card) => {
      setCards(card)
    })
    .catch(err => {
      console.log(err); 
    });
  },[])

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

  // Update user profile
  function handleUpdateUser(user) {
    api.updateProfile(user.name, user.about).then((res) => {
      setCurrentUser(res)
      closeAllPopups()
    })
    .catch(err => console.log(err))
  }

  // Update user avatar
  function handleUpdateAvatar(user) {
    api.updateAvatar(user.avatar).then((res) => {
      setCurrentUser(res)
      closeAllPopups()
    })
    .catch(err => console.log(err))
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
    <div>
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main onEditProfile={onEditProfile} onAddPlace={onAddPlace} onEditAvatar={onEditAvatar} onClick={handleCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete} cards={cards} />
        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} /> 

        <PopupWithForm name='add' title='Новое место' onClose={closeAllPopups} isOpen={isAddPlacePopupOpen} buttonText='Создать'>
          <InputField  id="img-name" placeholder="Название" type="text" maxLength='30'/>
          <span className="img-name-input-error popup__container-input-error"></span>
          <InputField  id="img-link" placeholder="Ссылка на картинку" type="url" maxLength='30'/>
          <span className="img-link-input-error popup__container-input-error"></span>
        </PopupWithForm>

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        
        <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={selectedCard.name !== ''} />
      </CurrentUserContext.Provider>
    </div>
  );
}


