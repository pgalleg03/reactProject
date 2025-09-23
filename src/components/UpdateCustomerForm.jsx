import React, { useState, useEffect } from 'react';

const UpdateCustomerForm = ({ selectedCustomer, onCancel, onSubmit }) => {
  const [formData, setFormData] = useState({
    last_name: '', first_name: '', email: '', password: '',
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
        <label>Last Name:<input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required /></label><br />
        <label>First Name:<input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required /></label><br />
        <label>Email:<input type="email" name="email" value={formData.email} onChange={handleChange} required /></label><br />
        <label>Password:<input type="password" name="password" value={formData.password} onChange={handleChange} required /></label><br />
        <button onClick={handleSubmit}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default UpdateCustomerForm;