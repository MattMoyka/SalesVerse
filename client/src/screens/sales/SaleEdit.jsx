import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { getOneSale } from '../../services/sales'
import { dateformat } from '../../utils/dateformat'
import { DateTime } from "luxon";
import { Button } from '@mui/material';

export default function SaleEdit(props) {
  const { handleSaleUpdate, currentUser, setToggle1 } = props
  const { id } = useParams()

  const [formData, setFormData] = useState({
    buyer: '',
    sold_date: '',
    product_id: `${id}`,
    user_id: `${currentUser?.id}`,
  })


  const [saleData, setSaleData] = useState([])
  const { sold_date, buyer } = formData
  console.log(DateTime.fromISO(sold_date))


  // useEffect(() => {
  //   const i = dateformat(saleData?.sold_date)
  //   console.log(i)
  // }, [saleData?.sold_date])



  useEffect(() => {
    const fetchSaleItem = async () => {
      const saleInfo = await getOneSale(id);
      setFormData({
        ...formData,
        buyer: saleInfo?.buyer,
        sold_date: saleInfo?.sold_date
      })
      setSaleData(saleInfo)
    };
    fetchSaleItem();
  }, [id]);




  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      user_id: currentUser?.id,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(id)
    console.log(formData)
    setToggle1(prevState => !prevState)
    handleSaleUpdate(id, formData);
  };

  return (

    <div className='saleedit-form'>
      <h3>Edit Sale</h3>
      <form onSubmit={handleSubmit}>
        <div className='form'>

          <div className='saleedit-form-left'>
            <label>
              Name:
            </label>
            <div id='saleedit-form-disp'>{saleData.product?.name}</div>

            <label>
              Cost:
            </label>
            <div id='saleedit-form-disp'>${saleData.product?.cost}</div>

            <label>
              Profit:
            </label>
            <div id='saleedit-form-disp'>${saleData.product?.profit}</div>
            <label>
              Buyer:
            </label>
            <input className='sale-edit-input' type='text' value={buyer} name='buyer' onChange={handleChange} />

          </div>
          <div className='saleedit-form-right'>
            <label>
              Description:
            </label>
            <div id='saleedit-form-disp-desc'>{saleData.product?.description}</div>
            <img width='150' src={saleData.product?.img} />
            <label>
              Date:
            </label>
            <input className='sale-edit-input' type='date' value={sold_date} name='sold_date' onChange={handleChange} />


          </div>

        </div>
        <Button type='submit' variant='contained' >Submit</Button>
      </form>
    </div>

  )
}