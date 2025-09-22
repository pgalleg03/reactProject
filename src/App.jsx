
import { useState } from 'react'
import './App.css'
import customerList from './assets/mock_customers.json'

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
  // last customer of the current page = page# * 10
  // i.e., last customer of page 3 is index (3*10)= 30
  const lastCustomerIndex = currentPage * customersPerPage;
  // fist customer of current page = lastcustomer - 10
  const firstCustomerIndex = lastCustomerIndex - customersPerPage;
  const currentCustomers = customerList.slice(firstCustomerIndex, lastCustomerIndex);
  const totalPages = Math.ceil(customerList.length / customersPerPage);

  const nextPage = () => {
    if (currentPage < Math.ceil(customerList.length / customersPerPage)){
        setCurrentPage(prevPage => prevPage + 1);
    }
  }

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  }

  return (
    <div id='main'>
      <Header />
      <AddButton selectedId={selectedId} /> 
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

  const title = "Customer List"
  return <h3>{title}</h3>

}

// Body: Renders the customer list table
function Body({ customers, handleSelect, isSelected }) {
  return (
    <div>

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
function ActionButton({ selectedId }) {
  const [showForm, setShowForm] = useState(false);

  const handleToggleForm = () => {  //toggle visability
    setShowForm(prev => !prev);
  };

  return (
    <div>
      <button onClick={handleToggleForm}>
        {selectedId !== null ? 'Update' : 'Add'}
      </button>
      {showForm && (
        selectedId !== null ? (
          <UpdateCustomerForm onCancel={handleToggleForm} />
        ) : (
          <AddCustomerForm onCancel={handleToggleForm} />
        )
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
          <input type="email" name="email" required />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" required />
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

function Footer({ selectedId, currentPage, totalPages, nextPage, previousPage }) {
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
export { AddCustomerForm, UpdateCustomerForm };

