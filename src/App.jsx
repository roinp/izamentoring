import React from 'react';
import { LanguageProvider } from './i18n/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyMatters from './components/WhyMatters';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <div className="App">
        <Navbar />
        <Hero />
        <WhyMatters />
        <About />
        <Services />
        <Contact />
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
