import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/home';
import Footer from './components/footer/footer';
import ProductDetail from './components/Detail/detail';
import Products from './components/products/Products';
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App flex flex-col min-h-screen">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/product/:id' element={<ProductDetail />} />
            <Route path='/products' element={<Products/>}/>
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
