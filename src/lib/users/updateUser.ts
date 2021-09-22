import { UserInDB, UserUpdate } from 'types/user.interface';
import cookie from 'react-cookies';

export default async function updateUser(
	updateUser: UserUpdate
): Promise<UserInDB> {
	const token = cookie.load('idToken');
	const res = await fetch(
		`${process.env.REACT_APP_FULL_BACKEND_URL}/user/me/update`,
		{
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
			body: JSON.stringify(updateUser),
		}
	);
	return res.json();
}
