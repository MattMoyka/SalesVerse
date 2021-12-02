import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ImageUpload from '../../components/ImageUpload'
import { getOneProduct } from "../../services/products"
import './products.css'
import { Button } from '@mui/material'
import { TextField } from '@mui/material'


import { Alert, Avatar, Typography } from '@mui/material';
import { Grid, Paper } from '@mui/material';

export default function ProductEdit(props) {
  const { handleProductUpdate, currentUser } = props

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
  const { name, cost, profit, description } = formData

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  const paperStyle = { padding: 20, height: '70vh', width: '90vw', margin: '20px auto' }
  return (
    <div className='prodedit-form'>

      {/* <div className='form'>
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
        </div> */}

      <form onSubmit={handleSubmit} >
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <h3>Edit Item</h3>
            <Grid container spacing={2} align='center'>
              <Grid
                item
                xs={6}
              >
                <TextField
                  label="name"
                  placeholder='enter product name'
                  fullWidth
                  required
                  type='text'
                  name='name'
                  variant="standard"
                  value={name}
                  onChange={handleChange}
                />
                <TextField
                  label="cost"
                  placeholder='enter cost'
                  fullWidth
                  required
                  type='number'
                  name='cost'
                  variant="standard"
                  value={cost}
                  onChange={handleChange}
                />
                <TextField
                  label="profit"
                  placeholder='enter profit'
                  fullWidth
                  required
                  type='number'
                  name='profit'
                  variant="standard"
                  value={profit}
                  onChange={handleChange}
                />
                <TextField
                  label="description"
                  placeholder='enter description'
                  fullWidth
                  required
                  type='textarea'
                  name='description'
                  variant="standard"
                  value={description}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}
              >
                <ImageUpload formData={formData} setFormData={setFormData} prevImg={formData?.img} />

              </Grid>
            </Grid>
            <Button type='submit' variant='contained' className='PE-button'>Submit</Button>

          </Paper>
        </Grid>
      </form>
    </div>
  )
}