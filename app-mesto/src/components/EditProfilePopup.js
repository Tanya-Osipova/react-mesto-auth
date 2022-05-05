import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { InputField } from './Form';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = React.useContext(CurrentUserContext);

  function handleName(e) {
    setName(e.target.value);
  }

  function handleDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  } 
  
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  
  return (
    <div>
      <PopupWithForm 
        name='edit' 
        title='Редактировать профиль' 
        isOpen={props.isOpen} 
        onClose={props.onClose} 
        onSubmit={handleSubmit} 
        buttonText='Сохранить'
      >
        <InputField  id="name" type="text" maxLength='40' value={name || ''} onChange={handleName} />
        <span className="name-input-error popup__container-input-error"></span>
        <InputField  id="job" type="text" maxLength='40' value={description || ''} onChange={handleDescription} />
        <span className="job-input-error popup__container-input-error"></span>
      </PopupWithForm>
    </div>
  );
}
