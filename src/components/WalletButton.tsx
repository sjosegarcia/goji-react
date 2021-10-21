import { useWallet } from 'Hooks';
import React, { FC, useState } from 'react';
import connect from 'lib/zilliqa/zilpay';

import { shortenAddress } from 'lib/zilliqa/shortenAddress';
import copyTextToClipboard from 'lib/util/Clipboard';
import CirleProgressIndicator from './CircleProgressIndicator';

const WalletButton: FC = () => {
	const walletAccount = useWallet();

	const copyToClipboard = async () => {
		if (
			!walletAccount ||
			walletAccount === 'ZILPAY_NOT_INSTALLED' ||
			walletAccount === 'ZILPAY_NOT_UNLOCKED' ||
			walletAccount === 'ZILPAY_NOT_CONNECTED'
		)
			return;
		try {
			let copied = await copyTextToClipboard(walletAccount.bech32);
		} catch (e: unknown) {
			console.log(e);
		}
	};

	const displayWalletButton = () => {
		if (!walletAccount) return <CirleProgressIndicator />;
		if (walletAccount === 'ZILPAY_NOT_INSTALLED') {
			return (
				<button
					type="submit"
					onClick={connect}
					className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-yellow-500 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
				>
					Install Zilpay
				</button>
			);
		}
		if (walletAccount === 'ZILPAY_NOT_UNLOCKED') {
			return (
				<button
					type="submit"
					onClick={connect}
					className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-yellow-500 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
				>
					Unlock Zilpay
				</button>
			);
		}
		if (walletAccount === 'ZILPAY_NOT_CONNECTED') {
			return (
				<button
					type="submit"
					onClick={connect}
					className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-yellow-500 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
				>
					Connect Zilpay
				</button>
			);
		}
		return (
			<button
				onClick={copyToClipboard}
				className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-yellow-500 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
			>
				{shortenAddress(walletAccount.bech32)}
			</button>
		);
	};
	return <>{displayWalletButton()}</>;
};

export default WalletButton;
