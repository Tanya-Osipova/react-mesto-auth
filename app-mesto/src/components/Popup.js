import React, {useEffect} from 'react';

function Popup({ component: Component, ...props }) {
  useEffect(() => {
    if (!props.isOpen) return;

    document.addEventListener("keydown", handleESC);
    document.addEventListener("click", handlePopupClick);

    return () => {
      document.removeEventListener("keydown", handleESC);
      document.removeEventListener("click", handlePopupClick);
    }
  }, [props.isOpen]);

  
  function handleESC(e) {
    if (e.key === "Escape") {
      props.onClose()
    }
  }

  function handlePopupClick(e) {
    if (e.target.classList.contains('popup_opened')) {
      props.onClose()
    }  
  }

  return (
    <Component {...props} />
  )
}

export default Popup;