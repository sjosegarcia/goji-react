import { UserInDB, UserUpdate } from 'types/user.interface';

export default async function updateUser(
	updateUser: UserUpdate
): Promise<UserInDB> {
	const res = await fetch(
		`${process.env.REACT_APP_FULL_BACKEND_URL}/user/me/update`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
			body: JSON.stringify(updateUser),
		}
	);
	return res.json();
}
