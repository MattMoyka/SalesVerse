import { useState } from 'react';
import { Link } from 'react-router-dom';
import './screen.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function Login(props) {
  const [formData, setFormData] = useState({
    username: 'admin',
    password: '123456',
  });
  const { username, password } = formData;
  const { handleLogin } = props;

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

        <h3 className='login-title'>Login</h3>

        <TextField
          id="outlined-basic"
          label="Username"
          variant="filled"
          type='text'
          name='username'

          value={username}
          onChange={handleChange}
        />



        <TextField
          id="outlined-basic"
          label="Password"
          variant="filled"
          type='password'
          name='password'
          value={password}
          onChange={handleChange}
        />


        <Button id='login-button' type='submit' variant='contained' >Log In</Button>
        <Link to='/signup' id='login-bottomtext'>Don't have an account?</Link>

      </form>
    </div>
  )
}
