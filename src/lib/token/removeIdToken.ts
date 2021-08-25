import cookie from 'react-cookies';

export default function removeIdToken() {
	cookie.remove('idToken');
}
