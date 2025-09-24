import React, { useState } from 'react';
import CustomerList from './components/CustomerList';
import Login from './components/login';
import './App.css';
import AddLogo from './components/AddLogo';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      <AddLogo />
      <header className="App-header">
        <h1>Customer Management System</h1>
      </header>
      <main>
        {!isLoggedIn ? (
          <Login onLogin={handleLogin} />
        ) : (
          <CustomerList />
        )}
      </main>
    </div>
  );
};

export default App;
