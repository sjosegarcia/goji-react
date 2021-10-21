import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import {
	isConnected,
	getObservableAccount,
	isInstalled,
	isUnlocked,
	getDefaultWallet,
} from 'lib/zilliqa/zilpay';

export const useUser = (): firebase.User | 'NOT_YET_LOADED' | null => {
	const [user, setUser] = useState<firebase.User | null | 'NOT_YET_LOADED'>(
		'NOT_YET_LOADED'
	);

	useEffect(() => {
		return firebase.auth().onAuthStateChanged(async (user) => {
			setUser(user);
		});
	}, []);
	return user;
};

export const useWallet = ():
	| 'ZILPAY_NOT_INSTALLED'
	| 'ZILPAY_NOT_UNLOCKED'
	| 'ZILPAY_NOT_CONNECTED'
	| any
	| null => {
	const [walletAccount, setWalletAccount] = useState<
		| 'ZILPAY_NOT_INSTALLED'
		| 'ZILPAY_NOT_UNLOCKED'
		| 'ZILPAY_NOT_CONNECTED'
		| any
		| null
	>(null);

	const getAccount = async () => {
		if (!isInstalled()) {
			setWalletAccount('ZILPAY_NOT_INSTALLED');
			return 'ZILPAY_NOT_INSTALLED';
		}
		if (!isUnlocked()) {
			setWalletAccount('ZILPAY_NOT_UNLOCKED');
			return 'ZILPAY_NOT_UNLOCKED';
		}
		if (!isConnected()) {
			setWalletAccount('ZILPAY_NOT_CONNECTED');
			return 'ZILPAY_NOT_CONNECTED';
		}
		let wallet = getDefaultWallet();
		setWalletAccount(wallet);
	};

	useEffect(() => {
		getAccount();
	}, []);
	return walletAccount;
};
