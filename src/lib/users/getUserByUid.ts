import { UserInDB } from 'types/user.interface';

export default async function getUserByUid(uid: string): Promise<UserInDB> {
	const res = await fetch(
		`${process.env.REACT_APP_FULL_BACKEND_URL}/api/v1/user/uid/${uid}`
	);
	return res.json();
}
