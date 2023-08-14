import React, { useState } from 'react';
import FirebaseAuthService from '../FirebaseAuthService';

export default function LoginForm({ user }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogout = () => {
    FirebaseAuthService.logoutUser();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await FirebaseAuthService.loginUser(username, password);
      setUsername('');
      setPassword('');
    } catch (error) {
      alert(`code: ${error.code}; message: ${error.message}`);
    }
  };

  const handleLoginWithGoogle = () => {
    try {
      FirebaseAuthService.loginWithGoogle();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSendResetPasswordEmail = async () => {
    if (!username) {
      alert('missing username');
      return;
    }
    try {
      await FirebaseAuthService.sendPasswordResetEmail(username);
      alert('password reset mail sent!');
    } catch (error) {
      alert(error.message);
    }
  };

  const renderHeadingForAuthUser = <div className='row'>
    <h3>Welcome, {user?.email}</h3>
    <button type='button' className='primary-button' onClick={handleLogout}>
      Logout
    </button>
  </div>;


  const renderForm = <form onSubmit={handleSubmit} className='login-form'>
    <label className='input-label login-label'>
      Username (email):
      <input
        type="email"
        required
        value={username}
        onChange={e => setUsername(e.target.value)}
        className='input-text' />
    </label>
    <label className='input-label login-label'>
      Password:
      <input
        type="password"
        required
        value={password}
        onChange={e => setPassword(e.target.value)}
        className='input-text' />
    </label>
    <div className='button-box'>
      <button className='primary-button'>Login</button>
      <button type='button' className='primary-button' onClick={handleSendResetPasswordEmail}>Reset Password</button>
      <button type='button' className='primary-button' onClick={handleLoginWithGoogle}>Login with Google</button>
    </div>

  </form>;

  return (
    <div className='login-form-container'>
      {
        user
          ? renderHeadingForAuthUser
          : renderForm
      }
    </div>
  );
}
