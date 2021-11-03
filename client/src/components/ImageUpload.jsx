import { useState } from 'react'


export default function ImageUpload(props) {
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState('')
  const { formData, setFormData, prevImg } = props;


  const uploadImage = async e => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'thedockimages')

    setLoading(true)
    const res = await fetch('https://api.cloudinary.com/v1_1/dlon2ha1s/image/upload',
      {
        method: 'POST',
        body: data
      })
    const file = await res.json()
    const { name } = e.target
    setImage(file.secure_url)
    setFormData({
      ...formData,
      [name]: file?.secure_url,
    })
    setLoading(false)

  }


  return (
    <div className='image-upload'>
      <h4>Upload Image</h4>
      <input className='input-image' type='file' placeholder="Upload an image"
        onChange={uploadImage} value={formData.img} name="imgURL" />
      <div className='image-section'>
        {loading ? <h3>Loading.......</h3> : null}
        {prevImg === undefined ? <img className='image-act' src={image} width="300" alt='' /> : <img className='image-act' src={prevImg} width="300" alt='user uploaded based on title' />}
      </div>
    </div>
  )
}
