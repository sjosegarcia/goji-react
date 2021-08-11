import { UserInDB } from 'types/user.interface';

export default async function newUser(
	uid: string,
	firstName: string,
	lastName: string,
	emailAddress: string
): Promise<UserInDB> {
	const res = await fetch(`http://10.0.0.70:8080/api/v1/user/new`, {
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
	});
	return res.json();
}
