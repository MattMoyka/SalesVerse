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
    <div>
      <h3>Create Item</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input type='text' value={name} name='name' onChange={handleChange} />
          </label>
          <label>
            Cost:
            <input type='number' value={cost} name='cost' onChange={handleChange} />
          </label>
          <label>
            Profit:
            <input type='number' value={profit} name='profit' onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Description:
            <textarea type='text' value={description} name='description' rows='5' cols='50' onChange={handleChange} />
          </label>
          <ImageUpload formData={formData} setFormData={setFormData} />
        </div>
        <button>Submit</button>
      </form>
    </div>
  )
}
