import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { getOneProduct } from '../../services/products'
import './Sales.css'
import { Button } from '@mui/material'

import TextField from '@mui/material/TextField';
import { Alert, Avatar, Typography } from '@mui/material';
import { Grid, Paper } from '@mui/material';
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
  const paperStyle = { padding: 20, height: 'auto', width: '90vw', margin: '20px auto' }

  return (

    <div className='salecreate-form'>

      {/* <div className='form'>
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
        </div> */}

      <form onSubmit={handleSubmit}>
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <h3>Create Sale</h3>
            <Grid container spacing={2} columns={{ xs: 2, sm: 12 }} align='center'>
              <Grid
                item
                sm={6}
                xs={2}
              >
                <TextField
                  id="standard-read-only-input"
                  label="Product Name"

                  value={name}
                  fullWidth
                  InputProps={{
                    readOnly: true,

                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                />
                <TextField
                  id="standard-read-only-input"
                  label="Product Cost"
                  value={cost}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                />
                <TextField
                  id="standard-read-only-input"
                  label="Product Profit"
                  value={profit}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                />
                <TextField
                  label="buyer"
                  placeholder='enter buyer'
                  fullWidth
                  required
                  type='textarea'
                  name='buyer'
                  variant="standard"
                  value={buyer}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item sm={6}
                xs={2}
              >
                <TextField
                  id="standard-read-only-input"
                  label="Product Description"
                  value={description}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                />
                <img width='150' style={{ margin: '10px' }} src={img} alt={name} />
                <TextField
                  label="sold_date"
                  placeholder=''
                  fullWidth
                  required
                  type='date'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name='sold_date'
                  variant="standard"
                  value={sold_date}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button type='submit' variant='contained' style={{ margin: '15px' }} className='salecreate-button'>Submit</Button>
          </Paper>
        </Grid>


      </form>
    </div>

  )
}
