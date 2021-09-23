import React, { useState, useEffect } from 'react';
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
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './lib/firebase';

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

	const AuthRoute = (children: any, { ...rest }) => {
		let [user] = useAuthState(auth);
		return (
			<Route
				{...rest}
				render={({ location }) =>
					user ? (
						children
					) : (
						<Redirect
							to={{
								pathname: '/login',
								state: { from: location },
							}}
						/>
					)
				}
			/>
		);
	};

	return (
		<>
			<Navbar toggle={toggle} />
			<Dropdown isOpen={isOpen} toggle={toggle} />
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/about" />
				<Route path="/docs" />
				<Route path="/social" />
				<AuthRoute path="/profile" component={Profile} />
				<AuthRoute path="/course" component={Course} />
				<Route path="/login" component={Login} />
				<Route path="/signup" component={Signup} />
				<Route path="/forgot-password" component={ForgotPassword} />
			</Switch>
			<Footer />
		</>
	);
}

export default App;
