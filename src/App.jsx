import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import customerList from './assets/customers.json'
/*
function updateTable(customer){

  let table = document.createElement('table');
  let thead = document.createElement('thead');
  let tbody = document.createElement('tbody');

  let headers= Object.keys(customers[0]);
  let tr = document.createElement('tr');

for (let i = 0; i< headers.length; i++){
  let th = document.createElement('th');
  th.textContent = headers[i];
  tr.appendChild(th);
}

thead.appendChild(tr);
table.appendChild(thead);

customers.forEach(customer =>{
  let tr = document.createElement('tr');
  for(let key in customer){
    let td = document.createElement('td');
    td.textContent = customer[key];
    tr.appendChild(td);
  }
  tbody.appendChild(tr);
})
}*/


// Main App component
function App() {
  const [selectedId, setSelectedId] = useState(0);

  const handleSelect = (id) => {
    setSelectedId(prevId => (prevId === id ? null : id));
  };

  const isSelected = (id) =>{
    console.log('element selected')
    return selectedId === id;
  };

  return (
    <div id='main' >
      <Header />
      <Body customers={customerList}
        handleSelect = {handleSelect}
       isSelected = {isSelected} />
      <Footer />
    </div>
  );
}

// Header: Renders the app title
function Header() {
  const title = "My React App"
  return <h3>{title}</h3>
}

// Body: Renders the customer list table
function Body({ customers, handleSelect, isSelected }) {
  return (
    <div>
      <h2>Customer List</h2>
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
              <td>{customer.first_name}</td>
              <td>{customer.last_name}</td>
              <td>{customer.email}</td>
              <td>{customer.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Renders the footer
function Footer() {
  return (
  <div>
    <h4>App Footer</h4>
  </div>);
}

export default App;
