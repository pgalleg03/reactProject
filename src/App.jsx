import { useState } from 'react';
import './App.css';
import customerList from './assets/customers.json';

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
      <ActionButton selectedId={selectedId} />
    </div>
  );
}

// Header: Renders the app title
function Header() {
  const title = "My React App";
  return <h3>{title}</h3>;
}

// Body: Renders the customer list table
function Body({ customers, handleSelect, isSelected }) {
  return (
    <div>
      <h2>Customer List</h2>
      <table style={{ width: "100%", tableLayout: "fixed", borderCollapse: "collapse" }}>
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
              style={{ fontWeight: isSelected(customer.id) ? 'bold' : 'normal' }}
            >
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

// ActionButton: Toggles between showing Add or Update form
function ActionButton({ selectedId, customers, setCustomers }) {
  const [showForm, setShowForm] = useState(false);

  const handleToggleForm = () => {  //toggle visability
    setShowForm(prev => !prev);
  };
 // delete action
  const handleDelete = () => {
    if (selectedId !== null) {
      setCustomers(customers.filter(customer => customer.id !== selectedId));
      setShowForm(false); // Hide form after deletion
    }
  };
  // save action
  const handleSave = () => {
    // Placeholder for save logic; could trigger form submission or save changes
    console.log("Save button clicked");
  };


 return (
    <div>
      <button onClick={handleToggleForm}>
        {selectedId !== null ? 'Update' : 'Add'}
      </button>
      <button onClick={handleDelete} disabled={selectedId === null}>
        Delete
      </button>
      {showForm && (
        <div>
          {selectedId !== null ? (
            <UpdateCustomerForm onCancel={handleToggleForm} />
          ) : (
            <AddCustomerForm onCancel={handleToggleForm} />
          )}
          <div style={{ marginTop: '10px' }}>
            <button onClick={handleSave} style={{ marginRight: '10px' }}>
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// AddCustomerForm: Form to add a new customer
function AddCustomerForm({ onCancel }) {
  return (
    <div>
      <h2>Add New Customer</h2>
      <div>
        <label>
          Last Name:
          <input type="text" name="customer.last_name" required />
        </label>
        <br />
        <label>
          First Name:
          <input type="text" name="customer.first_name" required />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="customer.email" required />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="customer.password" required />
        </label>
        <br />
        <button>Add Customer</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

// UpdateCustomerForm: Form to update customer email and password
function UpdateCustomerForm({ onCancel }) {
  return (
    <div>
      <h2>Update Customer</h2>
      <div>
        <label>
          {/* //we can change this. dont HAVE to change email */}
          New Email:
          <input type="email" name="email" required /> 
        </label>
        <br />
        <label>
          New Password:
          <input type="password" name="password" required />
        </label>
        <br />
        <button>Update</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default App;
export { Body, ActionButton, AddCustomerForm, UpdateCustomerForm };
