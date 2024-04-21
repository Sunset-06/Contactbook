import "./App.css"

const Book = ({ people }) => {

  const handleDelete=()=>{
    console.log("Delete to be added");
  }



  if(people===undefined)
    return <h2>Error getting Contacts</h2>

  else if(people.length===0){
    return (
      <>  
        <h2>You have no contacts</h2>
      </>
    );
  }

  else{
    return (
      <ul>
        {people.map(contact =>
          <div key={contact.name} className="person">
            <p className="name">{contact.name}</p> <p className="number">{contact.number}</p>
          </div>
        )}
      </ul>
    )
  }
}

export default Book