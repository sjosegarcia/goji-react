import { UserInDB } from 'types/user.interface';

export default async function getUserById(id: number): Promise<UserInDB> {
	const res = await fetch(
		`${process.env.REACT_APP_FULL_BACKEND_URL}/user/id/${id}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
		}
	);
	return res.json();
}
