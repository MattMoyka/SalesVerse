import { useState } from 'react'
import ImageUpload from '../../components/ImageUpload'
import { Button } from '@mui/material'
import { TextField } from '@mui/material'
import { Grid, Paper } from '@mui/material';

export default function ProductCreate(props) {
  const { handleProductCreate, currentUser, setToggle } = props
  const [formData, setFormData] = useState({
    name: '',
    cost: '',
    profit: '',
    description: '',
    img: '',
    user_id: `${currentUser?.id}`,
  })

  const { name, cost, profit, description } = formData

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
    if (formData.img !== "") {
      const created = await handleProductCreate(formData);
      setToggle(prevState => !prevState)
    } else {
      alert("Please upload picture")
    }

  };
  console.log(formData)
  const paperStyle = { padding: 20, height: 'auto', width: '90vw', margin: '20px auto' }

  return (
    <div className='prodcreate-form'>
      <form onSubmit={handleSubmit}>
        {/* <div className='form'>
          <div className='prodcreate-form-left'>
            <label>
              Name:
            </label>
            <input type='text' value={name} name='name' onChange={handleChange} />

            <label>
              Cost:
            </label>
            <input type='number' value={cost} name='cost' onChange={handleChange} />

            <label>
              Profit:
            </label>
            <input type='number' value={profit} name='profit' onChange={handleChange} />

          </div>
          <div className='prodcreate-form-right'>
            <label>
              Description:
            </label>
            <textarea type='text' value={description} name='description' onChange={handleChange} />

            <ImageUpload formData={formData} setFormData={setFormData} />
          </div>
        </div>
        <Button type='submit' variant='contained' className='prodcreate-button'>Submit</Button> */}

        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <h3>Create Item</h3>
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
            <Button type='submit' variant='contained' style={{ margin: '10px 0' }}>Submit</Button>

          </Paper>
        </Grid>
      </form>
    </div>
  )
}
