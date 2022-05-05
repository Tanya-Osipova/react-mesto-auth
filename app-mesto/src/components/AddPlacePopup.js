import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { InputField } from './Form';

export default function AddPlacePopup(props) {
  const [name, setName] = useState('')
  const [link, setLink] = useState('')

  function handleName(e) {
    setName(e.target.value);
  }

  function handleLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name:name, 
      link:link});
  }

  useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpen]);

  return (
    <div>
      <PopupWithForm 
        name='add' 
        title='Новое место' 
        onClose={props.onClose} 
        isOpen={props.isOpen} 
        onSubmit={handleSubmit} 
        buttonText='Создать'
      >
        <InputField  
          id="img-name" 
          placeholder="Название" 
          type="text" maxLength='30' 
          value={name} 
          onChange={handleName} 
        />
        <span className="img-name-input-error popup__container-input-error"></span>
        <InputField  
          id="img-link" 
          placeholder="Ссылка на картинку" 
          type="url" 
          value={link} 
          onChange={handleLink} 
        />
        <span className="img-link-input-error popup__container-input-error"></span>
      </PopupWithForm>
    </div>
  );
}

 