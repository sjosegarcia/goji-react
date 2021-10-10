import { User } from '@firebase/auth-types';
import getAuthenticatedUser from '../endpoints/getAuthenticatedUser';

export const getAuthUser = async (user: User) => {
	const idToken = await user.getIdToken(true);
	return await getAuthenticatedUser(idToken);
};
