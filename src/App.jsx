import { useState,useEffect } from 'react'

import Book from "./Book.jsx"
import Form from "./Form.jsx"
//import Filter from "./Filter.jsx"
import back from "./back.js"

const App = () => {
  const [search, setSearch] = useState("")
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 

  useEffect(() => {
   back 
      .getContacts()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleSubmit = (event) => {
    const name = event.target.name.value;
    const contactExists = persons.some(person => person.name === name);
    if (contactExists) {
        event.preventDefault()
        alert(`${name} is already in your contacts`);
    }
    else 
      addContact(event);
}


  const addContact = (event) => {
    event.preventDefault();
    const inputName=event.target.name.value;
    const inputNumber=event.target.number.value;
    const newContact = {
        name: inputName,
        number: inputNumber
    }
    console.log(newContact)
    back
      .newContact(newContact)
      .then(response => {
        setPersons(response.data)
      })
  }

  const filteredContacts = search.length=== 0 ? persons: persons.filter(person =>                         
   person.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
            <form>
                Search: <input type="text" name="search"  onChange={(e) => setSearch(e.target.value)} />
            </form>
        </div>
      <h2>Add New</h2>
        <Form handler={handleSubmit} />
      <h2>Numbers</h2>
        <Book people={filteredContacts} />
    </div>
  )
}

export default App