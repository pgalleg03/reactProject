import React, { useState } from 'react';
import Modal from './FormPopUp';
import AddCustomerForm from './AddCustomerForm';
import UpdateCustomerForm from './UpdateCustomerForm';

const ActionButton = ({ selectedId, selectedCustomer, setCustomers, customers }) => {
  const [showForm, setShowForm] = useState(false);

  const handleToggleForm = () => {
    setShowForm(prev => !prev);
  };

  const handleDelete = () => {
    if (selectedId !== null) {
      setCustomers(customers.filter(customer => customer.id !== selectedId));
      setShowForm(false);
    }
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
        <Modal onClose={handleToggleForm}>
          {selectedId !== null ? (
            <UpdateCustomerForm
              selectedCustomer={selectedCustomer}
              onCancel={handleToggleForm}
              onSubmit={(formData) => {
                setCustomers(prev => prev.map(customer =>
                  customer.id === selectedId ? { ...customer, ...formData } : customer
                ));
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
      )}
    </div>
  );
};

export default ActionButton;