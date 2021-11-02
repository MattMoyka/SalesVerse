import { useState } from 'react'
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

export default function Signup() {
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
    </form>
  )
}
