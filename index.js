const express = require('express')
const morgan= require('morgan')
const cors= require('cors')
const app = express()
require('dotenv').config()
const Contact= require('./models/contact')

app.use(express.json())
app.use(express.static('dist'))
app.use(morgan('common'))
app.use(cors())


app.get('/api', (request, response) => {
    response.send('<h1>Hello There!</h1><p>Go to /api/contacts for a json file with all of your contacts</p>')
})

app.get('/api/contacts', (request, response) => {
    Contact.find({}).then(contact =>{
      response.json(contact)
    })
})

app.get('/api/contacts/:id', (request, response) => {
  Contact.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.delete('/api/contacts/:id', (request, response) => {
    const id = request.params.id;
    console.log(id);
    Contact.findByIdAndDelete(id)
    .then(result =>{
      if (result){
        console.log("deleted successfully");
        response.status(204).end();
      }
      else{
        response.status(404).json({ error: 'contact not found' });
      }
    })
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
      
    const newPerson = new Contact({
      name: body.name,
      number: body.number,
    });
  
    newPerson.save().then(savedPerson => {
      response.json(savedPerson)
    })
})


const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)