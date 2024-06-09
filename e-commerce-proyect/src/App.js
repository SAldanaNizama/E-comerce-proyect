import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/home';
import Footer from './components/footer/footer';
import ProductDetail from './components/Detail/detail';
function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/product/:id' element={<ProductDetail/>}/>
          </Routes>
        </header>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

