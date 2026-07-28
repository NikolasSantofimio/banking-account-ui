import { useState } from 'react';
import LoginForm from './components/LoginForm';
import AccountForm from './components/AccountForm';
import TransactionForm from './components/TransactionForm';
import BalanceLookup from './components/BalanceLookup';
import './index.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('jwt_token')
  );

  const handleLogout = () => {
    localStorage.removeItem('jwt_token');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <LoginForm onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <p className="brand-eyebrow">Banking Account Service</p>
          <h1>Operations Console</h1>
        </div>
        <button onClick={handleLogout}>Sign out</button>
      </header>
      <main>
        <AccountForm />
        <TransactionForm />
        <BalanceLookup />
      </main>
    </div>
  );
}

export default App;