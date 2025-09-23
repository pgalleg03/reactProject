import React, { useState } from 'react';
import {post,put } from '../assets/memdb.js';

const AddCustomerForm = ({ onCancel, onSubmit }) => {
  const [formData, setFormData] = useState({
    last_name: '', first_name: '', email: '', password: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    put(formData);
  };

  const handleSubmit = () => {
    if (!formData.last_name || !formData.first_name || !formData.email || !formData.password) {
      alert('All fields are required');
      
      return;
    }
    post(formData);
    //needs to trigger the useEffect
    onSubmit(formData);
  };

  return (
    <div>
      <h2>Add New Customer</h2>
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

export default AddCustomerForm;