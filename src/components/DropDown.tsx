import React, { FC } from 'react';
import { Link } from 'react-router-dom';

type DropDownProps = {
	isOpen: boolean;
	toggle: () => void;
};

const Dropdown: FC<DropDownProps> = (props: DropDownProps) => {
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
			<Link to="/login" className="p-4">
				Login
			</Link>
		</div>
	);
};

export default Dropdown;
