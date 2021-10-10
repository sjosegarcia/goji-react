import React, { useState, useEffect, FC } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Signup from 'pages/Signup';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dropdown from './components/DropDown';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Course from './pages/Course';
import ForgotPassword from 'pages/ForgotPassword';
import { useUser } from './Hooks';
import firebase from 'firebase/app';
import ProtectedRoute from 'components/ProtectedRoute';

function App() {
	const [user] = useUser();

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
	if (user === 'NOT_YET_LOADED')
		return (
			<div className="justify-center w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
				<span className="text-yellow-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0">
					<i className="fas fa-circle-notch fa-spin fa-5x"></i>
				</span>
			</div>
		);

	/*if (!user)
		firebase
			.auth()
			.signInAnonymously()
			.catch((error) => {
				console.log(error);
			});*/

	return (
		<>
			<Navbar toggle={toggle} />
			<Dropdown isOpen={isOpen} toggle={toggle} />
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/about" />
				<Route path="/docs" />
				<Route path="/social" />
				<ProtectedRoute
					path="/login"
					component={Login}
					requiresAuthentication={false}
				/>
				<ProtectedRoute
					path="/signup"
					component={Signup}
					requiresAuthentication={false}
				/>
				<ProtectedRoute
					path="/courses"
					component={Course}
					requiresAuthentication={true}
				/>
				<ProtectedRoute
					path="/profile"
					component={Profile}
					requiresAuthentication={true}
				/>
				<ProtectedRoute
					path="/forgot-password"
					component={ForgotPassword}
					requiresAuthentication={false}
				/>
			</Switch>
			<Footer />
		</>
	);
}

export default App;
