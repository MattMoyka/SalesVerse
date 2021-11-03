import { useState } from 'react'
import ImageUpload from '../../components/ImageUpload'

export default function ProductCreate(props) {
  const [formData, setFormData] = useState({
    name: '',
    cost: '',
    profit: '',
    description: '',
    img: ''
  })

  const { name, cost, profit, description, img } = formData
  const { handleProductCreate } = props

  const handleChange = (e) => {
    const { value } = e.target;
    console.log(value)
    setFormData({
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.img !== "") {
      const created = await handleProductCreate(formData);
      setFormData({ created });
    } else {
      alert("Please upload picture")
    }

  };

  return (
    <div>
      <h3>Create Item</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input type='text' value={name} onChange={handleChange} />
          </label>
          <label>
            Cost:
            <input type='integer' value={cost} onChange={handleChange} />
          </label>
          <label>
            Sell Price:
            <input type='integer' value={profit} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Description:
            <textarea type='text' value={description} rows='5' cols='50' onChange={handleChange} />
          </label>
          <ImageUpload formData={formData} setFormData={setFormData} />
        </div>
      </form>
    </div>
  )
}
