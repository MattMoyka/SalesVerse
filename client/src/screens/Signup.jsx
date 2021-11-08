import { useState } from 'react'
import { Link } from 'react-router-dom'
import './screen.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Alert } from '@mui/material';
export default function Signup(props) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const { username, email, password } = formData
  const { handleSignup, err } = props

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
        <Alert severity='error' className={err ? 'show-err' : 'no-show-err'}>Please Provide Valid Info!</Alert>
        <h3 className='login-title'> Sign Up</h3>

        <TextField
          id="outlined-basic"
          label="Username"
          variant="filled"
          type='text'
          name='username'
          value={username}
          className='text-field'
          onChange={handleChange} />



        <TextField
          id="outlined-basic"
          label="Email"
          variant="filled"
          type='text'
          name='email'
          value={email}
          className='text-field'
          onChange={handleChange} />


        <TextField
          id="outlined-basic"
          label="Password"
          variant="filled"
          type='text'
          name='password'
          value={password}
          className='text-field'
          onChange={handleChange} />


        <Button id='login-button' type='submit' variant="contained" >Sign Up</Button>
        <Link to='/login' id='login-bottomtext'>Already have an account?</Link>
      </form>
    </div >
  )
}
