import React from 'react';

export default function Form(props) {
  function InputField(input) {
    return (
      <input 
        className="popup__container-input" 
        id={`${input.id}-input`}
        type={input.type} 
        name={`${input.id}-input`}
        placeholder={input.placeholder}
        defaultValue={input.value}
        minLength="2"
        maxLength={input.maxLength}
        required
      />
    )
  }

  function Button(button) {
    return (
      <button 
        className={`popup__container-btn-submit popup__container-btn-submit_${button.name}`} 
        type="submit" 
        disabled>
        {button.text}
      </button>
    )
  }   

  if(props.name === 'edit') {
    return (
      <form 
        className="popup__container-content popup__container-content_edit"
        action="example.php" 
        method="post" 
        name="edit"
        noValidate
      >
        <InputField  id="name" value="Жак-Ив Кусто" type="text" maxLength='40' />
        <span className="name-input-error popup__container-input-error"></span>
        <InputField  id="job" value="Исследователь океана" type="text" maxLength='40' />
        <span className="job-input-error popup__container-input-error"></span>
        <Button name={props.name} text="Сохранить" />
      </form>
    );
  }

  if (props.name === 'add') {
    return (
      <form 
        className="popup__container-content popup__container-content_add"
        action="example.php" 
        method="post" 
        name="add"
        noValidate
      >
        <InputField  id="img-name" placeholder="Название" type="text" maxLength='30'/>
        <span className="img-name-input-error popup__container-input-error"></span>
        <InputField  id="img-link" placeholder="Ссылка на картинку" type="url" maxLength='30'/>
        <span className="img-link-input-error popup__container-input-error"></span>
        <Button name={props.name} text="Создать" />
      </form>
    );
  }

  if (props.name === 'avatar') {
    return (
      <form 
        className="popup__container-content popup__container-content_update"
        action="example.php" 
        method="post" 
        name="avatar"
        noValidate
      >
        <InputField  id="avatar-link" placeholder="Ссылка на картинку" type="url" />
        <span className="avatar-link-input-error popup__container-input-error"></span>
        <Button name={props.name} text="Сохранить" />
      </form>
    );
  }
}