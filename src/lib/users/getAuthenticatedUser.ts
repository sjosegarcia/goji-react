import { UserInDB } from 'types/user.interface';
import cookie from 'react-cookies';

export default async function getAuthenticatedUser(): Promise<UserInDB> {
	const token = cookie.load('idToken');
	const res = await fetch(
		`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/me`,
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
		}
	);
	return res.json();
}
