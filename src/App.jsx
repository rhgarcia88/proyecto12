import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SimonGame from './components/SimonGame/SimonGame';
import Instructions from './components/Instructions/Instructions';
import Ranking from './components/Ranking/Ranking';

function App() {

  return (
    <Router>
    <Routes>
      <Route path="/" element={<SimonGame />} />
      <Route path="/instructions" element={<Instructions />} />
      <Route path="/ranking" element={<Ranking />} />
    </Routes>
  </Router>
  )
}

export default App
