import React, { FC } from 'react';
import Tippy, { useSingleton } from '@tippyjs/react';

type Placement = 'bottom' | 'top' | 'left' | 'right';

type ButtonProps = {
	toolTipMsg?: string | null;
	toolTipPlacement?: Placement | undefined;
	type?: string | null;
	buttonText?: string | null;
	onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

const Button: FC<ButtonProps> = (props: ButtonProps) => {
	const [source, target] = useSingleton({
		overrides: ['placement'],
	});

	if (props.toolTipMsg)
		return (
			<>
				<Tippy singleton={source} delay={200} />

				<Tippy
					className="z-10"
					content={props.toolTipMsg}
					singleton={target}
					placement={props.toolTipPlacement}
				>
					<button
						type="button"
						onClick={props.onClick}
						className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-yellow-500 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
					>
						{props.buttonText}
					</button>
				</Tippy>
			</>
		);
	return (
		<button
			type="button"
			onClick={props.onClick}
			className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-yellow-500 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
		>
			{props.buttonText}
		</button>
	);
};

export default Button;
