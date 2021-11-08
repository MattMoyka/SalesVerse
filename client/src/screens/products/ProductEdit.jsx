import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ImageUpload from '../../components/ImageUpload'
import { getOneProduct } from "../../services/products"
import './products.css'
import { Button } from '@mui/material'
import { TextField } from '@mui/material'

export default function ProductEdit(props) {
  const { handleProductUpdate, currentUser, products } = props

  const { id } = useParams()

  const [formData, setFormData] = useState({
    name: '',
    cost: '',
    profit: '',
    description: '',
    img: '',
    user_id: `${currentUser?.id}`,
  })
  console.log(currentUser?.id)
  const { name, cost, profit, description, img } = formData

  useEffect(() => {
    const fetchProductItem = async () => {
      const productData = await getOneProduct(id);
      setFormData({
        name: productData?.name,
        cost: productData?.cost,
        profit: productData?.profit,
        description: productData?.description,
        img: productData?.img,
        user_id: currentUser?.id,
      });
    };
    fetchProductItem();
  }, [id]);
  console.log(currentUser?.id)



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
    handleProductUpdate(id, formData);

  };
  console.log(formData)
  return (
    <div className='prodedit-form'>
      <h3>Edit Item</h3>
      <form onSubmit={handleSubmit} >
        <div className='form'>
          <div className='prodedit-form-left'>
            <label>
              Name:
            </label>
            <TextField className='text-field' type='text' value={name} name='name' onChange={handleChange} />

            <label>
              Cost:
            </label>
            <TextField className='text-field' type='number' value={cost} name='cost' onChange={handleChange} />

            <label>
              Profit:
            </label>
            <TextField className='text-field' type='number' value={profit} name='profit' onChange={handleChange} />
            <label>
              Description:
            </label>
            <textarea className='text-field' type='text' value={description} name='description' onChange={handleChange} />

          </div>
          <div className='prodedit-form-right'>

            <ImageUpload formData={formData} setFormData={setFormData} prevImg={formData?.img} />
          </div>
        </div>
        <Button type='submit' variant='contained' className='PE-button'>Submit</Button>
      </form>
    </div>
  )
}