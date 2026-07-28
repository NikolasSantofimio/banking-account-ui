import { useState } from 'react';
import client from '../api/client';

export default function TransactionForm() {
  const [accountId, setAccountId] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('deposit');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);
    try {
      const response = await client.post(`/accounts/${accountId}/${type}`, {
        amount: parseFloat(amount),
      });
      setResult(response.data);
      setAmount('');
    } catch (err) {
      setError(err.response?.data?.message || `Could not process the ${type}.`);
    }
  };

  return (
    <div className="card">
      <p className="card-eyebrow">Movement</p>
      <h3>Deposit / Withdraw</h3>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="txAccountId">Account ID</label>
          <input
            id="txAccountId"
            type="number"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="txType">Operation</label>
          <select id="txType" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="deposit">Deposit</option>
            <option value="withdraw">Withdraw</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="txAmount">Amount</label>
          <input
            id="txAmount"
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit {type}</button>
      </form>
      {result && (
        <div className="ledger-result">
          <span className={`badge ${result.type === 'DEPOSIT' ? 'deposit' : 'withdraw'}`}>
            {result.type}
          </span>
          <div className="ledger-amount">{result.amount}</div>
          <div className="ledger-row">
            <span className="label">New balance</span>
            <span className="value">{result.currentBalance}</span>
          </div>
        </div>
      )}
      {error && <div className="result-error">{error}</div>}
    </div>
  );
}