import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { getOneSale } from '../../services/sales'
import { dateformat } from '../../utils/dateformat'

export default function SaleEdit(props) {
  const { handleSaleUpdate, currentUser, setToggle1 } = props
  const { id } = useParams()

  const [formData, setFormData] = useState({
    buyer: '',
    sold_date: '',
    product_id: `${id}`,
    user_id: `${currentUser?.id}`,
  })


  const [saleData, setSaleData] = useState([])
  const { sold_date, buyer } = formData




  // useEffect(() => {
  //   const i = dateformat(saleData?.sold_date)
  //   setSold(i)
  // }, [saleData?.sold_date])

  useEffect(() => {
    const fetchSaleItem = async () => {
      const saleInfo = await getOneSale(id);
      setFormData({
        ...formData,
        buyer: saleInfo?.buyer,
        sold_date: saleInfo?.sold_date
      })
      setSaleData(saleInfo)
    };
    fetchSaleItem();
  }, [id]);




  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(id)
    console.log(formData)
    setToggle1(prevState => !prevState)
    handleSaleUpdate(id, formData);
  };

  return (
    <div>
      <div>
        <h3>Edit Sale</h3>
        <form onSubmit={handleSubmit}>
          <img src={saleData.product?.img} />
          <div>
            <label>
              Name:
              <div>{saleData.product?.name}</div>
            </label>
            <label>
              Cost:
              <div>{saleData.product?.cost}</div>
            </label>
            <label>
              Profit:
              <div>{saleData.product?.profit}</div>
            </label>
          </div>
          <div>
            <label>
              Description:
              <div>{saleData.product?.description}</div>
            </label>
          </div>
          <label>
            Buyer:
            <input type='text' value={buyer} name='buyer' onChange={handleChange} />
          </label>
          <label>
            Date:
            <input type='string' value={sold_date} name='sold_date' onChange={handleChange} />
          </label>
          <button>Submit</button>
        </form>
      </div>
    </div>
  )
}
