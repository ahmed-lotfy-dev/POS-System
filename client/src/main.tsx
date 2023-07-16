import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"

import { Provider } from "react-redux"
import { store } from "./store/store.js"

import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom"

import ProtectedRoute from "./routes/ProtectedRoute.js"
import Root from "./routes/Root.js"
import Home from "./components/Home/Home.js"
import Products from "./routes/Products.js"
import Categories from "./routes/Categories.js"
import SignIn from "./routes/SignIn.js"
import SignUp from "./routes/SignUp.js"
import DashboardLayout from "./components/Dashboard/AdminLayout.js"
import NoMatch from "./routes/NoMatch.js"
import Dashboard from "./components/Dashboard/AdminHome.js"
import AdminProducts from "./components/Dashboard/products/AdminProducts.js"
import AdminCategories from "./components/Dashboard/categories/AdminCategories.js"
import DashboardUnits from "./components/Dashboard/units/AdminUnits.js"

const allData = async () => {
  const response = await Promise.all([
    fetch("/api/category/getAll"),
    fetch("/api/product/getAll"),
    fetch("/api/unit/getAll"),
  ])

  const [categoryResponse, productsResponse, unitsResponse] = response

  const category = await categoryResponse.json()
  const product = await productsResponse.json()
  const unit = await unitsResponse.json()
  return { category, product, unit }
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route id='root' loader={allData}>
      <Route
        path='/'
        element={
          <ProtectedRoute>
            <Root />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='*' element={<NoMatch />} />
      </Route>
      <Route
        path='/dashboard'
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path='/dashboard/products' element={<AdminProducts />} />
        <Route path='/dashboard/categories' element={<AdminCategories />} />
        <Route path='/dashboard/units' element={<DashboardUnits />} />
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
