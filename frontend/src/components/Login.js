import React, {useState} from 'react';
import { Link } from 'react-router-dom';

function Login ({handleLogin}) {
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
    handleLogin({ password, email });
}
  
  return (
    <div className='login'>
        <h3 className='login__title'>Вход</h3>
        <form className='login__form' onSubmit={handleSubmit}>
          <label className='login__form-field'>
          <input className='login__input login__input_email' 
            type='email' 
            placeholder='Email' 
            name='email' 
            onChange={handleChange}
            value={data.email} 
            required/>
          </label>
          <span
              id='error-login-email'
              className='login__error'>
          </span>

          <label className='login__form-field'>
          <input className='login__input login__input_password' 
            type='password' 
            placeholder='Пароль' 
            name='password' 
            onChange={handleChange}
            value={data.password} 
            required/>
          </label>
          <span
              id='error-login-email'
              className='login__error'>
          </span>
          <button className='login__submit' type='submit'>Войти</button>
        </form>
        <p className='register__signin'>Еще нет личного аккаунта? <Link to='/signup' className='register__signin_link'>Зарегистрироваться</Link></p>
    </div>
  );
}

export default Login