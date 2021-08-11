import cookie from 'react-cookies';

export default async function storeIdToken(idToken?: Promise<string>) {
	if (!idToken) return;
	let token = await idToken;
	cookie.save('idToken', token, { path: '/' });
}
