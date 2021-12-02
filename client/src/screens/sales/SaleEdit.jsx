import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { getOneSale } from '../../services/sales'
import { DateTime } from "luxon";
import { Button } from '@mui/material';

import TextField from '@mui/material/TextField';
import { Alert, Avatar, Typography } from '@mui/material';
import { Grid, Paper } from '@mui/material';

export default function SaleEdit(props) {
  const { handleSaleUpdate, currentUser, setToggle1, toggle1 } = props
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, toggle1]);




  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      user_id: currentUser?.id,
      product_id: saleData.product?.id,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    handleSaleUpdate(id, formData);
    setToggle1(prevState => !prevState)
  };
  console.log(saleData?.product)

  const paperStyle = { padding: 20, height: 'auto', width: '90vw', margin: '20px auto' }

  return (

    <div className='saleedit-form'>


      {/* <div className='form'>

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
            <img width='150' src={saleData.product?.img} alt={saleData.product?.name} />
            <label>
              Date:
            </label>
            <input className='sale-edit-input' type='text' value={sold_date} name='sold_date' onChange={handleChange} />


          </div>

        </div> */}
      <form onSubmit={handleSubmit} >
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <h3>Edit Sale</h3>
            <Grid container spacing={2} columns={{ xs: 2, sm: 12 }} align='center'>
              <Grid
                item
                sm={6}
                xs={2}
              >
                <TextField
                  id="standard-read-only-input"
                  label="Product Name"

                  value={saleData.product?.name}
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
                  value={saleData.product?.cost}
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
                  value={saleData.product?.profit}
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
                  value={saleData.product?.description}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                />
                <img width='150' style={{ margin: '10px' }} src={saleData.product?.img} alt={saleData.product?.name} />
                <TextField
                  label="sold_date"
                  placeholder='enter sold date'
                  fullWidth
                  required
                  type='textarea'
                  name='sold_date'
                  variant="standard"
                  value={sold_date}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button type='submit' variant='contained' style={{ margin: '15px auto' }} >Submit</Button>
          </Paper>
        </Grid>
      </form>
    </div>

  )
}
