const Form = ({ handler }) => {
    return(
      <form onSubmit={handler}>
        <div>
          name: <input name="name" />
          <div>number: <input name="number" /></div>
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
    )
}

export default Form