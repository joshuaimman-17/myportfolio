import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Projects from './pages/Projects/Projects';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import Skills from './pages/Skills/Skills';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/globals.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main style={{ paddingBottom: '60px' }}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/skills' element={<Skills />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;