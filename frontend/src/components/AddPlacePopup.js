import React, {useState, useEffect} from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup ({isOpen, onClose, onAddPlace }){
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    function handleNameChange(e) {
        setName(e.target.value)
    }
    
    function handleLinkChange(e) {
        setLink(e.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault();
        onAddPlace({ 
            name: name,
            link: link,
        });
    }

    useEffect(() => { 
        setName('');
        setLink('');
    }, [isOpen]);

    return (
        <PopupWithForm
        name='place'
        isOpen={isOpen}
        title='Новое место'
        id='form-place'
        formName='edit-place-form'
        buttonText='Создать'
        onClose={onClose}
        onSubmit={handleSubmit}>
            <input
              type='text'
              id='place-name'
              name='place-name'
              className='popup__input popup__input_place-name'
              placeholder='Название'
              minLength='2'
              maxLength='30'
              required
              onChange={handleNameChange}
              value={name || ''}
            />
            <span 
              id='error-place-name' 
              className='popup__error'>
            </span>
            <input
              type='url'
              id='place-link'
              name='place-link'
              className='popup__input popup__input_place_link'
              placeholder='Ссылка на картинку'
              required
              onChange={handleLinkChange}
              value={link || ''}
            />
            <span 
              id='error-place-link' 
              className='popup__error'>
            </span>
      </PopupWithForm>
    )
}

export default AddPlacePopup;