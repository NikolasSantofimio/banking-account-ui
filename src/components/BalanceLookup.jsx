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
      setError(err.response?.data?.message || 'Account not found.');
    }
  };

  return (
    <div className="card">
      <p className="card-eyebrow">Lookup</p>
      <h3>Check Balance</h3>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="lookupId">Account ID</label>
          <input
            id="lookupId"
            type="number"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Check balance</button>
      </form>
      {balance && (
        <div className="ledger-result">
          <div className="ledger-row">
            <span className="label">Holder</span>
            <span className="value">{balance.accountHolder}</span>
          </div>
          <div className="ledger-amount">{balance.balance}</div>
        </div>
      )}
      {error && <div className="result-error">{error}</div>}
    </div>
  );
}