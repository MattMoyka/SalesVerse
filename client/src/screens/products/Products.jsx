import { Link } from "react-router-dom"
import './products.css'


export default function Products(props) {
  const { products } = props


  return (
    <div className="product-page">
      <div className="product-list-header">
        <h3>Product List</h3>
        <Link to='/products/create' id='product-link'>Add Product</Link>
      </div>
      <div className='product-containers-title'>

        <div>Name</div>
        <div>Total</div>
        <div>Cost</div>
        <div>Profit</div>
        <div>Margin</div>
        <div>Updated</div>

      </div>
      <div className='product-list-container'>
        {products.map((product) => (
          <Link to={`/products/${product.id}`} className='product-containers' id='product-link' key={product.id}>
            {/* <div className='product-containers'> */}
            <div>{product.name}</div>
            <div>${product.cost + product.profit}</div>
            <div>${product.cost}</div>
            <div>${product.profit}</div>
            <div>{Math.round(product.profit / (product.cost + product.profit) * 100)}%</div>
            <div>{product.updated_at}</div>
            {/* </div> */}
          </Link>
        ))}</div>
    </div>
  )
}

