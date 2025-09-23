import React, { useState } from 'react';
import Modal from './FormPopUp';
import AddCustomerForm from './AddCustomerForm';
import UpdateCustomerForm from './UpdateCustomerForm';

const ActionButton = ({ selectedId, selectedCustomer, onUpdate, onAdd, onDelete }) => {
  const [showForm, setShowForm] = useState(false);

  const handleToggleForm = () => {
    setShowForm(prev => !prev);
  };

  const handleDelete = () => {
    if (selectedId !== null) {
      onDelete(selectedId);
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
          {selectedId !== null ? (
            <UpdateCustomerForm
              selectedCustomer={selectedCustomer}
              onCancel={handleToggleForm}
              onSubmit={(formData) => {
                onUpdate(selectedId, formData);
                setShowForm(false);
              }}
            />
          ) : (
            <AddCustomerForm
              onCancel={handleToggleForm}
              onSubmit={(formData) => {
                onAdd(formData);
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