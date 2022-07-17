class Api {
  constructor({baseUrl, headers}) {
    this._headers = headers; // здесь заложен уникальный токен авторизации тип контента
    this._baseUrl = baseUrl; // https://mesto.nomoreparties.co/v1/cohort-39/ подставляется в fetch перед хвостом
  }
  
  getProfile() { 
    //console.log('getProfile');
    return fetch(`${this._baseUrl}/users/me`, { // применяем шаблонные строки ${}
      headers: this._headers
   })
    .then(res => res.ok ? res.json(): 
      Promise.reject(res.status))
  }
  
  getUsersCards() { 
    return fetch(`${this._baseUrl}/cards`, { // 1. отправляем headers
        headers: this._headers
    })
    .then(res => res.ok ? res.json():  //2. проверяем,  что сервер ответил успешно res.ok // 3. если успешно,  делаем из ответа объект res.json() 
      Promise.reject(res.status)) //4. если ответ не успешный,  то проваливаемся в ошибку  выводим catch
  }
  
  editProfile(name, about) { 
    return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH', 
        headers: this._headers,
        body: JSON.stringify({ // делаем из объекта строку для передачи данных
            name,
            about
        })
    })
    .then(res => res.ok ? res.json():
      Promise.reject(res.status))
  }

  addNewCard(name, link) { 
    return fetch(`${this._baseUrl}/cards`, {
        method: 'POST', // этот метод принимает данные на хранение, используется при загрузке файлов
        headers: this._headers,
        body: JSON.stringify({
            name,
            link
          })
    })
    .then(res => res.ok ? res.json():
      Promise.reject(res.status))
  }

  deleteCard(id) { 
    return fetch(`${this._baseUrl}/cards/${id}`,{ // применяем шаблонные строки и id, который забираем из карточки во время удаления
        method: 'DELETE',
        headers: this._headers,
    })
    .then(res => res.ok ? res.json():
      Promise.reject(res.status))
  }

  deleteLike(id) { 
    return fetch(`${this._baseUrl}/cards/${id}/likes`,{ 
        method: 'DELETE',
        headers: this._headers,
    })
    .then(res => res.ok ? res.json():
      Promise.reject(res.status))
  }

  addLike(id) { 
    return fetch(`${this._baseUrl}/cards/${id}/likes`,{ 
        method: 'PUT',
        headers: this._headers,
    })
    .then(res => res.ok ? res.json():
      Promise.reject(res.status))
  }

  editProfileAvatar(avatar) { 
    return fetch(`${this._baseUrl}/users/me/avatar`,{ 
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({ // делаем из объекта строку для передачи данных
          avatar
      })
    })
    .then(res => res.ok ? res.json():
      Promise.reject(res.status))
  }

  
  }
  
  export const api = new Api({
    // baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39', // здесь указываем свою когорту
    baseUrl: 'https://api.mesto.olgasivyuk.nomoredomains.xyz', // ПР15
    headers: {
      authorization: '88e16114-a16c-404a-8007-3bb931ff1f77', // здесь указываем свой токен
      'Content-Type': 'application/json'
    }
  }); 