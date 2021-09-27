import React, { createContext, useContext, useState } from 'react';
import { initialSession, Session } from 'types/session.interface';

interface Props {
	children?: React.ReactNode;
}

export const SessionContext = createContext<
	[Session, (session: Session) => void]
	// eslint-disable-next-line indent
>([initialSession, () => {}]);
export const useSessionContext = () => useContext(SessionContext);

export const SessionContextProvider: React.FC = (props: Props) => {
	const [sessionState, setSessionState] = useState(initialSession);
	const defaultSessionContext: [Session, typeof setSessionState] = [
		sessionState,
		setSessionState,
	];

	return (
		<SessionContext.Provider value={defaultSessionContext}>
			{props.children}
		</SessionContext.Provider>
	);
};
