import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import customerList from './assets/customers.json'

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

customers.forEach(cutomer =>{
  let tr = document.createElement('tr');
  for(let key in customer){
    let td = document.createElement('td');
    td.textContent = customer[key];
    tr.appendChild(td);
  }
  tbody.appendChild(tr);
})
}

function App() {
  var customer = {
    id: 1,
    first_name: "Gregorio",
    last_name: "Chadbourne",
    email: "gchadbourne0@devhub.com",
    password: "lY7~r+u5{!i\\#skp"

  }
  const [selectedId, setSelectedId] = useState(0);

  // function to handle selection

  const handleSelect = (id) => {
    setSelectedId(id);
  };

  //record selection check funciton
  const isSelected = (id) =>{
    console.log("element selected")
    return selectedId === id;
  };

  return (
    <div id='main' >
      <Header />
      <Body customer={customer}
        handleSelect = {handleSelect}
       onClick = {isSelected} />
      <Footer />
    </div>
  );
}

const title = "My React App"
function Header() {
  return <h3>{title}</h3>


}
function Body(props) {
  return (
    <div>
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
          <tr>
            <td>{props.customer.id}</td>
            <td>{props.customer.last_name}</td>
            <td>{props.customer.first_name}</td>
            <td>{props.customer.email}</td>
            <td>{props.customer.password}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
function Footer() {
  return (<div><h4>App Footer</h4></div>);
}

export default App
