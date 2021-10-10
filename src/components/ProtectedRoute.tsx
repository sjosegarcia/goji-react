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
	const [user] = useUser();
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
		if (user === 'NOT_YET_LOADED')
			return (
				<div className="justify-center w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
					<span className="text-yellow-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0">
						<i className="fas fa-circle-notch fa-spin fa-5x"></i>
					</span>
				</div>
			);
	}
	return <Route {...routeProps} />;
}
