import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';

type NavbarProps = {
	toggle: () => void;
};

const Navbar: FC<NavbarProps> = (props: NavbarProps) => {
	const [user] = useAuthState(auth);

	const signOut = () => auth.signOut();

	return (
		<nav
			className="flex justify-between items-center h-16 bg-white text-black relative shadow-sm font-mono"
			role="navigation"
		>
			<Link to="/" className="pl-8">
				GODZ
			</Link>
			<div className="px-4 cursor-pointer md:hidden" onClick={props.toggle}>
				<svg
					className="w-8 h-8"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M4 6h16M4 12h16M4 18h16"
					/>
				</svg>
			</div>
			<div className="pr-8 md:block  hidden">
				<Link to="/" className="p-4">
					Home
				</Link>
				<Link to="/about" className="p-4">
					About
				</Link>
				<Link to="/docs" className="p-4">
					Docs
				</Link>
				<Link to="/social" className="p-4">
					Social
				</Link>
				{user && (
					<Link to="/profile" className="p-4">
						Profile
					</Link>
				)}
				{!user && (
					<Link to="/login" className="p-4">
						Login
					</Link>
				)}
				{user && (
					<Link to="/" onClick={signOut} className="p-4">
						Sign Out
					</Link>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
