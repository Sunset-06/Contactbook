import { useState, useEffect } from 'react';

import Book from "./Book.jsx";
import Form from "./Form.jsx";
import "./App.css";
import back from "./back.js";

const App = () => {
  const [search, setSearch] = useState("");
  const [persons, setPersons] = useState([]); 

  useEffect(() => {
    back
      .getContacts()
      .then(response => {
        setPersons(response.data);
      })
      .catch(error => {
        console.error("Error fetching contacts:", error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = event.target.name.value;

    if (!name || !number) {
      alert('Both name and number are required');
      return;
    }
    const contactExists = persons.some(person => person.name === name);
    if (contactExists) {
      alert(`${name} is already in your contacts`);
    } else {
      addContact(event);
    }
  }

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete this contact?`)) {
      delContact(id);
    }
  }

  const addContact = (event) => {
    event.preventDefault();
    const inputName = event.target.name.value;
    const inputNumber = event.target.number.value;
    const newContact = {
      name: inputName,
      number: inputNumber
    };
    back
      .newContact(newContact)
      .then(response => {
        setPersons([...persons, response.data]);
      })
  }

  const delContact = (delId) => {
    back
      .deleteContact(delId)
      .then(() => {
        setPersons(persons.filter(person => person.id !== delId));
      })
  }

  const filteredContacts = search.length === 0 ? persons : persons.filter(person => 
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='main'>
      <div className='header'>
        <h1>Phonebook</h1>
      </div>
      <div className='add'>
        <h2>Add New</h2>
        <Form handler={handleSubmit} />
      </div>
      <div className='socials'>
        <h2>Socials</h2>
        <div className='iconbox'>
          <a href='https://github.com/Sunset-06'><box-icon type='logo' name='github' size="lg" /></a>
          <a href='https://www.instagram.com/nilsy_05/'><box-icon name='instagram' type='logo' size="lg" /></a>
          <a href='https://www.linkedin.com/in/nilay06'><box-icon name='linkedin' type='logo' size="lg" /></a>
        </div>
      </div>
      <div className='search'>
        <form>
          <input type="text" name="search" placeholder='Search for a contact' onChange={(e) => setSearch(e.target.value)} />
        </form>
      </div>
      <div className='contacts'>
        <Book people={filteredContacts} handler={handleDelete} />
      </div>
    </div>
  );
}

export default App;
