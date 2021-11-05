import { Link } from "react-router-dom"
import './Sales.css'

export default function Sales(props) {
  const { sales, products } = props
  console.log(sales)
  return (
    <div className="sale-page">
      <div className="sale-list-header">
        <h3 className='sale-list-title'>Sales List</h3>
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
        {sales.map((sale) => (
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
