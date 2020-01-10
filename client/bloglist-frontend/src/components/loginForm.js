import React from 'react';
import loginService from '../services/login';
import { useField } from '../hooks/index'
import PropTypes from 'prop-types'

const LoginForm = ({

  setUser, setModalMessage,setToken
}) => {
  const username = useField('text');
  const password = useField('password');

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('logging in with', username.input.value, password.input.value);
    try {
      const user = await loginService.login({
        username: username.input.value, password: password.input.value,
      });

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user),
      );

      setToken(user.token)
      setUser(user);
      username.reset();      
      password.reset();
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
          /*type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}*/
          {...username.input}
        />
      </div>
      <div>
        Password
        {' '}
        <input
          /*type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}*/
          {...password.input}
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
