import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/home';
import Footer from './components/footer/footer';
import ProductDetail from './components/Detail/detail';
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App flex flex-col min-h-screen">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/product/:id' element={<ProductDetail/>}/>
          </Routes>
        </header>
        <div className="flex-grow">
          {/* Contenido principal aquí, como ProductList */}
        </div>
        <Footer /> {/* Footer al final de la página */}
      </div>
    </Router>
  );
}

export default App;
