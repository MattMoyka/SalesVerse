import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from 'react'
import { getOneProduct } from "../../services/products"

export default function ProductDetails(props) {
  const { products, handleProductDelete } = props
  const { id } = useParams()
  const [product, setProduct] = useState([])


  useEffect(() => {
    const fetchProductItem = async () => {
      const productData = await getOneProduct(id);
      setProduct(productData);
    };
    fetchProductItem();
  }, [id]);



  return (
    <div>
      <h3>Product Details</h3>

      <div>
        <img src={product.img} />
        <div>
          <div>Product:{product.name}</div>
          <div>Total: {product.cost + product.profit}</div>
          <div>Cost: {product.cost}</div>
          <div>Profit: {product.profit}</div>
          <div>Margin: {Math.round(product.profit / (product.cost + product.profit) * 100)}%</div>
          <div>Updated: {product.updated_at}</div>
        </div>
      </div>
      <div>
        <div>Description: {product.description}</div>
      </div>
      <Link to={`/products/${id}/edit`}><button>Edit</button></Link>
      <button onClick={() => handleProductDelete(product.id)}>Delete</button>
    </div>
  )
}
