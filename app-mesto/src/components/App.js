import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Popup from './Popup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCard from './DeleteCard';
import Login from './Login';
import Register from './Register';
import * as userAuth from '../utils/userAuth';

function App() {
  const [isEditProfilePopupOpen,setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen,setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen,setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen,setIsDeleteCardPopupOpen] = useState(false);
  const [isMessagePopupOpen,setIsMessagePopupOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState({_id: ''});
  const [selectedCard, setSelectedCard] = useState({name: '', link: ''});
  const [currentUser, setCurrentUser] = useState({});
  const [currentUserMail, setCurrentUserMail] = useState('');
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();

  useEffect(() => {
    // Check login
    tokenCheck()
  },[])

  useEffect(() => {
    if (!loggedIn) return;
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
  }, [loggedIn])

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
  
  // Delete Popup
  function onDeleteCard(card) {
    setIsDeleteCardPopupOpen(true);
    setCardToDelete(card);
  }  

  // Image Popup
  function handleCardClick(card) {
    setSelectedCard(card);
  } 

  // Message popup
  function handleMessagePopup(){
    setIsMessagePopupOpen(true)
  }

  // Close All Popups
  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsMessagePopupOpen(false)
    setSelectedCard({name: '', link: ''})
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

  // Add cards
  function handleAddPlace(place) {
    api.addCard(place).then((res) => {
      setCards([res, ...cards])
      closeAllPopups();
    })
    .catch(err => console.log(err))
  }

  // Like
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch(err => console.log(err))
  }

  // Delete
  function handleCardDelete(card){
    api.deleteCard(card._id).then(() => {
      setCards(cards.filter(f => f._id !== card._id))
      setCardToDelete({_id: ''})
      setIsDeleteCardPopupOpen(false)
    })
    .catch(err => console.log(err))
  }

  // Login
  function handleLogin(e) {
    e.preventDefault();
    setLoggedIn(true);
  }

  // Check token
  function tokenCheck () {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      if(token) {
        userAuth.getContent(token).then((res) => {
          if(res) {
            setCurrentUserMail(res.data.email);
            setLoggedIn(true);
            history.push('/')
          }
        })
      }
    }
  }

  function cardsMain() {
    return (
      <Main 
        onEditProfile={onEditProfile} 
        onAddPlace={onAddPlace} 
        onEditAvatar={onEditAvatar} 
        onClick={handleCardClick} 
        onCardLike={handleCardLike} 
        onCardDelete={onDeleteCard} 
        cards={cards} 
      />
    )
  }

  return (
    <div>
      <CurrentUserContext.Provider value={currentUser}>
        <Header user={currentUserMail} />
        <Switch>
          <ProtectedRoute exact loggedIn={loggedIn} path="/"
            component={cardsMain} 
          />
          <Route path="/sign-in">
            <Login 
              handleLogin={handleLogin} 
              isOpen={isMessagePopupOpen} 
              onClose={closeAllPopups}
              onPopupOpen={handleMessagePopup}
            />
          </Route>
          <Route path="/sign-up">
            <Register 
              isOpen={isMessagePopupOpen} 
              onClose={closeAllPopups}
              onPopupOpen={handleMessagePopup}
            />
          </Route>
        </Switch>
        <Footer />
        <Popup 
          component={EditProfilePopup} 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser} 
        /> 
        <Popup
          component={AddPlacePopup} 
          isOpen={isAddPlacePopupOpen} 
          onClose={closeAllPopups} 
          onAddPlace={handleAddPlace} 
        /> 
        <Popup
          component={EditAvatarPopup} 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups} 
          onUpdateAvatar={handleUpdateAvatar} 
        />
        <Popup
          component={ImagePopup} 
          card={selectedCard} 
          onClose={closeAllPopups} 
          isOpen={selectedCard.name !== ''} 
        />
        <Popup
          component={DeleteCard} 
          isOpen={isDeleteCardPopupOpen} 
          onClose={closeAllPopups}  
          onCardDelete={handleCardDelete}
          card={cardToDelete}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
