import { useState } from 'react';
import { Link } from 'react-router-dom';
import './screen.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Alert, Avatar, Typography } from '@mui/material';
import { Grid, Paper } from '@mui/material';
import LoginSharpIcon from '@mui/icons-material/LoginSharp';

export default function Login(props) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const { username, password } = formData;
  const { handleLogin, err } = props;

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
    //   <div className='login-page'>
    //     <form
    //       className="login-form"
    //       onSubmit={(e) => {
    //         e.preventDefault();
    //         handleLogin(formData);
    //       }}
    //     >

    //       <h3 className='login-title'>Login</h3>

    //       <TextField
    //         id="outlined-basic"
    //         label="Username"
    //         variant="filled"
    //         type='text'
    //         name='username'
    //         className='text-field'
    //         value={username}
    //         onChange={handleChange}
    //       />



    //       <TextField
    //         id="filled-size-normal"
    //         label="Password"
    //         variant="filled"
    //         type='password'
    //         name='password'
    //         value={password}
    //         className='text-field'
    //         onChange={handleChange}
    //       />


    //       <Button id='login-button' type='submit' variant='contained' >Log In</Button>
    //       <Link to='/signup' id='login-bottomtext'>Don't have an account?</Link>
    //  </form>
    //   </div>
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleLogin(formData);
      }} >

      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align='center'>
            <Avatar style={avatarStyle}><LoginSharpIcon /></Avatar>
            <h2>Login</h2>
            <TextField
              label="Username"
              placeholder='enter username'
              fullWidth
              required
              type='text'
              name='username'
              variant="standard"
              value={username}
              onChange={handleChange}
            />



            <TextField
              label="Password"
              placeholder='enter password'
              fullWidth
              required
              type='password'
              name='password'
              variant="standard"
              value={password}
              onChange={handleChange}
            />
            <Button type='submit' color='primary' style={btstyle} fullWidth variant='contained' >Login</Button>
            <Typography> Don't have an account?
              <Link to='/signup' > Sign Up</Link>
            </Typography>

          </Grid>
        </Paper>
      </Grid>
    </form >
  )
}
