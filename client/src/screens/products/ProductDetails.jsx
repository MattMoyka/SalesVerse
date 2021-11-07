import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from 'react'
import { getOneProduct } from "../../services/products"
import { DateTime } from "luxon"

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
    <div className='proddetails-page'>
      <h3 className='saledetails-title'>Product Details</h3>

      <div className='proddetails-img-info'>
        <img src={product.img} id='proddetails-img' />
        <div className='proddetails-info'>
          <div>Product:{product.name}</div>
          <div>Total: {product.cost + product.profit}</div>
          <div>Cost: {product.cost}</div>
          <div>Profit: {product.profit}</div>
          <div>Margin: {Math.round(product.profit / (product.cost + product.profit) * 100)}%</div>
          {/* <div>Updated: {DateTime.fromISO(product?.updated_at).c?.month}/{DateTime.fromISO(product?.updated_at).c?.day}/{DateTime.fromISO(product?.updated_at).c?.year}</div> */}
          <div>Updated: {DateTime.fromISO(product?.updated_at).toFormat('D')}</div>
        </div>
      </div>
      <div className='proddetails-desc'>
        <div>Description: {product.description}</div>
      </div>
      <div className='proddetails-buttons'>
        <Link to={`/products/${id}/edit`}><button>Edit</button></Link>
        <Link to={`/products/${id}/sales`}><button>Sell</button></Link>
        <button onClick={() => handleProductDelete(product.id)}>Delete</button>
      </div>
    </div>
  )
}
