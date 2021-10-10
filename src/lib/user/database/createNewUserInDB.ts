import newUser from '../endpoints/newUsers';
import { User } from '@firebase/auth-types';

export const createNewUserInDB = async (user: User) => {
	if (!user) return null;
	const newDBUser = await newUser(
		user.uid,
		undefined,
		undefined,
		user.email ?? undefined,
		user.photoURL ?? undefined
	);
	return newDBUser;
};
