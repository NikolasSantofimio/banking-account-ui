import { useState } from 'react';
import LoginForm from './components/LoginForm';
import AccountForm from './components/AccountForm';
import BalanceLookup from './components/BalanceLookup';
import TransactionForm from './components/TransactionForm';
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
      <header>
        <h1>Banking Account Service</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>
      <main>
        <AccountForm/>
        <AccountForm />
        <BalanceLookup />
      </main>
    </div>
  );
}

export default App;