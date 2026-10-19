import { Routes, Route } from 'react-router-dom'

import Navbar from './components/organisms/Navbar'
import Home from './pages/Home'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Register from './pages/Register'
import Checkout from './pages/Checkout'
import PurchaseSuccess from './pages/PurchaseSuccess'
import Orders from './pages/Orders'
import Tracking from './pages/Tracking'
import AdminProducts from './pages/AdminProducts'
import ProtectedRoute from './routes/ProtectedRoute'
import Profile from './pages/Profile'
import Categories from './pages/Categories'
import Offers from './pages/Offers'
import ProductDetail from './pages/ProductDetail'
import About from './pages/About'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import BlogDetail from './pages/BlogDetail'
import AdminDashboard from './pages/AdminDashboard'
import AdminOrders from './pages/AdminOrders'
import AdminUsers from './pages/AdminUsers'
import AdminReports from './pages/AdminReports'

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        

        <Route
          path="/"
          element={<Home />}
        />


        <Route
          path="/productos"
          element={<Products />}
        />

        <Route
          path="/productos/:id"
          element={<ProductDetail />}
        />


        <Route
          path="/carrito"
          element={<Cart />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/registro"
          element={<Register />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        <Route
          path="/compra-exitosa"
          element={<PurchaseSuccess />}
        />

        <Route
          path="/pedidos"
          element={<Orders />}
        />

        <Route
          path="/seguimiento"
          element={<Tracking />}
        />

        <Route
          path="/admin/productos"
          element={
            <ProtectedRoute
              allowedRoles={['ADMIN']}
            >
              <AdminProducts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/perfil"
          element={<Profile />}
        />

        <Route
          path="/categorias"
          element={<Categories />}
        />

        <Route
          path="/ofertas"
          element={<Offers />}
        />

        <Route
          path="/nosotros"
          element={<About />}
        />

        <Route
          path="/contacto"
          element={<Contact />}
        />

        <Route
          path="/blog"
          element={<Blog />}
        />

        <Route
          path="/blog/:id"
          element={<BlogDetail />}
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute
              allowedRoles={['ADMIN']}
            >
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/pedidos"
          element={
            <ProtectedRoute
              allowedRoles={['ADMIN']}
            >
              <AdminOrders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/usuarios"
          element={
            <ProtectedRoute
              allowedRoles={['ADMIN']}
            >
              <AdminUsers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/reportes"
          element={
            <ProtectedRoute
              allowedRoles={['ADMIN']}
            >
              <AdminReports />
            </ProtectedRoute>
          }
        />

      </Routes>
    </>
  )
}

export default App