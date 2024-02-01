import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ViewComponent from './ViewComponent';
import Summary from './Summary';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ViewComponent />} />
        <Route path="/summary" element={<Summary />} />
      </Routes>
    </Router>
  );
}

export default App;

