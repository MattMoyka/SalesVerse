import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from 'react'
import { getOneSale } from "../../services/sales"
import { Button } from "@mui/material"

export default function SaleDetails(props) {
  const { handleSaleDelete } = props
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
      <h3 className='saledetails-title'>Sale Details for {sale?.buyer}</h3>

      <div className='saledetails-img-info'>

        <div className='saledetails-info'>
          <div id='sale-detail-name'>{sale.product?.name}</div>
          <div id='sale-detail-total'>${sale.product?.cost + sale.product?.profit}</div>
          <div id='sale-details-cp'>
            <div>Cost: ${sale.product?.cost}</div>
            <div>Profit: ${sale.product?.profit}</div>
          </div>
          <div>Margin: {Math.round(sale.product?.profit / (sale.product?.cost + sale.product?.profit) * 100)}%</div>
          <div>Sold On: {sale?.sold_date}</div>
        </div>
        <img src={sale.product?.img} id='saledetails-img' alt={sale.product?.name} />
      </div>
      <div className='saledetails-desc'>
        <div id='sale-detail-desc-form'>
          <div>Description:</div>
          <div>{sale.product?.description}</div>
        </div>
      </div>
      <div className='saledetails-buttons'>
        <Link to={`/sales/${id}/edit`} id='SD-link'><Button variant='contained'>Edit</Button></Link>
        <Button type='submit' variant='contained' onClick={() => handleSaleDelete(sale?.id)}>Delete</Button>
      </div>
    </div>
  )
}
