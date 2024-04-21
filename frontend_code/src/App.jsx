import { useState,useEffect } from 'react'

import Book from "./Book.jsx"
import Form from "./Form.jsx"
import "./App.css"
import back from "./back.js"

const App = () => {
  const [search, setSearch] = useState("")
  const [persons, setPersons] = useState([]) 

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
        setPersons([...persons, response.data]);
      })
  }

  const filteredContacts = search.length=== 0 ? persons: persons.filter(person =>                         
   person.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <>
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
          </div>     

          <div className='search'>
            <form>
                <input type="text" name="search" placeholder='Search for a contact' onChange={(e) => setSearch(e.target.value)} />
            </form>
          </div>
          <div className='contacts'>
            <Book people={filteredContacts} />
          </div>
        </div>
    </>
  )
}

export default App