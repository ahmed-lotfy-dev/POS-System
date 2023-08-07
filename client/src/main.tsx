import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import axios from "axios"
import { Provider } from "react-redux"
import { store } from "./store/store.js"
import { AllDataResponse } from "./types/globals.js"

import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom"

import { ProtectedRoute } from "./routes/ProtectedRoute.js"
import { Root } from "./routes/Root.js"
import { Home } from "./components/Home/Home.js"
import { SignIn } from "./routes/SignIn.js"
import { SignUp } from "./routes/SignUp.js"
import { DashboardLayout } from "./components/Dashboard/AdminLayout.js"
import { NoMatch } from "./routes/NoMatch.js"
import { Dashboard } from "./components/Dashboard/AdminHome.js"
import { AdminProducts } from "./components/Dashboard/products/AdminProducts.js"
import { AdminCategories } from "./components/Dashboard/categories/AdminCategories.js"
import { AdminUnits } from "./components/Dashboard/units/AdminUnits.js"
import { AddCategory } from "./components/Dashboard/categories/AddCategory.js"
import { AddUnit } from "./components/Dashboard/units/AddUnit.js"
import { AddProduct } from "./components/Dashboard/products/AddProduct.js"

const allData = async (): Promise<AllDataResponse> => {
  const response = await Promise.all([
    axios.get("/api/category/getAll"),
    axios.get("/api/product/getAll"),
    axios.get("/api/unit/getAll"),
  ])

  const [category, product, unit] = response

  return { categories: category.data, products: product.data, units: unit.data }
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route id='root' loader={allData} element={<ProtectedRoute />}>
      <Route path='/' element={<Root />}>
        <Route index element={<Home />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='*' element={<NoMatch />} />
      </Route>
      <Route path='/dashboard' element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path='/dashboard/categories' element={<AdminCategories />} />
        <Route path='/dashboard/categories/add' element={<AddCategory />} />
        <Route path='/dashboard/categories/edit' element={<AddCategory />} />
        <Route path='/dashboard/products' element={<AdminProducts />} />
        <Route path='/dashboard/products/add' element={<AddProduct />} />
        <Route path='/dashboard/products/edit' element={<AddProduct />} />
        <Route path='/dashboard/units' element={<AdminUnits />} />
        <Route path='/dashboard/units/add' element={<AddUnit />} />
        <Route path='/dashboard/units/edit' element={<AddUnit />} />
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
