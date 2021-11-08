import { Link } from "react-router-dom"
import './Sales.css'
import { useState, useEffect } from "react"
import { AZ, ZA, lowestFirst, highestFirst } from "../../utils/sortsale"
import Search from "../../components/Search"
import Sort from "../../components/Sort"

export default function Sales(props) {
  const { sales, products, toggle1 } = props


  const [applySort, setApplySort] = useState(false);
  const [sortType, setSortType] = useState("name-ascending");
  const [searchResult, setSearchResult] = useState([]);

  const handleSort = (type) => {
    if (type !== "" && type !== undefined) {
      setSortType(type);
    }
    switch (type) {
      case "buyer-ascending":
        setSearchResult(AZ(searchResult));
        break;
      case "buyer-descending":
        setSearchResult(ZA(searchResult));
        break;
      case "price-ascending":
        setSearchResult(lowestFirst(searchResult));
        break;
      case "price-descending":
        setSearchResult(highestFirst(searchResult));
        break;

      default:
        break;
    }
  };

  if (applySort) {
    handleSort(sortType);
    setApplySort(false);
  }

  useEffect(() => {
    setSearchResult(sales)
  }, [sales])


  const handleSearch = (event) => {
    let results;
    if (event.target.value !== []) {
      results = sales.filter((sale) =>
        sale.buyer.toLowerCase().includes(event.target.value.toLowerCase())
      );
    } else {
      results = [...products]
    }
    setSearchResult(results);
    setApplySort(true);
  };

  const handleSubmit = (event) => event.preventDefault();
  return (
    <div className="sale-page">
      <div className="sale-list-header">
        <h3 className='sale-list-title'>Sales List</h3>

      </div>
      <div className='sale-utils'>
        <Search onSubmit={handleSubmit} handleSearch={handleSearch} />
        <Sort onSubmit={handleSubmit} handleSort={handleSort} />
      </div>
      <div className='sale-containers-title'>

        <div>Name</div>
        <div>Total</div>
        <div>Buyer</div>
        <div>Profit</div>
        <div>Margin</div>
        <div>Sold</div>

      </div>
      <div className='sale-list-container'>
        {searchResult.map((sale) => (
          <Link to={`/sales/${sale.id}`} className='sale-containers' id='sale-link' key={sale.id}>

            <div>{sale.product?.name}</div>
            <div>${sale.product?.cost + sale.product?.profit}</div>
            <div>{sale?.buyer}</div>
            <div>${sale.product?.profit}</div>
            <div>%{Math.round(sale.product?.profit / (sale.product?.cost + sale.product?.profit) * 100)}</div>
            <div>{sale?.sold_date}</div>

          </Link>
        ))}</div>
    </div>
  )
}
