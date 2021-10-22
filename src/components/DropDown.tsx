import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import signOut from 'lib/token/signOut';
import { useUser } from 'Hooks';
import WalletButton from './WalletButton';

type DropDownProps = {
	isOpen: boolean;
	toggle: () => void;
};

const Dropdown: FC<DropDownProps> = (props: DropDownProps) => {
	const user = useUser();
	const isLoggedIn = user && user !== 'NOT_YET_LOADED';

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
			{isLoggedIn && (
				<Link to="/profile" className="p-4">
					Profile
				</Link>
			)}
			{isLoggedIn && (
				<Link to="/courses" className="p-4">
					Courses
				</Link>
			)}
			{!user && (
				<Link to="/login" className="p-4">
					Login
				</Link>
			)}
			{isLoggedIn && (
				<Link to="/" onClick={signOut} className="p-4">
					Sign Out
				</Link>
			)}
			{isLoggedIn && <WalletButton />}
		</div>
	);
};

export default Dropdown;
