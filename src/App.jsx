import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from "./pages/Home.jsx";
import Notes from "./pages/Notes.jsx";
import Search from './pages/Search.jsx';
import AI from "./pages/AI.jsx"


import './App.css'



function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/notes' element={<Notes />} />
          <Route path='/search' element={<Search />} />
          <Route path='/ai' element={<AI />} />
        </Routes>
      </Router>
    </>
  )
}

export default App