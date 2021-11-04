import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { getOneProduct } from '../../services/products'

export default function SaleCreate(props) {
  const { handleSaleCreate, currentUser } = props
  const { product_id } = useParams()

  const [formData, setFormData] = useState({
    buyer: '',
    sold_date: '',
    product_id: `${product_id}`,
    user_id: `${currentUser?.id}`,
  })

  const { buyer, sold_date } = formData

  const [productData, setProductData] = useState({
    name: '',
    cost: '',
    profit: '',
    description: '',
    img: '',
    user_id: '',
  })
  const { name, cost, profit, description, img } = productData
  useEffect(() => {
    const fetchProductItem = async () => {
      const productData = await getOneProduct(product_id);
      setProductData({
        name: productData?.name,
        cost: productData?.cost,
        profit: productData?.profit,
        description: productData?.description,
        img: productData?.img,
        user_id: `${currentUser?.id}`,
      });
    };
    fetchProductItem();
  }, [product_id]);

  console.log(formData)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const created = await handleSaleCreate(formData);
  };

  return (
    <div>
      <div>
        <h3>Sell Item</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Name:
              <div>{name}</div>
            </label>
            <label>
              Cost:
              <div>{cost}</div>
            </label>
            <label>
              Profit:
              <div>{profit}</div>
            </label>
          </div>
          <div>
            <label>
              Description:
              <div>{description}</div>
            </label>
          </div>
          <label>
            Buyer:
            <input type='text' value={buyer} name='buyer' onChange={handleChange} />
          </label>
          <label>
            Date:
            <input type='date' value={sold_date} name='sold_date' onChange={handleChange} />
          </label>
          <button>Submit</button>
        </form>
      </div>
    </div>
  )
}
