import { useState } from 'react'
import { Link } from 'react-router-dom'
import './screen.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

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


  return (
    <div className='login-page'>
      <form
        className="login-form"
        onSubmit={(e) => {
          e.preventDefault()
          handleSignup(formData)
        }} >

        <h3> Sign Up</h3>

        <TextField
          id="outlined-basic"
          label="Username"
          variant="filled"
          type='text'
          name='username'
          value={username}
          onChange={handleChange} />



        <TextField
          id="outlined-basic"
          label="Email"
          variant="filled"
          type='text'
          name='email'
          value={email}
          onChange={handleChange} />


        <TextField
          id="outlined-basic"
          label="Password"
          variant="filled"
          type='text'
          name='password'
          value={password}
          onChange={handleChange} />


        <button id='login-button' variant="contained" color="success">Sign Up</button>
        <Link to='/login' id='login-bottomtext'>Already have an account?</Link>
      </form>
    </div >
  )
}
