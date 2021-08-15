import { UserInDB } from 'types/user.interface';

export default async function newUser(
	uid: string,
	firstName: string,
	lastName: string,
	emailAddress: string
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
				firstname: firstName,
				lastname: lastName,
				email: emailAddress,
			}),
		}
	);
	return res.json();
}
