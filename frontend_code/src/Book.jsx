import "./App.css"

const Book = ({ people, handler }) => {

  if(!Array.isArray(people))
    return <h2>Error getting Contacts</h2>

  else if(people.length===0){
    return (
      <>  
        <h2>You have no contacts :(</h2>
        <h5>add some friends on the left</h5>
      </>
    );
  }

  else{
    return (
      <ul>
        {people.map(contact =>
          <div key={contact.name} className="person">
            <p className="name">{contact.name} <span className="number">{contact.number}</span></p>
            <button onClick={() => handler(contact.id)}><box-icon name='trash'/></button>
          </div>
        )}
      </ul>
    )
  }
}

export default Book