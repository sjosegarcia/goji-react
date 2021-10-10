import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';

export const useUser = (): [
	firebase.User | 'NOT_YET_LOADED' | null,
	React.Dispatch<React.SetStateAction<firebase.User | 'NOT_YET_LOADED' | null>>
] => {
	const [user, setUser] = useState<firebase.User | null | 'NOT_YET_LOADED'>(
		'NOT_YET_LOADED'
	);

	useEffect(() => {
		return firebase.auth().onAuthStateChanged(async (user) => {
			setUser(user);
		});
	}, []);
	return [user, setUser];
};
