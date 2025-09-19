import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
//import customerList from './assets/customers.json'

function App() {
  var customer = {
      id: 1,
      first_name: "Gregorio",
      last_name: "Chadbourne",
      email: "gchadbourne0@devhub.com",
      password: "lY7~r+u5{!i\\#skp"

  }
  return (
    <div id='main' >
      <Header />
      <Body customer = {customer} />
      <Footer />
    </div>
  );
}
const title = "My React App"
function Header() {
  return <h3>{title}</h3>
}
function Body(props) {
  return (<div>
    <p>Customer List:</p>
    <p>Customer: {props.customer.first_name}</p>
    </div>);
}
function Footer() {
  return (<div><h4>App Footer</h4></div>);
}

export default App
