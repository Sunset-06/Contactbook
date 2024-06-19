const contactRouter = require('express').Router()
const Contact= require('../models/contact')

contactRouter.get("/", (request, response) => {
    Contact.find({}).then(contact =>{
      response.json(contact)
    })
})

contactRouter.get("/:id", (request, response, next) => {
    Contact.findById(request.params.id).then(person => {
      if(person)
        response.json(person)
      else
        response.status(404).end()
    })
    .catch(error => next(error))
  })

contactRouter.post("/", (request, response, next) => {
    const body = request.body
  
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
    .catch(error => next(error))
})

contactRouter.delete("/:id", (request, response) => {
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

/* notesRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
}) */

module.exports = contactRouter