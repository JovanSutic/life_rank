import './App.css';
import { Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import EuropeMap from './pages/EuropeMap';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/europe" element={<EuropeMap />} />
    </Routes>
  );
}

export default App;
