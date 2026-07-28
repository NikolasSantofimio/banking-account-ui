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
      setError(err.response?.data?.message || `Error processing ${type}`);
    }
  };

  return (
    <div className="card">
      <h3>Deposit / Withdraw</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Account ID"
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
          required
        />
        <input
          type="number"
          step="0.01"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="deposit">Deposit</option>
          <option value="withdraw">Withdraw</option>
        </select>
        <button type="submit">Submit</button>
      </form>
      {result && (
        <div className="result success">
          {result.type} of {result.amount} processed — new balance: {result.currentBalance}
        </div>
      )}
      {error && <div className="result error">{error}</div>}
    </div>
  );
}