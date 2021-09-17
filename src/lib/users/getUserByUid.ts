import { UserInDB } from 'types/user.interface';

export default async function getUserByUid(
	uid: string
): Promise<UserInDB | null> {
	const res = await fetch(
		`${process.env.REACT_APP_FULL_BACKEND_URL}/user/uid/${uid}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
		}
	);
	if (res.status == 400) return null;
	return res.json();
}
