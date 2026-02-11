import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './Home'
import { Login } from '../src/components/login'
import { Register } from '../src/components/register'
import { Order } from '../src/components/order'
import { CreateOrder } from '../src/components/createorder'
import { Profile } from '../src/components/profile'
import { PrivateRoute } from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route
          path="/nuevo-pedido/:id"
          element={
            <PrivateRoute>
              <CreateOrder />
            </PrivateRoute>
          }
           />
       
        <Route
          path="/perfil"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App