import cookie from 'react-cookies';
import { UserInDB } from 'types/user.interface';

export default function storeUser(userInDb?: UserInDB): UserInDB | undefined {
	if (!userInDb) return undefined;
	cookie.save('user', JSON.stringify(userInDb), { path: '/' });
	return userInDb;
}
