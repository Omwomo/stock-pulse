import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Sp500 from './components/Sp500';
import Nasdaq from './components/Nasdaq';
import DowJones from './components/DowJones';

function App() {
  return (
    <Router>
      <Navigation />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sp500" element={<Sp500 />} />
          <Route path="/nasdaq" element={<Nasdaq />} />
          <Route path="/dow-jones" element={<DowJones />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
