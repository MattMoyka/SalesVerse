import { useState } from 'react'
import { Link } from 'react-router-dom'
import './screen.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Avatar, Grid, Paper, Typography } from '@mui/material';
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';


export default function Signup(props) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const { username, email, password } = formData
  const { handleSignup } = props

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const paperStyle = { padding: 20, height: '70vh', width: '280px', margin: '20px auto' }
  const avatarStyle = { backgroundColor: 'green' }
  const btstyle = { margin: '8px 0' }

  return (

    <form

      onSubmit={(e) => {
        e.preventDefault()
        handleSignup(formData)
      }} >

      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align='center'>
            <Avatar style={avatarStyle}><AddCircleSharpIcon /></Avatar>
            <h2> Sign Up</h2>


            <TextField
              label="Username"
              variant="standard"
              fullWidth
              required
              type='text'
              name='username'
              value={username}
              onChange={handleChange} />



            <TextField

              label="Email"
              variant="standard"
              fullWidth
              required
              type='text'
              name='email'
              value={email}
              onChange={handleChange} />


            <TextField

              label="Password"
              variant="standard"
              fullWidth
              required
              type='text'
              name='password'
              value={password}
              onChange={handleChange} />


            <Button type='submit' variant="contained" style={btstyle} fullWidth >Sign Up</Button>
            <Typography>Already have an account?
              <Link to='/login' > Login</Link>
            </Typography>
          </Grid>
        </Paper>
      </Grid>
    </form>

  )
}
