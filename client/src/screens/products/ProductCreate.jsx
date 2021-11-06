import { useState } from 'react'
import ImageUpload from '../../components/ImageUpload'

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

  const { name, cost, profit, description, img } = formData

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
  return (
    <div className='prodcreate-form'>
      <h3>Create Item</h3>
      <form onSubmit={handleSubmit}>
        <div className='form'>
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
        <button className='prodcreate-button'>Submit</button>
      </form>
    </div>
  )
}
