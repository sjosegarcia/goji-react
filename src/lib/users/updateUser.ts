import { UserInDB, UserUpdate } from 'types/user.interface';

export default async function updateUser(
	updateUser: UserUpdate
): Promise<UserInDB> {
	const res = await fetch(
		`${process.env.REACT_APP_FULL_BACKEND_URL}/me/update`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updateUser),
		}
	);
	return res.json();
}
