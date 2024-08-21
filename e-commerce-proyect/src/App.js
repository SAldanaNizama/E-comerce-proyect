import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/home";
import Footer from "./components/footer/footer";
import ProductDetail from "./components/Detail/detail";
import Products from "./components/products/Products";
import Navbar from "./components/navBar/NavBar";
import Login from "./components/login/login";
import About from "./components/about/About";
import Support from "./components/about/Suport";
import Profile from "./components/profile/Profile";
import { AuthProvider } from "./components/login/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import CreateProductForm from "./components/create/CreateProductForm";
import CartPage from "./components/Cart/CartPage"; // Importar el componente del carrito
import { CartProvider } from "./components/Cart/CartProvider"; // Importar el provider del carrito
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        {" "}
        {/* Proveedor del carrito envuelve toda la app */}
        <Router>
          <div className="App flex flex-col min-h-screen bg-transmitir-azulClaro text-futurista-negro">
            <header className="App-header">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/form" element={<CreateProductForm />} />
                <Route path="/products" element={<Products />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<PrivateRoute />}>
                  <Route path="" element={<Profile />} />
                </Route>
                <Route path="/about" element={<About />} />
                <Route path="/support" element={<Support />} />
                <Route path="/cart" element={<CartPage />} />{" "}
                {/* Ruta para el carrito */}
              </Routes>
            </header>
            <div className="flex-grow"></div>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
