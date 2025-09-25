
import items from '../assets/customers.json'
const BASE_URL = 'http://localhost:4000/customers';

export async function getAll() {
  const response = await fetch(BASE_URL);
  return await response.json();
}

export async function get(id) {
  const response = await fetch(`${BASE_URL}/${id}`);
  return await response.json();
}

export async function deleteById(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE'
  });
  if (response.ok) {
    console.log('Customer', id, 'deleted');
  } else {
    console.error('Failed to delete customer', id);
  }
}

export async function post(item) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  });
  if (response.ok) {
    console.log('Post executed');
  } else {
    console.error('Failed to post customer');
  }
}

export async function put(id, item) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  });
  if (response.ok) {
    console.log('Put executed');
  } else {
    console.error('Failed to update customer', id);
  }
}


function getArrayIndexForId(id){
  for( let i = 0; i < items.length; i++){
    if(items[i].id === id){
      return i;
    }
  }
  return -1;  
}


function getNextId(){
  let maxid = 0;
  for( let item of items){
    maxid = (item.id > maxid)?item.id:maxid;
  }  
  return maxid + 1;
}


