const express = require('express')
const morgan= require('morgan')
const cors= require('cors')
const app = express()

app.use(express.json())
app.use(express.static('dist'))
app.use(morgan('common'))
app.use(cors())

let contacts=[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const date= new Date()
const generateId = () => {
    const min = Math.ceil(1);
    const max = Math.floor(100);
    return Math.floor(Math.random() * (max - min) + min);
}

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1><p>You may be looking for /api/contacts</p>')
})

app.get('/api/contacts', (request, response) => {
    response.json(contacts)
})

app.get('/api/contacts/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = contacts.find(person => person.id === id)
    if (person)
        response.json(person)
    else
        response.status(404).end()
})

app.delete('/api/contacts/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id);
    contacts = contacts.filter(person => person.id !== id)
    console.log(contacts);  
    response.status(204).end()
})

app.post('/api/contacts', (request, response) => {
    const body = request.body
  
    if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: 'name or number not provided' 
      })
    }
    const duplicateContact = contacts.find(person => person.name === body.name || person.number === body.number);
    if (duplicateContact) {
        return response.status(400).json({
            error: 'contact already exists!'
        });
    }
      
    const newPerson = {
      id: generateId(),
      name: body.name,
      number: body.number,
    }
  
    contacts = contacts.concat(newPerson)
  
    response.json(newPerson)
})

app.get('/info', (request, response) => {
    response.send(`<h1>Information</h1> <p>Phonebook has ${contacts.length} contacts</p> <p>${date}</p>`);
})


const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)