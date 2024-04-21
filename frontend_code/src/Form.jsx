const Form = ({ handler }) => {
    return(
      <form onSubmit={handler}>
        <div>
          <input name="name" placeholder="Name" />
          <div><input name="number" placeholder="Number" /></div>
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
    )
}

export default Form