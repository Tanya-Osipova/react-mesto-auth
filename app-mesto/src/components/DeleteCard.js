import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function DeleteCard(props) {
  function handleSubmit(e) {
    e.preventDefault();
    props.onCardDelete(props.card);
  }
  return (
    <div>
      <PopupWithForm 
        name='delete' 
        title='Вы уверены?' 
        isOpen={props.isOpen} 
        onClose={props.onClose} 
        onSubmit={handleSubmit} 
        buttonText='Да'>
      </PopupWithForm>
    </div>
  );
}

 