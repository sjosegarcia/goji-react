import { auth } from '../firebase';

export default function signOut() {
	auth.signOut();
}
