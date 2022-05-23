import React from 'react';

export default function Form(props) {
  return (
    <form 
      className={`popup__container-content popup__container-content_${props.name}`}
      action="example.php" 
      method="post" 
      name={props.name}
      onSubmit={props.onSubmit}        
    >
      {props.children}

      <Button name={props.name} text={props.buttonText} />
    </form>
  )
}

export function InputField({id, value, type, placeholder, maxLength, onChange, reference, ...props}) {
  return (
    <input 
      className="popup__container-input" 
      id={`${id}-input`}
      type={type} 
      name={`${id}-input`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      minLength="2"
      maxLength={maxLength}
      required
      ref={reference}
      {...props}
    />
  )
}

  function Button(props) {
    return (
      <button 
        className={`popup__container-btn-submit popup__container-btn-submit_${props.name}`} 
        type="submit" 
        >
        {props.text}
      </button>
    )
  }  