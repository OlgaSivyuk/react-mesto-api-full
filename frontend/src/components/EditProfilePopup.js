import React, { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup ({isOpen, onClose, onUpdateUser}){
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  
  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  useEffect(() => { 
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
        name='profile'
        title='Редактировать профиль'
        id='form-profile'
        formName='edit-profile-form'
        buttonText='Сохранить'
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}>
            <input
              type='text'
              id='name'
              name='name'
              className='popup__input'
              placeholder='Имя'
              minLength='2'
              maxLength='40'
              required
              value={name || ''}
              onChange={handleNameChange} 
            />
            <span 
              id='error-name' 
              className='popup__error'>
            </span>
            <input
              type='text'
              id='bio'
              name='bio'
              className='popup__input'
              placeholder='О себе'
              minLength='2'
              maxLength='200'
              required
              value={description || ''}
              onChange={handleDescriptionChange}
            />
            <span 
              id='error-bio' 
              className='popup__error'>
            </span>
        </PopupWithForm>
  )
}

export default EditProfilePopup;