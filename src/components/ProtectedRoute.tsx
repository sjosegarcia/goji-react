import React, { useEffect } from 'react';
import { Redirect, Route, RouteProps, useLocation } from 'react-router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'lib/firebase';

export type ProtectedRouteProps = {
	authenticationPath: string;
	redirectPath: string;
	setRedirectPath: (path: string) => void;
} & RouteProps;

export default function ProtectedRoute({
	authenticationPath,
	redirectPath,
	setRedirectPath,
	...routeProps
}: ProtectedRouteProps) {
	const currentLocation = useLocation();
	const [user, loading] = useAuthState(auth);

	useEffect(() => {
		if (!user) setRedirectPath(currentLocation.pathname);
		if (user && redirectPath !== '') setRedirectPath('');
	}, [user]);

	if (loading) return null;
	if (user) {
		return <Route {...routeProps} />;
	} else {
		return (
			<Redirect
				to={{
					pathname: user ? redirectPath : authenticationPath,
				}}
			/>
		);
	}
}
