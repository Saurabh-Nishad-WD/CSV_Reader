import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './page/Home.jsx';
import CSVViewer from './page/CSVViewer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/csv/:id" element={<CSVViewer />} />
      </Routes>
    </Router>
  );
}

export default App;