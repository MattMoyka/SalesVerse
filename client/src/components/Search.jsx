import './component.css'


export default function Search(props) {
  return (
    <form className="search-form" onSubmit={(e) => props.onSubmit(e)}>
      <input
        className='search-form-input'
        value={props.value}
        onChange={(e) => props.handleSearch(e)}
        name="Search"
        placeholder="&#xf002; &nbsp;Search Product" className="fontAwesome-search search-input"
        type="text"
        autoFocus
      />
    </form>
  )
}
