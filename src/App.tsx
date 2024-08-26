import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';
import CVBuilder from './CVBuilder';
import Navbar from './Navbar';
import LoginPage from './LoginPage';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/cv-builder" element={<CVBuilder />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
