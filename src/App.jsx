import { useState, useEffect } from 'react';
import './App.css';
import customerList from './assets/customers.json';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
import ActionButton from './components/ActionButton';
import {getAll} from './assets/memdb';

function App() {
  const [selectedId, setSelectedId] = useState(null);
  const [customers, setCustomers] = useState(customerList);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    console.log('customers state updated:', customers);
  }, [customers]);

  const handleSelect = (id) => {
    setSelectedId(prevId => (prevId === id ? null : id));
  };

  const isSelected = (id) => selectedId === id;

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

  console.log(getAll(customerList))

  return (
    <div id='main'>
      <Header />
      <ActionButton
        selectedId={selectedId}
        selectedCustomer={selectedCustomer}
        customers={customers}
        setCustomers={setCustomers}
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

export default App;

