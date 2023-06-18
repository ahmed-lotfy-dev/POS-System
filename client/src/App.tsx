import { Routes, Route, useNavigate } from "react-router-dom"

import Layout from "./components/Layout"
import Home from "./components/Home"
import Products from "./components/Products"
import Categories from "./components/Categories"
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"
import NoMatch from "./components/NoMatch"

import DashboardLayout from "./components/DashboardComponents/DashboardLayout"
import Dashboard from "./components/DashboardComponents/Dashboard"
import DashboardProducts from "./components/DashboardComponents/DashboardProducts"
import DashboardCategories from "./components/DashboardComponents/DashboardCategories"
import DashboardUnits from "./components/DashboardComponents/DashboardUnits"
import AddCategory from "./components/DashboardComponents/AddCategory"
import AddProduct from "./components/DashboardComponents/AddProduct"

import { useEffect } from "react"
import { getFromLocalStorage } from "./lib/localStorage"
import { useDispatch } from "react-redux"
import { User, setUser } from "./store/features/user/userSlice"
import jwtDecode from "jwt-decode"

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = getFromLocalStorage("access_token")

  useEffect(() => {
    if (token) {
      const user = jwtDecode(token)
      dispatch(setUser(user as User))
    }
    if (!token) navigate("/signin")
  }, [token])

  return (
    <div className=''>
      <Routes>
        <Route path='' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='*' element={<NoMatch />} />
        </Route>
        <Route path='/dashboard' element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='/dashboard/products' element={<DashboardProducts />} />
          <Route path='/dashboard/add-product' element={<AddProduct />} />
          <Route
            path='/dashboard/categories'
            element={<DashboardCategories />}
          />
          <Route path='/dashboard/add-category' element={<AddCategory />} />
          <Route path='/dashboard/units' element={<DashboardUnits />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
