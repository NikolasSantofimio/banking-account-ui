import { useState } from 'react';
import client from '../api/client';

export default function AccountForm() {
  const [accountHolder, setAccountHolder] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);
    try {
      const response = await client.post('/accounts', { accountHolder });
      setResult(response.data);
      setAccountHolder('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating account');
    }
  };

  return (
    <div className="card">
      <h3>Create Account</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Account holder name"
          value={accountHolder}
          onChange={(e) => setAccountHolder(e.target.value)}
          required
        />
        <button type="submit">Create</button>
      </form>
      {result && (
        <div className="result success">
          Account #{result.id} created for {result.accountHolder} — balance: {result.balance}
        </div>
      )}
      {error && <div className="result error">{error}</div>}
    </div>
  );
}