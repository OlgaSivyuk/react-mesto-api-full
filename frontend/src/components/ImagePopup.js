import React from 'react';

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_type_photo ${card ? 'popup_opened' : ' '}`}>
      <div className='popup__photo-body'>
        <img
          className='popup__photo-url'
          src={card ? card.link : ' '}
          alt={card ? card.name : ' '}
        />
        <h3 className='popup__photo-name'>{card ? card.name : ' '}</h3>
        <button
          type='button'
          className='popup__close-popup'
          aria-label='Закрыть фото место'
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
