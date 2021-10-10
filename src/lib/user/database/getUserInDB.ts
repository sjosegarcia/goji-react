import { User } from '@firebase/auth-types';
import getUserByUid from '../endpoints/getUserByUid';
import { createNewUserInDB } from './createNewUserInDB';

const retreiveUserByUid = async (uid: string) => {
	if (!uid) return null;
	return await getUserByUid(uid);
};

export const getUserInDB = async (user: User | 'NOT_YET_LOADED' | null) => {
	if (!user || user === 'NOT_YET_LOADED') return null;
	const retreivedUser = await retreiveUserByUid(user.uid);
	if (retreivedUser) return retreivedUser;
	const createdUser = await createNewUserInDB(user);
	if (createdUser) return createdUser;
	return null;
};
