import { Link } from "react-router-dom"



export default function Products(props) {
  const { products, handleProductDelete } = props


  return (
    <div>
      <h3>Product List</h3>
      <Link to='/products/create'>Add Product</Link>
      {products.map((product) => (
        <div key={product.id}>
          <div>{product.name}</div>
          <div>${product.cost + product.profit}</div>
          <div>${product.cost}</div>
          <div>${product.profit}</div>
          <div>{Math.round(product.profit / (product.cost + product.profit) * 100)}%</div>
          <div>{product.updated_at}</div>
        </div>
      ))}
    </div>
  )
}

