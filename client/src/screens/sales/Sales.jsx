import { Link } from "react-router-dom"


export default function Sales(props) {
  const { sales, products } = props
  console.log(sales)
  return (
    <div>
      <h3>Sales List</h3>
      {sales.map((sale) => (
        <Link to={`/sales/${sale.id}`} key={sale.id}>
          <div>
            <div>Name: {sale.product?.name}</div>
            <div>${sale.product?.cost + sale.product?.profit}</div>
            <div>Buyer: {sale?.buyer}</div>
            <div>${sale?.profit}</div>
            <div>%{Math.round(sale.product?.profit / (sale.product?.cost + sale.product?.profit) * 100)}</div>
          </div>
        </Link>
      ))}
    </div>
  )
}
