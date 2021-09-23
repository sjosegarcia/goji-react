import removeIdToken from 'lib/token/removeIdToken';
import removeUser from 'lib/users/removeUser';
import { auth } from '../firebase';

export default function signOut() {
	auth.signOut();
	removeIdToken();
	removeUser();
}
