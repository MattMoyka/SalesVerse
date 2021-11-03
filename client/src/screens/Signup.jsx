import { useState } from 'react'
import { Link } from 'react-router-dom'


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
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleSignup(formData)
      }} >

      <h3> Sign Up</h3>
      <label>
        Username:
        <input
          type='text'
          name='username'
          value={username}
          onChange={handleChange} />
      </label>

      <label>
        Email:
        <input
          type='text'
          name='email'
          value={email}
          onChange={handleChange} />
      </label>

      <label>
        Password:
        <input
          type='text'
          name='password'
          value={password}
          onChange={handleChange} />
      </label>

      <button>Sign Up</button>
      <Link to='/login'>Already have an account?</Link>
    </form>
  )
}
