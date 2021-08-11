import { UserInDB } from 'types/user.interface';

export default async function getAuthenticatedUser(): Promise<UserInDB> {
	const res = await fetch(`${process.env.REACT_APP_FULL_BACKEND_URL}/me`);
	return res.json();
}
