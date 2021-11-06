
const Sort = (props) => {

  const handleSort = (event) => {
    props.handleSort(event.target.value)
  }

  return (
    <form className="sort-container" onSubmit={props.handleSubmit}>
      <label className="sort-label" htmlFor="sort">SORT BY:</label>
      <select className="sort-select" onChange={handleSort}>
        <option className="option"
          value="name-ascending" >&nbsp; Alphabetically, A-Z &nbsp;</option>
        <option value="name-descending">&nbsp; Alphabetically, Z-A &nbsp;</option>
        <option value="price-ascending">&nbsp; Profit, low to high &nbsp;</option>
        <option value="price-descending">&nbsp; Profit, high to low &nbsp;</option>
        <option value="cost-ascending">&nbsp; Cost, low to high &nbsp;</option>
        <option value="cost-descending">&nbsp; Cost, high to low &nbsp;</option>
      </select>
    </form>
  )
}

export default Sort
