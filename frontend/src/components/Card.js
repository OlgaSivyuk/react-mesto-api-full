import React,{ useContext }from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = useContext(CurrentUserContext);
  
  const isOwn = card.ownerId === currentUser._id;
  const cardDeleteButtonClassName = (
    `place__delete ${isOwn ? '' : 'place__delete_hidden'}`
  ); 
  
  const isLiked = card.likes.some(user => user._id === currentUser._id); 
  const cardLikeButtonClassName = (
    `place__like ${isLiked && 'place__like_active'}`
  );

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card)
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }
  
  return (
    <article className='place'>
      <img
        className='place__image'
        alt={card.name}
        src={card.link}
        onClick={handleClick}
      />
      <div className='place__info'>
        <h2 className='place__name'>{card.name}</h2>
        <div className='place__reaction'>
          <button
            type='button'
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            aria-label='Нравится'
          ></button>
          <span className='place__like-count'>{card.likes.length}</span>
        </div>
      </div>
      <button
        type='button'
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
        arial-label='Удалить'
      ></button>
    </article>
  );
}

export default Card;
