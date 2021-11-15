import { useState } from 'react';
import { Link } from 'react-router-dom';
import './screen.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Alert } from '@mui/material';


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



  return (
    <div className='login-page'>
      <form
        className="login-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin(formData);
        }}
      >

        <Alert severity='error' className={err ? 'show-err' : 'no-show-err'}>Invalid Credentials!</Alert>
        <h3 className='login-title'>Login</h3>

        <TextField
          id="outlined-basic"
          label="Username"
          variant="filled"
          type='text'
          name='username'
          className='text-field'
          value={username}
          onChange={handleChange}
        />



        <TextField
          id="filled-size-normal"
          label="Password"
          variant="filled"
          type='password'
          name='password'
          value={password}
          className='text-field'
          onChange={handleChange}
        />


        <Button id='login-button' type='submit' variant='contained' >Log In</Button>
        <Link to='/signup' id='login-bottomtext'>Don't have an account?</Link>

      </form>
    </div>
  )
}
