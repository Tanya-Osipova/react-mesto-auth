import React from 'react';

export default function Form(props) {
  let buttonText
  if(props.name === 'edit' || props.name === 'avatar') {
    buttonText = 'Сохранить'
  }
  if (props.name === 'add') {
    buttonText = 'Создать'
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

  return (
    <form 
        className={`popup__container-content popup__container-content_${props.name}`}
        action="example.php" 
        method="post" 
        name={props.name}
        noValidate
      >
        {props.fields}

        <Button name={props.name} text={buttonText} />
      </form>
  )
}

export function InputField(input) {
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