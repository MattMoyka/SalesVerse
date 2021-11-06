import { Route, Switch, useHistory } from "react-router"
import { useEffect, useState } from 'react'
import { deleteProduct, getAllProducts, postProduct, putProduct } from '../services/products'
import { deleteSale, getAllSales, postSale, putSale } from '../services/sales'
import Products from "../screens/products/Products"
import ProductCreate from '../screens/products/ProductCreate'
import ProductDetails from "../screens/products/ProductDetails"
import ProductEdit from "../screens/products/ProductEdit"
import Sales from "../screens/sales/Sales"
import SaleCreate from '../screens/sales/SaleCreate'
import SaleDetails from '../screens/sales/SaleDetails'
import SaleEdit from '../screens/sales/SaleEdit'
import Landing from "../screens/Landing"

export default function MainContainer(props) {
  const { currentUser } = props
  const [products, setProducts] = useState([])
  const [sales, setSales] = useState([])
  const history = useHistory()
  const [toggle, setToggle] = useState(false)
  const [toggle1, setToggle1] = useState(false)




  useEffect(() => {
    const fetchProducts = async () => {
      const productlist = await getAllProducts()
      setProducts(productlist)
    }
    fetchProducts()
  }, [toggle])

  const handleProductCreate = async (formData) => {
    const newProduct = await postProduct(formData)
    setProducts((prevState) => [...prevState, newProduct])
    history.push('/products')
  }

  const handleProductUpdate = async (id, formData) => {
    const updateProduct = await putProduct(id, formData)
    setProducts((prevState) =>
      prevState.map((product) => {
        return product.id === Number(id) ? updateProduct : product
      }))
    history.push('/products')
  }

  const handleProductDelete = async (id) => {
    await deleteProduct(id)
    setProducts((prevState) => prevState.filter((product) => product.id !== id))
    history.push('/products')
  }

  useEffect(() => {
    const fetchSales = async () => {
      const salelist = await getAllSales()
      setSales(salelist)
    }
    fetchSales()
  }, [toggle1])

  const handleSaleCreate = async (formData) => {
    const newSale = await postSale(formData)
    setSales((prevState) => [...prevState, newSale])
    history.push('/sales')
  }

  const handleSaleUpdate = async (id, formData) => {
    const updateSale = await putSale(id, formData)

    setSales((prevState) =>
      prevState.map((sale) => {
        return sale.id === Number(id) ? updateSale : sale
      }))
    history.push('/sales')
  }

  const handleSaleDelete = async (id) => {
    await deleteSale(id)
    setSales((prevState) => prevState.filter((sale) => sale.id !== id))
    history.push('/sales')
  }

  return (
    <div>

      <Switch>
        <Route exact path='/'>
          <Landing currentUser={currentUser} />
        </Route>
        <Route exact path='/products'>
          <Products products={products} />
        </Route>
        <Route exact path='/products/create'>
          <ProductCreate handleProductCreate={handleProductCreate} currentUser={currentUser} setToggle={setToggle} />
        </Route>
        <Route exact path='/products/:id'>
          <ProductDetails products={products} handleProductDelete={handleProductDelete} />
        </Route>
        <Route path='/products/:id/edit'>
          <ProductEdit currentUser={currentUser} products={products} handleProductUpdate={handleProductUpdate} />
        </Route>
        <Route exact path='/sales'>
          <Sales sales={sales} products={products} />
        </Route>
        <Route exact path='/products/:product_id/sales'>
          <SaleCreate handleSaleCreate={handleSaleCreate} currentUser={currentUser} />
        </Route>
        <Route exact path='/sales/:id'>
          <SaleDetails sales={sales} handleSaleDelete={handleSaleDelete} />
        </Route>
        <Route exact path='/sales/:id/edit'>
          <SaleEdit currentUser={currentUser} handleSaleUpdate={handleSaleUpdate} setToggle1={setToggle1} />
        </Route>
      </Switch>

    </div>
  )
}
