import React, { useState, useEffect, FC } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import signup from 'pages/signup';
import home from './pages';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dropdown from './components/DropDown';
import login from './pages/login';
import profile from './pages/profile';
import course from './pages/course';
import forgotPassword from 'pages/forgotPassword';
import { useUser } from './Hooks';
import firebase from 'firebase/app';
import ProtectedRoute from 'components/ProtectedRoute';
import CirleProgressIndicator from 'components/CircleProgressIndicator';

function App() {
	const user = useUser();

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

	if (user === 'NOT_YET_LOADED') return <CirleProgressIndicator />;

	/*if (!user)
		firebase
			.auth()
			.signInAnonymously()
			.catch((error) => {
				console.log(error);
			});*/

	return (
		<>
			<Router>
				<Navbar toggle={toggle} />
				<Dropdown isOpen={isOpen} toggle={toggle} />
				<Switch>
					<Route path="/" exact component={home} />
					<Route path="/about" />
					<Route path="/docs" />
					<Route path="/social" />
					<ProtectedRoute
						path="/login"
						component={login}
						requiresAuthentication={false}
					/>
					<ProtectedRoute
						path="/signup"
						component={signup}
						requiresAuthentication={false}
					/>
					<ProtectedRoute
						path="/courses"
						component={course}
						requiresAuthentication={true}
					/>
					<ProtectedRoute
						path="/profile"
						component={profile}
						requiresAuthentication={true}
					/>
					<ProtectedRoute
						path="/forgot-password"
						component={forgotPassword}
						requiresAuthentication={false}
					/>
				</Switch>
			</Router>
			<Footer />
		</>
	);
}

export default App;
