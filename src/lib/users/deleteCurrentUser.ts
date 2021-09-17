import { UserInDB } from 'types/user.interface';

export default async function deleteCurrentUser(): Promise<UserInDB> {
	const res = await fetch(
		`${process.env.REACT_APP_FULL_BACKEND_URL}/user/me/delete`,
		{
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		}
	);
	return res.json();
}
