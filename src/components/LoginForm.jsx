import { useState } from 'react';
import client from '../api/client';

export default function LoginForm({ onLoginSuccess }) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await client.post('/auth/token', { username, password });
      localStorage.setItem('jwt_token', response.data.token);
      onLoginSuccess();
    } catch (err) {
      setError('Invalid credentials. Check your username and password.');
    }
  };

  return (
    <div className="login-screen">
      <div className="login-card">
        <p className="login-eyebrow">Banking Account Service</p>
        <h2>Sign in to continue</h2>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Sign in</button>
        </form>
        {error && <p className="form-error">{error}</p>}
      </div>
    </div>
  );
}