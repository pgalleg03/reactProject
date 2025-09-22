import { useState, useEffect } from 'react';
import './App.css';
import customerList from './assets/mock_customers.json';

// Main App component
function App() {
  const [selectedId, setSelectedId] = useState(null); // Initialize with null

  const handleSelect = (id) => {
    setSelectedId(prevId => (prevId === id ? null : id));
  };

  const isSelected = (id) => {
    return selectedId === id;
  };

  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 10;
  const lastCustomerIndex = currentPage * customersPerPage;
  const firstCustomerIndex = lastCustomerIndex - customersPerPage;
  const currentCustomers = customerList.slice(firstCustomerIndex, lastCustomerIndex);
  const totalPages = Math.ceil(customerList.length / customersPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const selectedCustomer = customerList.find(customer => customer.id === selectedId);

  return (
    <div id='main'>
      <Header />
      <ActionButton selectedId={selectedId} selectedCustomer={selectedCustomer} />
      <Body 
        customers={currentCustomers}
        handleSelect={handleSelect}
        isSelected={isSelected} 
      />
      <Footer 
        currentPage={currentPage}
        totalPages={totalPages}
        nextPage={nextPage}
        previousPage={previousPage}
      />
    </div>
  );
}

// Header: Renders the app title
function Header() {
  const title = "Customer List";
  return <h3>{title}</h3>;
}

// Body: Renders the customer list table
function Body({ customers, handleSelect, isSelected }) {
  return (
    <div>
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

function ActionButton({ selectedId, customers, setCustomers, selectedCustomer }) {
  const [showForm, setShowForm] = useState(false);

  const handleToggleForm = () => {  // toggle visibility
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
            <UpdateCustomerForm selectedCustomer={selectedCustomer} onCancel={handleToggleForm} />
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
  const [formData, setFormData] = useState({
    last_name: '',
    first_name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div>
      <h2>Add New Customer</h2>
      <div>
        <label>
          Last Name:
          <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
        </label>
        <br />
        <label>
          First Name:
          <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </label>
        <br />
        <button>Add Customer</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

// UpdateCustomerForm: Form to update customer details
function UpdateCustomerForm({ selectedCustomer, onCancel }) {
  const [formData, setFormData] = useState({
    last_name: '',
    first_name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (selectedCustomer) {
      setFormData({
        last_name: selectedCustomer.last_name,
        first_name: selectedCustomer.first_name,
        email: selectedCustomer.email,
        password: selectedCustomer.password,
      });
    }
  }, [selectedCustomer]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (!selectedCustomer) return null;

  return (
    <div>
      <h2>Update Customer</h2>
      <div>
        <label>
          Last Name:
          <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
        </label>
        <br />
        <label>
          First Name:
          <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </label>
        <br />
        <button>Update</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

// Footer: Pagination controls
function Footer({ currentPage, totalPages, nextPage, previousPage }) {
  return (
    <div>
      <div>
        <button disabled={currentPage === 1} onClick={previousPage}>{'<'}</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={nextPage}>{'>'}</button>
      </div>
    </div>
  );
}

export default App;
export { Body, ActionButton, AddCustomerForm, UpdateCustomerForm };

