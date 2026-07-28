import { useState } from 'react';
import client from '../api/client';

export default function BalanceLookup() {
  const [accountId, setAccountId] = useState('');
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setBalance(null);
    try {
      const response = await client.get(`/accounts/${accountId}/balance`);
      setBalance(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Account not found');
    }
  };

  return (
    <div className="card">
      <h3>Check Balance</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Account ID"
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
          required
        />
        <button type="submit">Check</button>
      </form>
      {balance && (
        <div className="result success">
          {balance.accountHolder} — balance: {balance.balance}
        </div>
      )}
      {error && <div className="result error">{error}</div>}
    </div>
  );
}