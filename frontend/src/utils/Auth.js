export const BASE_URL = 'https://api.mesto.olgasivyuk.nomoredomains.xyz';

function checkResponse(res) {
    return res.ok
    ? res.json()
    : Promise.reject(`Ошибка...: ${res.status}`);
};

export function register(password, email) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then(checkResponse)
};

export function authorize(password, email) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include', // ПР15
    body: JSON.stringify({password, email})
  })
  .then(checkResponse)
};

export function getContent() {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      //'Authorization': `Bearer ${token}`,
    },
    credentials: 'include', // ПР15
  })
  .then(checkResponse)
}