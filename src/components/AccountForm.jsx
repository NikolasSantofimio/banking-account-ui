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
      setError(err.response?.data?.message || 'Could not create the account.');
    }
  };

  return (
    <div className="card">
      <p className="card-eyebrow">New Record</p>
      <h3>Create Account</h3>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="accountHolder">Account holder</label>
          <input
            id="accountHolder"
            type="text"
            placeholder="Full name"
            value={accountHolder}
            onChange={(e) => setAccountHolder(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create account</button>
      </form>
      {result && (
        <div className="ledger-result">
          <div className="ledger-row">
            <span className="label">Account ID</span>
            <span className="value">#{result.id}</span>
          </div>
          <div className="ledger-row">
            <span className="label">Holder</span>
            <span className="value">{result.accountHolder}</span>
          </div>
          <div className="ledger-row">
            <span className="label">Opening balance</span>
            <span className="value">{result.balance}</span>
          </div>
        </div>
      )}
      {error && <div className="result-error">{error}</div>}
    </div>
  );
}