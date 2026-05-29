import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './i18n/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyMatters from './components/WhyMatters';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Admin from './components/Admin';
import './App.css';

// Hash-based routing keeps things working on static hosting (no server config
// needed for refresh). Visit #/admin to open the content manager.
function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return hash;
}

function App() {
  const hash = useHashRoute();
  const isAdmin = hash === '#/admin' || hash === '#admin';

  return (
    <LanguageProvider>
      {isAdmin ? (
        <Admin />
      ) : (
        <div className="App">
          <Navbar />
          <Hero />
          <WhyMatters />
          <About />
          <Services />
          <Contact />
          <Footer />
        </div>
      )}
    </LanguageProvider>
  );
}

export default App;
