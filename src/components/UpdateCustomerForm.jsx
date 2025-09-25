import React, { useState, useEffect } from 'react';

const UpdateCustomerForm = ({ selectedCustomer, onCancel, onSubmit }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (selectedCustomer) {
      setFormData(selectedCustomer);
    }
  }, [selectedCustomer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div >
      <form onSubmit={handleSubmit} style={{ boxShadow: 'none' }}>
        <h2>Update Customer</h2>

        <div>
          <label htmlFor="first_name">First Name:</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="last_name" >Last Name:</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="email">Email:</label>
          <input
            style={{ padding: '8px', borderRadius: '5', width: '90%' }}
            type="email"
            id="email"
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit">Save Changes</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCustomerForm;