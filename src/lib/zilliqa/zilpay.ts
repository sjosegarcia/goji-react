import { ZilPayConnectException } from 'types/zilliqa.interface';

export default async function connect(): Promise<
	ZilPayConnectException | string
	// eslint-disable-next-line indent
> {
	const zilpay = (window as any).zilPay;

	if (typeof zilpay === 'undefined') {
		const notInstalled: ZilPayConnectException = {
			name: 'ZILPAY_NOT_INSTALLED',
			message: 'Please install the Zilpay wallet extension and try again',
		};
		throw notInstalled;
	}

	const isConnected = await zilpay.wallet.connect();

	if (!isConnected) {
		const notInstalled: ZilPayConnectException = {
			name: 'ZILPAY_NOT_CONNECTED',
			message: 'Could not connect to the Zilpay wallet, please try again.',
		};
		throw notInstalled;
	}

	return zilpay.wallet.defaultAccount.bech32;
}

export function isInstalled(): boolean {
	const zilpay = (window as any).zilpay;
	return typeof zilpay === 'undefined';
}

export function isConnected(): boolean {
	const zilpay = (window as any).zilPay;
	return zilpay.wallet.isConnect;
}

export function isUnlocked(): boolean {
	const zilpay = (window as any).zilPay;
	return zilpay.wallet.isEnable;
}

export function getObservableAccount(): any {
	const zilpay = (window as any).zilPay;
	const accountStreamChanged = zilpay.wallet.observableAccount();
	return accountStreamChanged;
}

export function getDefaultWallet(): any {
	const zilpay = (window as any).zilPay;
	return zilpay.wallet.defaultAccount;
}

export function getBech32Address(): string {
	const zilpay = (window as any).zilPay;
	return zilpay.wallet.defaultAccount.bech32;
}
