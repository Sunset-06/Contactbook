const express = require('express')
const morgan= require('morgan')
const cors= require('cors')
const app = express()
require('dotenv').config()
const Contacts= require('./models/contact')

app.use(express.json())
app.use(express.static('dist'))
app.use(morgan('common'))
app.use(cors())


app.get('/api', (request, response) => {
    response.send('<h1>Hello There!</h1><p>Go to /api/info to see the number of contacts in your phonebook</p><p>Or go to /api/contacts for a json file with all of your contacts</p>')
})

app.get('/api/contacts', (request, response) => {
    Contacts.find({}).then(contact =>{
      response.json(contact)
    })
})

app.get('/api/contacts/:id', (request, response) => {
  Contacts.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.delete('/api/contacts/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id);
    Contacts = Contacts.filter(person => person.id !== id)
    console.log(Contacts);  
    response.status(204).end()
})

app.post('/api/contacts', (request, response) => {
    const body = request.body
  
    if (!body.name===undefined || body.number===undefined) {
      return response.status(400).json({ 
        error: 'proper information missing' 
      })
    }

    /* const duplicateContact = Contacts.find(person => person.name === body.name || person.number === body.number);
    if (duplicateContact) {
        return response.status(400).json({
            error: 'contact already exists!'
        });
    } */
      
    const newPerson = new Contacts({
      name: body.name,
      number: body.number,
    });
  
    newPerson.save().then(savedPerson => {
      response.json(savedPerson)
    })
})

app.get('/api/info', (request, response) => {
    response.send(`<h1>Information</h1> <p>Your Phonebook has ${Contacts.length} contacts</p>`);
})


const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)