import { UserInDB } from 'types/user.interface';

export default async function newUser(
	uid: string,
	firstname?: string,
	lastname?: string,
	email?: string,
	photoURL?: string
): Promise<UserInDB> {
	const res = await fetch(
		`${process.env.REACT_APP_FULL_BACKEND_URL}/user/new`,
		{
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
			body: JSON.stringify({
				uid: uid,
				firstname: firstname ?? null,
				lastname: lastname ?? null,
				email: email ?? null,
				photo_url: photoURL ?? null,
			}),
		}
	);
	return res.json();
}
