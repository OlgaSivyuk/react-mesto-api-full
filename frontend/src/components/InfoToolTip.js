import React from 'react'
//import successSignImg from '../images/union.svg';
//import unSuccessSignImg from '../images/union-wrong.svg';

function InfoToolTip({isOpen, onClose, text, image}){
  //const image = unSuccessSignImg
  //const imageS = successSignImg

  return (
    <div className={`popup popup_type_tooltip ${isOpen ? 'popup_opened' : ' '}`}>
      <div className='popup__container'>
      <img className='popop__infotool-img' alt={text} src={image} />
      <h2 className='popup__title popup__title_type_message'>{text}</h2>
      <button
          type='button'
          className='popup__close-popup'
          aria-label='Закрыть'
          onClick={onClose}>
        </button>
      </div>
      
    </div>
  )
}

export default InfoToolTip
