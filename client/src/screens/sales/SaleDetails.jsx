import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from 'react'
import { getOneSale } from "../../services/sales"

export default function SaleDetails(props) {
  const { sales, handleSaleDelete } = props
  const { id } = useParams()
  const [sale, setSale] = useState([])


  useEffect(() => {
    const fetchSaleItem = async () => {
      const saleData = await getOneSale(id);
      setSale(saleData);
    };
    fetchSaleItem();
  }, [id]);
  console.log(id)
  console.log(sale)

  return (
    <div className='saledetails-page'>
      <h3>Sale Details</h3>

      <div className='saledetails-img-info'>
        <img src={sale.product?.img} id='saledetails-img' />
        <div className='saledetails-info'>
          <div>Product:{sale.product?.name}</div>
          <div></div>
          <div>Total: {sale.product?.cost + sale.product?.profit}</div>
          <div>Cost: {sale.product?.cost}</div>
          <div>Profit: {sale.product?.profit}</div>
          <div>Margin: {Math.round(sale.product?.profit / (sale.product?.cost + sale.product?.profit) * 100)}%</div>
          <div>Updated: {sale.product?.updated_at}</div>
        </div>
      </div>
      <div className='saledetails-desc'>
        <div>Description: {sale.product?.description}</div>
      </div>
      <div className='saledetails-buttons'>
        <Link to={`/sales/${id}/edit`}><button>Edit</button></Link>
        <button onClick={() => handleSaleDelete(sale?.id)}>Delete</button>
      </div>
    </div>
  )
}
