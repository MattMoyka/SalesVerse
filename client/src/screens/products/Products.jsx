import { Link } from "react-router-dom"
import './products.css'
import { DateTime } from "luxon"
import { useState, useEffect } from "react"
import { AZ, ZA, lowestFirst, highestFirst, lowestCostFirst, highestCostFirst } from "../../utils/sort"
import Search from "../../components/Search"
import Sort from "../../components/Sort"

export default function Products(props) {
  const { products } = props
  const [applySort, setApplySort] = useState(false);
  const [sortType, setSortType] = useState("name-ascending");
  const [searchResult, setSearchResult] = useState([]);

  const handleSort = (type) => {
    if (type !== "" && type !== undefined) {
      setSortType(type);
    }
    switch (type) {
      case "name-ascending":
        setSearchResult(AZ(searchResult));
        break;
      case "name-descending":
        setSearchResult(ZA(searchResult));
        break;
      case "price-ascending":
        setSearchResult(lowestFirst(searchResult));
        break;
      case "price-descending":
        setSearchResult(highestFirst(searchResult));
        break;
      case "cost-ascending":
        setSearchResult(lowestCostFirst(searchResult));
        break;
      case "cost-descending":
        setSearchResult(highestCostFirst(searchResult));
        break;
      default:
        break;
    }
  };

  if (applySort) {
    handleSort(sortType);
    setApplySort(false);
  }



  const handleSearch = (event) => {
    let results;
    if (event.target.value !== []) {
      results = products.filter((product) =>
        product.name.toLowerCase().includes(event.target.value.toLowerCase())
      );
    } else {
      results = [...products]
    }
    setSearchResult(results);
    setApplySort(true);
  };

  const handleSubmit = (event) => event.preventDefault();

  return (
    <div className="product-page">
      <div className="product-list-header">
        <h3 className='product-list-title'>Product List</h3>
        <Link to='/products/create' id='product-link'>Add Product</Link>
      </div>
      <Search onSubmit={handleSubmit} handleSearch={handleSearch} />
      <Sort onSubmit={handleSubmit} handleSort={handleSort} />
      <div className='product-containers-title'>

        <div>Name</div>
        <div>Total</div>
        <div>Cost</div>
        <div>Profit</div>
        <div>Margin</div>
        <div>Updated</div>

      </div>
      <div className='product-list-container'>
        {searchResult.map((product) => (
          <Link to={`/products/${product.id}`} className='product-containers' id='product-link' key={product.id}>

            <div>{product?.name}</div>
            <div>${product?.cost + product?.profit}</div>
            <div>${product?.cost}</div>
            <div>${product?.profit}</div>
            <div>{Math.round(product?.profit / (product?.cost + product?.profit) * 100)}%</div>
            <div>{DateTime.fromISO(product?.updated_at).toFormat('D')}</div>

          </Link>
        ))}</div>
    </div>
  )
}

