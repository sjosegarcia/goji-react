import React, { FC } from 'react';

const CirleProgressIndicator: FC = () => {
	return (
		<div className="justify-center fixed block top-0 left-0 bg-white opacity-75 z-50">
			<span className="text-yellow-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0">
				<i className="fas fa-circle-notch fa-spin fa-5x"></i>
			</span>
		</div>
	);
};

export default CirleProgressIndicator;
