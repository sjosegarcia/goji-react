import { UserInDB } from 'types/user.interface';

export default async function newUser(
	firstName: string,
	lastName: string,
	emailAddress: string
): Promise<UserInDB> {
	const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/new`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			fitstname: firstName,
			lastname: lastName,
			email: emailAddress,
		}),
	});
	return res.json();
}
