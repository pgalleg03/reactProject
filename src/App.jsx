import { useState } from 'react'
import './App.css'
import customerList from './assets/customers.json'

// Main App component
function App() {
  const [selectedId, setSelectedId] = useState(null); // Initialize with null

  const handleSelect = (id) => {
    setSelectedId(prevId => (prevId === id ? null : id));
  };

  const isSelected = (id) => {
    return selectedId === id;
  };

  return (
    <div id='main'>
      <Header />
      <Body 
        customers={customerList}
        handleSelect={handleSelect}
        isSelected={isSelected} 
      />
      <AddButton selectedId={selectedId} /> 
    </div>
  );
}

// Header: Renders the app title
function Header() {
  const title = "My React App"
  return <h3>{title}</h3>
}

// Body: Renders the customer list table
function Body({ customers, handleSelect, isSelected }) {
  return (
    <div>
      <h2>Customer List</h2>
      <table style={{ width: "100%", tableLayout: "fixed", borderCollapse: "collapse"}}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr
              key={customer.id}
              onClick={() => handleSelect(customer.id)}
              style={{ fontWeight: isSelected(customer.id) ? 'bold' : 'normal' }}>
              <td>{customer.id}</td>
              <td>{customer.last_name}</td>
              <td>{customer.first_name}</td>
              <td>{customer.email}</td>
              <td>{customer.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Renders the footer
function AddButton({ selectedId }) {
  return (
    <div>
      <button>
        {selectedId !== null ? 'Update' : 'Add'}
      </button>
    </div>
  );
}

export default App;