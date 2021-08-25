import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import removeIdToken from 'lib/token/removeIdToken';
import removeUser from 'lib/users/removeUser';

type DropDownProps = {
	isOpen: boolean;
	toggle: () => void;
};

const Dropdown: FC<DropDownProps> = (props: DropDownProps) => {
	const [user] = useAuthState(auth);

	const signOut = () => {
		auth.signOut();
		removeIdToken();
		removeUser();
	};

	return (
		<div
			className={
				props.isOpen
					? 'grid grid-rows-4 text-center items-center bg-yellow-500'
					: 'hidden'
			}
			onClick={props.toggle}
		>
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
	);
};

export default Dropdown;
