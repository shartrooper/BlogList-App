import React, { useState } from 'react';
import loginService from '../services/login';
import blogService from '../services/blogs';
import PropTypes from 'prop-types'

const LoginForm = ({
  setUser, setModalMessage,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('logging in with', username, password);
    try {
      const user = await loginService.login({
        username, password,
      });

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user),
      );

      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setModalMessage({ message: 'Wrong credentials or user doesn\'t exist !', style: { color: 'red', border: 'red 3px solid', fontSize: 20 } });
      setTimeout(() => {
        setModalMessage(null);
      }, 3500);
    }
  };

  return (
    <form onSubmit={handleLogin} className="login-form">
      <div>
        Username
        {' '}
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password
        {' '}
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};


LoginForm.propTypes = {  
  setModalMessage: PropTypes.func.isRequired,  
  setUser: PropTypes.func.isRequired,
};


export default LoginForm;
