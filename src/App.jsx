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
      <header className="App-header">
        <div className="App-logo-brand">
           <AddLogo />
           <span className="App-logo-name">Lucky 3</span>
        </div>
        <div className="App-title-container">
          <h1>Customer Management System</h1>
        </div>
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
