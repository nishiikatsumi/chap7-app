import { Routes, Route } from 'react-router-dom';
import './App.css'
import Header from './components/Header/index.js';
import Home from './components/Home/index.js';
import Article from './components/Article/index.js';
import Contact from './components/Contact/index.js';

function App() {

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles/:id" element={<Article />} />
				<Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App
