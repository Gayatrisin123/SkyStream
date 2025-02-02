import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from "./components/Layout.jsx";
import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Resources from './pages/Resources.jsx';
import Help from './pages/HelpCenter.jsx';

function App() {
  return (
    <Router>
        <Header/>
        <>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/about" element={<About />} />
              <Route path="/help-center" element={<Help />} />
            </Route>
          </Routes>
        </>
    </Router>
  );
}

export default App;
