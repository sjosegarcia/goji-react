import React, { useEffect } from 'react';
import { Redirect, Route, RouteProps, useLocation } from 'react-router';
import { useUser } from 'Hooks';
import firebase from 'firebase/app';

export type ProtectedRouteProps = {
	requiresAuthentication: boolean;
} & RouteProps;

export default function ProtectedRoute({
	requiresAuthentication,
	...routeProps
}: ProtectedRouteProps) {
	const user = useUser();
	if (requiresAuthentication) {
		if (!user) {
			return (
				<Redirect
					to={{
						pathname: '/login',
					}}
				/>
			);
		}
	}
	return <Route {...routeProps} />;
}
