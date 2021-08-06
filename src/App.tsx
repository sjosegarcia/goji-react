import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Signup from 'pages/Signup';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dropdown from './components/DropDown';
import Login from './pages/Login';
import ForgotPassword from 'pages/ForgotPassword';

function App() {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => {
		setIsOpen(!isOpen);
	};

	useEffect(() => {
		const hideMenu = () => {
			if (window.innerWidth > 768 && isOpen) {
				setIsOpen(false);
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
				<Route path="/" exact component={Home} />
				<Route path="/about" />
				<Route path="/docs" />
				<Route path="/social" />
				<Route path="/login" component={Login} />
				<Route path="/signup" component={Signup} />
				<Route path="/forgot-password" component={ForgotPassword} />
			</Switch>
			<Footer />
		</>
	);
}

export default App;
