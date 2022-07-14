import React, {useState} from 'react';
import { Link } from 'react-router-dom';

function Register({ handleRegister }) {
  const [data, setData] = useState({
    password: '',
    email: '',
  });
    
  function handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    setData({ ...data, [name]: value })
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    console.log('data', data)
    const { password, email } = data;
    handleRegister({ password, email });
}
    
  return (
    <div className='register'>
      <h3 className='register__title'>Регистрация</h3>
      <form className='register__form' onSubmit={handleSubmit}>
        <label className='register__form_field'>
          <input
            className='register__input register__input_email'
            type='email'
            placeholder='Email'
            name='email'
            onChange={handleChange}
            value={data.email}
            required
          />
        </label>
        <span id='error-register-email' className='register__error'></span>

        <label className='register__form-field'>
          <input
            className='register__input register__input_password'
            type='password'
            placeholder='Пароль'
            name='password'
            onChange={handleChange}
            value={data.password}
            required
          />
        </label>
        <span id='error-register-email' className='register__error'></span>
        <button className='register__submit' type='submit'>Зарегистрироваться</button>
      </form>
      <p className='register__signin'>Уже зарегистрированы? <Link to='/signin' className='register__signin_link'>Войти</Link></p>
    </div>
  );
}

export default Register



// const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  // function handleChangeEmail(e) {
  //   setEmail(e.target.value)
  // }

  // function handleChangePassword(e) {
  //   setPassword(e.target.value)
  // }

  // function handleSubmit(event) {
  //   event.preventDefault();
  //   handleRegister(password, email);