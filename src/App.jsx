import React from 'react';
import CustomerList from './components/CustomerList';
import './App.css'; 

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Customer Management System</h1>
      </header>
      <main>
        <CustomerList />
      </main>
    </div>
  );
}
export default App;


