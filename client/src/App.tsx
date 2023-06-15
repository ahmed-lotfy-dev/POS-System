import { Routes, Route } from "react-router-dom"

import Layout from "./routes/Layout"
import Home from "./routes/Home"
import Products from "./routes/Products"
import NoMatch from "./routes/NoMatch"
import SignIn from "./routes/SignIn"
import SignUp from "./routes/SignUp"
import Categories from "./routes/Categories"

function App() {
  return (
    <div className=''>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='*' element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
