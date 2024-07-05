import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/home';
import Footer from './components/footer/footer';
import ProductDetail from './components/Detail/detail';
import Products from './components/products/Products';
import Navbar from './components/navBar/NavBar';
import Login from "./components/login/login"
import About from './components/about/About';
import Suport from "./components/about/Suport"
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App flex flex-col min-h-screen bg-transmitir-azulClaro text-futurista-negro">
        <header className="App-header">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/product/:id' element={<ProductDetail />} />
            <Route path='/products' element={<Products />} />
            <Route path='/login' element={<Login />} />
            <Route path='/about' element={<About />} />
            <Route path='/suport' element={<Suport/>}/>
          </Routes>
        </header>
        <div className="flex-grow">
        </div>
        <Footer />
      </div>
    </Router>
  );
}
export default App;
