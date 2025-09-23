import React, { useState } from 'react';
import Modal from './FormPopUp';
import AddCustomerForm from './AddCustomerForm';
import UpdateCustomerForm from './UpdateCustomerForm';
import { get, getAll, put, post, deleteById } from '../assets/memdb';

const ActionButton = ({ selectedId, selectedCustomer, setCustomers, customers }) => {
  const [showForm, setShowForm] = useState(false);

  const handleToggleForm = () => {
    setShowForm(prev => !prev);
  };

  const handleDelete = () => {
    if (selectedId !== null) {
      deleteById(selectedId);
      setCustomers(customers.filter(customer => customer.id !== selectedId));
      setShowForm(false);
    }
  };

  return (
    <div>
      <button onClick={handleToggleForm}>
        {selectedId !== null ? 'Update' : 'Add'}
      </button>
      {selectedId !== null && (
       <button onClick={handleDelete} disabled={selectedId === null}>
        Delete
      </button>
      )}
      {showForm && (
        <Modal onClose={handleToggleForm}>
          {selectedId !== null && selectedCustomer ? (
          <UpdateCustomerForm
            selectedCustomer={selectedCustomer}
            onCancel={handleToggleForm}
            onSubmit={(formData) => {
              put(formData);
              setCustomers(prev =>
                prev.map(customer =>
                  customer.id === formData.id ? { ...customer, ...formData } : customer
                )
              );
            }}
          />
        ) : (
          <AddCustomerForm
            onCancel={handleToggleForm}
            onSubmit={(formData) => {
              const newCustomer = post(formData);
              setCustomers(prev => [...prev, newCustomer]);
              setShowForm(false);
            }}
          />
        )}
        </Modal>
      )}
    </div>
  );
};

export default ActionButton;