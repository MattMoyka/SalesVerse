import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { getOneProduct } from '../../services/products'
import './Sales.css'
import { Button } from '@mui/material'
export default function SaleCreate(props) {
  const { handleSaleCreate, currentUser, setToggle1 } = props
  const { product_id } = useParams()


  const [formData, setFormData] = useState({
    buyer: '',
    sold_date: '',
    product_id: `${product_id}`,
    user_id: `${currentUser?.id}`,
  })

  const { buyer, sold_date } = formData

  const [productData, setProductData] = useState({
    name: '',
    cost: '',
    profit: '',
    description: '',
    img: '',
    user_id: '',
  })
  const { name, cost, profit, description, img } = productData
  useEffect(() => {
    const fetchProductItem = async () => {
      const productData = await getOneProduct(product_id);
      setProductData({
        name: productData?.name,
        cost: productData?.cost,
        profit: productData?.profit,
        description: productData?.description,
        img: productData?.img,
        user_id: `${currentUser?.id}`,
      });
    };
    fetchProductItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product_id]);

  console.log(formData)

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
    const created = await handleSaleCreate(formData);
    setToggle1(prevState => !prevState)
  };

  return (

    <div className='salecreate-form'>
      <h3>Sell Item</h3>
      <form onSubmit={handleSubmit}>
        <div className='form'>
          <div className='salecreate-form-left'>
            <label>
              Name:
            </label>
            <div id='salecreate-form-disp'>{name}</div>

            <label>
              Cost:
            </label>
            <div id='salecreate-form-disp'>{cost}</div>

            <label>
              Profit:
            </label>
            <div id='salecreate-form-disp'>{profit}</div>
            <label>
              Buyer:
            </label>
            <input type='text' value={buyer} name='buyer' onChange={handleChange} />
            <label>
              Date:
            </label>
            <input type='date' value={sold_date} name='sold_date' onChange={handleChange} />

          </div>


          <div className='salecreate-form-right'>
            <label>
              Description:
            </label>
            <div id='salecreate-form-disp'>{description}</div>
            <img width='150' src={img} alt={name} />
          </div>
        </div>
        <Button type='submit' variant='contained' className='salecreate-button'>Submit</Button>

      </form>
    </div>

  )
}
