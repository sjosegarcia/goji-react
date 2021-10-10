import { UserInDB } from 'types/user.interface';
import { User } from '@firebase/auth-types';

export default async function getAuthenticatedUser(
	idToken: string
): Promise<UserInDB | null> {
	if (!idToken) return null;
	const res = await fetch(`${process.env.REACT_APP_FULL_BACKEND_URL}/user/me`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${idToken}`,
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
	});
	return res.json();
}
