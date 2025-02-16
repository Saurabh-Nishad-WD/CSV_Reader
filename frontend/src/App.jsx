import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './page/Home.jsx';
import CSVViewer from './page/CSVViewer.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/csv/:id" element={<CSVViewer />} />
    </Routes>
  );
}

export default App;
