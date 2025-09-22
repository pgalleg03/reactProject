import { useState, useEffect } from 'react';
import './App.css';
import customerList from './assets/mock_customers.json';

// Main App component
function App() {
  const [selectedId, setSelectedId] = useState(null);
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
      setSelectedId(null);
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
      setSelectedId(null);
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
        selectedId={selectedId}
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

function Footer({ selectedId, currentPage, totalPages, nextPage, previousPage }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '1rem',
      padding: '0 10px'
    }}>
      {/* Empty div on the left to balance the layout */}
      <div style={{ flex: 1 }}></div>

      {/* Pages in the center */}
      <div style={{ flex: 1, textAlign: 'center' }}>
        <button disabled={currentPage === 1} onClick={previousPage}>{'<'}</button>
        <span> {currentPage} of {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={nextPage}>{'>'}</button>
      </div>
      
      {/* Add/Update button on the right */}
      <div style={{ flex: 1, textAlign: 'right' }}>
        <button className="action-button">
          {selectedId !== null ? 'Update' : 'Add'}
        </button>
      </div>
    </div>
  );
}

export default App;
export { Body, ActionButton, AddCustomerForm, UpdateCustomerForm };

