import './component.css'

export default function Search(props) {
  return (
    <form className="search-form" onSubmit={(e) => props.onSubmit(e)}>
      <input

        value={props.value}
        onChange={(e) => props.handleSearch(e)}
        name="Search"
        placeholder="&#xf002; &nbsp;Search" className="fontAwesome-search search-form-input search-input"
        type="text"
        autoFocus
      />
    </form>
  )
}
