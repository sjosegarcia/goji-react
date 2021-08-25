import cookie from 'react-cookies';

export default function removeUser() {
	cookie.remove('user');
}
