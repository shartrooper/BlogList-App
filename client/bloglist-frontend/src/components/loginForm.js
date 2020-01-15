import React, { useState, useEffect } from 'react';
import loginService from '../services/login';
import { useField } from '../hooks/index'
import PropTypes from 'prop-types'
import axios from 'axios';

const LoginForm = ({

  setUser, setModalMessage, setToken
}) => {
  const username = useField('text');
  const password = useField('password');
  const [access, setAccess] = useState('');

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const handleLogin = async () => {
      console.log('logging in with', username.input.value, password.input.value);
      try {
        const user = await loginService.login(access, { cancelToken: source.token });
        window.localStorage.setItem(
          'loggedBlogAppUser', JSON.stringify(user),
        );
        setToken(user.token)
        setUser(user);
        username.reset();
        password.reset();
      } catch (exception) {
        if (axios.isCancel(exception)) {
          console.log("cancelled");
        }
        else {
          throw exception;
        }
        setModalMessage({ message: 'Wrong credentials or user doesn\'t exist !', style: { color: 'red', border: 'red 3px solid', fontSize: 20 } });
        setTimeout(() => {
          setModalMessage(null);
        }, 3500);
      }
    };
    if (access) { handleLogin() };

    return () => {
      source.cancel();
    };
  }, [access]);

  const handleUser = (event) => {
    event.preventDefault();
    (username.input.value && password.input.value) ? setAccess({
      username: username.input.value, password: password.input.value,
    }) : alert('Please submit username or password');
  }

  return (
    <form onSubmit={handleUser} className="login-form">
      <div>
        Username
        {' '}
        <input
          {...username.input}
        />
      </div>
      <div>
        Password
        {' '}
        <input
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
