import { UserInDB } from 'types/user.interface';

export default async function newUser(
	uid: string,
	firstname?: string,
	lastname?: string,
	email?: string,
	photoURL?: string
): Promise<UserInDB> {
	const res = await fetch(
		`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/new`,
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
				photoUrl: photoURL ?? null,
			}),
		}
	);
	return res.json();
}
