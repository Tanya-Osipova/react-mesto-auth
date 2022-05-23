import React from 'react';
import PopupWithForm from './PopupWithForm';
import { InputField } from './Form';

export default function EditAvatarPopup(props) {
  const avatarRef = React.useRef(); 
  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [props.isOpen])

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  } 

  return (
    <div>
      <PopupWithForm 
        name='avatar' 
        title='Обновить аватар' 
        isOpen={props.isOpen} 
        onClose={props.onClose} 
        onSubmit={handleSubmit} 
        buttonText='Сохранить'
      >
        <InputField  
          id="avatar-link" 
          placeholder="Ссылка на картинку" 
          type="url" 
          reference={avatarRef} 
        />
        <span className="avatar-link-input-error popup__container-input-error"></span>
      </PopupWithForm>
    </div>
  );
}

 