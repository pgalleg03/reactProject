import { useState, useEffect } from 'react';
import './App.css';
import customerList from './assets/mock_customers.json';

// Main App component
function App() {
  const [selectedId, setSelectedId] = useState(null); // Initialize with null
  const [customers, setCustomers] = useState(customerList); // Put customers into state for mutability

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
  const currentCustomers = customers.slice(firstCustomerIndex, lastCustomerIndex);
  const totalPages = Math.ceil(customers.length / customersPerPage);

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

  const selectedCustomer = customers.find(customer => customer.id === selectedId);

  return (
    <div id='main'>
      <Header />
      <ActionButton 
        selectedId={selectedId} 
        selectedCustomer={selectedCustomer} 
        setCustomers={setCustomers} 
        customers={customers} 
      />
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

// Modal component for popup forms
function Modal({ onClose, children }) {
  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          maxWidth: '400px',
          width: '100%',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {children}
      </div>
    </div>
  );
}

// ActionButton: Toggles between showing Add or Update form in a modal
function ActionButton({ selectedId, selectedCustomer, setCustomers, customers }) {
  const [showForm, setShowForm] = useState(false);

  const handleToggleForm = () => {  // toggle visibility
    setShowForm(prev => !prev);
  };

  if (!showForm) {
    return (
      <div>
        <button onClick={handleToggleForm}>
          {selectedId !== null ? 'Update' : 'Add'}
        </button>
      </div>
    );
  }

 return (
    <div>
      <button onClick={handleToggleForm}>
        {selectedId !== null ? 'Update' : 'Add'}
      </button>
      <Modal onClose={handleToggleForm}>
        {selectedId !== null ? (
          <UpdateCustomerForm 
            selectedCustomer={selectedCustomer} 
            onCancel={handleToggleForm} 
            onSubmit={(formData) => {
              setCustomers(prev => prev.map(customer =>
                customer.id === selectedId ? { ...customer, ...formData } : customer
              ));
              console.log("works");
              setShowForm(false);
            }} 
          />
        ) : (
          <AddCustomerForm 
            onCancel={handleToggleForm} 
            onSubmit={(formData) => {
              const newId = customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1;
              const newCustomer = {
                id: newId,
                last_name: formData.last_name,
                first_name: formData.first_name,
                email: formData.email,
                password: formData.password,
              };
              setCustomers(prev => [...prev, newCustomer]);
              setShowForm(false);
            }} 
          />
        )}
      </Modal>
    </div>
  );
}

// AddCustomerForm: Form to add a new customer
function AddCustomerForm({ onCancel, onSubmit }) {
  const [formData, setFormData] = useState({
    last_name: '',
    first_name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    if (!formData.last_name || !formData.first_name || !formData.email || !formData.password) {
      alert('All fields are required');
      return;
    }
    onSubmit(formData);
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
        <button onClick={handleSubmit}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

// UpdateCustomerForm: Form to update customer details
function UpdateCustomerForm({ selectedCustomer, onCancel, onSubmit }) {
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

  const handleSubmit = () => {
    if (!formData.last_name || !formData.first_name || !formData.email || !formData.password) {
      alert('All fields are required');
      return;
    }
    onSubmit(formData);
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
        <button onClick={handleSubmit}>Save</button>
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

