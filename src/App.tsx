import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dropdown from './components/DropDown';
import Login from './pages/login';
import Signup from 'pages/signup';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const hideMenu = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false);
        console.log('i resized');
      }
    };

    window.addEventListener('resize', hideMenu);

    return () => {
      window.removeEventListener('resize', hideMenu);
    };
  });

  return (
    <>
      <Navbar toggle={toggle} />
      <Dropdown isOpen={isOpen} toggle={toggle} />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/menu' />
        <Route path='/about' />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
