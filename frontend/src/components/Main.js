import React, { useContext } from 'react';
//import { api } from '../utils/Api.js';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike , cards, onCardDelete}) {
  const currentUser = useContext(CurrentUserContext); 

  return (
    <main className='content'>
      <section className='profile'>
        <div className='profile__avatar-img'>
          <img
            src={currentUser.userAvatar}
            alt='Фото профиля'
            className='profile__avatar'
          />
          <button
            title='Загрузить аватар'
            className='profile__avatar-button'
            onClick={onEditAvatar}
          ></button>
        </div>
        <div className='profile__info'>
          <div className='profile__top-row'>
            <h1 className='profile__name'>{currentUser.userName}</h1>
            <button
              type='button'
              id='open_popup'
              className='profile__add-info'
              aria-label='Редактировать профиль'
              onClick={onEditProfile}
            ></button>
          </div>
          <p className='profile__bio'>{currentUser.userDescription}</p>
        </div>
        <button
          type='button'
          className='profile__add-place'
          aria-label='Добавить фото'
          onClick={onAddPlace}
        ></button>
      </section>

      <section className='places'>
        {cards.map((card) => {
          return (
            <Card 
              key={card.cardId} 
              card={card} 
              onCardClick={onCardClick} 
              onCardLike={onCardLike}
              onCardDelete={onCardDelete} />
          );
        })}
      </section>
    </main>
  );
}

export default Main;