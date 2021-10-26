import { useWallet } from 'Hooks';
import React, { FC, useState } from 'react';
import connect from 'lib/zilliqa/zilpay';
import { shortenAddress } from 'lib/zilliqa/shortenAddress';
import copyTextToClipboard from 'lib/util/Clipboard';
//import CirleProgressIndicator from './CircleProgressIndicator';
import Button from './Button';
import 'tippy.js/dist/tippy.css';

const WalletButton: FC = () => {
	const [walletAccount] = useWallet();
	const [isCopied, setIsCopied] = useState(false);

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
			let didCopy = typeof copied === 'boolean' ? copied : true;
			setIsCopied(didCopy);
			setTimeout(() => {
				setIsCopied(false);
			}, 3000);
		} catch (e: unknown) {
			setIsCopied(false);
			console.log(e);
		}
	};

	const displayWalletButton = () => {
		if (!walletAccount) return <></>; //<CirleProgressIndicator />;
		if (walletAccount === 'ZILPAY_NOT_INSTALLED')
			return (
				<Button
					toolTipPlacement={'bottom'}
					toolTipMsg={'Install'}
					type={'button'}
					buttonText={'Install Zilpay'}
					onClick={connect}
				/>
			);
		if (walletAccount === 'ZILPAY_NOT_UNLOCKED')
			return (
				<Button
					toolTipPlacement={'bottom'}
					toolTipMsg={'Unlock'}
					type={'button'}
					buttonText={'Unlock Zilpay'}
					onClick={connect}
				/>
			);
		if (walletAccount === 'ZILPAY_NOT_CONNECTED')
			return (
				<Button
					toolTipPlacement={'bottom'}
					toolTipMsg={'Connect'}
					type={'button'}
					buttonText={'Connect to Zilpay'}
					onClick={connect}
				/>
			);

		return (
			<Button
				toolTipPlacement={'bottom'}
				toolTipMsg={!isCopied ? 'Copy' : 'Copied'}
				type={'button'}
				buttonText={shortenAddress(walletAccount.bech32)}
				onClick={copyToClipboard}
			/>
		);
	};
	return <>{displayWalletButton()}</>;
};

export default WalletButton;
