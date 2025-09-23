import React, { useState, useEffect } from 'react';
import ActionButton from './ActionButton';
import Footer from './Footer';
import './CustomerTable.css';
import { getAll, get, deleteById, post, put } from '../assets/memdb';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const [dataChangeTrigger, setDataChangeTrigger] = useState(0);

    useEffect(() => {
        setCustomers(getAll());
    }, [dataChangeTrigger]); 


    useEffect(() => {
        if (selectedId !== null) {
            setSelectedCustomer(get(selectedId));
        } else {
            setSelectedCustomer(null);
        }
    }, [selectedId]);

    const handleRowClick = (id) => {
        setSelectedId(id === selectedId ? null : id);
    };

    const handleUpdate = (id, formData) => {
        put(id, formData);
        setDataChangeTrigger(prev => prev + 1); 
        setSelectedId(null);
    };

    const handleAdd = (formData) => {
        post(formData);
        setDataChangeTrigger(prev => prev + 1); 
        setSelectedId(null);
    };

    const handleDelete = (id) => {
        deleteById(id);
        setDataChangeTrigger(prev => prev + 1); 
        setSelectedId(null);
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
        }
    };

    const previousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
            setSelectedId(null);
        }
    };

    return (
        <div>
            <h1>Customer List</h1>
            <table>
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
                    {currentCustomers.map(customer => (
                        <tr
                            key={customer.id}
                            onClick={() => handleRowClick(customer.id)}
                            style={{
                                fontWeight: selectedId === customer.id ? 'bold' : 'normal',
                                cursor: 'pointer'
                            }}
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
            <ActionButton
                selectedId={selectedId}
                selectedCustomer={selectedCustomer}
                onUpdate={handleUpdate}
                onAdd={handleAdd}
                onDelete={handleDelete}
            />
            <Footer
                currentPage={currentPage}
                totalPages={totalPages}
                nextPage={nextPage}
                previousPage={previousPage}
            />
        </div>
    );
};

export default CustomerList;