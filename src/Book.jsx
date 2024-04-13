import back from "./back.js"

const Book = ({ people }) => {

  const handleDelete=()=>{
    
  }

  return (
    <ul>
      {people.map(contact =>
        <p key={contact.name}>
          {contact.name} {contact.number} <button onClick={handleDelete}>delete</button>
        </p>
      )}
    </ul>
  )
}

export default Book