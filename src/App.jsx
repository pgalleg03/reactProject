import React, { useState } from 'react';
import CustomerList from './components/CustomerList';
import Login from './components/login';
import './App.css';
import logo from './assets/logo.png'


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-logo-brand">
          <img className='AddLogo' src={logo} alt="logo" />
           <span className="App-logo-name">Lucky 3</span>
           
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
