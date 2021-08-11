import { UserInDB } from 'types/user.interface';

export default async function getUserById(id: number): Promise<UserInDB> {
	const res = await fetch(`${process.env.REACT_APP_FULL_BACKEND_URL}/id/${id}`);
	return res.json();
}
