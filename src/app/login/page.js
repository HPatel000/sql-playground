'use client';

import { useState } from 'react';
import { useAppContext } from '../context';

export default function Login() {
  const { authenticate, setCurrUserInfo } = useAppContext();
  const [error, setError] = useState();
  const authenticateUser = async (e) => {
    setError(null);
    e.preventDefault();
    const username = e.target[0].value.trim();
    const password = e.target[1].value.trim();
    if (!username || !password) {
      setError('Please Enter Username and Password!');
      return;
    }
    console.log(e);
    try {
      const res = await authenticate({
        username: username,
        password: password,
      });
      if (res.error) {
        setError(res.error.toString());
      } else {
        setCurrUserInfo(username, password);
      }
    } catch (e) {
      setError(e.error.toString());
    }
  };
  return (
    <div className='loginForm'>
      <h1>LOGIN</h1>
      <form onSubmit={authenticateUser}>
        <label htmlFor='username'>Username</label>
        <input type='text' />
        <br />
        <label htmlFor='password'>Password</label>
        <input type='password' />
        {error && <p className='errorMsg'>{error}</p>}
        <br />
        <button type='submit'>OK</button>
      </form>
    </div>
  );
}
