import React, { FC, useState, Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { ChevronDown, Copy } from 'react-feather';

import { useWallet } from 'Hooks';
import copyTextToClipboard from 'lib/util/Clipboard';
import { shortenAddress } from 'lib/zilliqa/shortenAddress';
import CirleProgressIndicator from './CircleProgressIndicator';

const AccountPopover: FC = () => {
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

	const displayWalletText = () => {
		if (!walletAccount) return <CirleProgressIndicator />;
		if (walletAccount === 'ZILPAY_NOT_INSTALLED') return 'Install ZilPay';
		if (walletAccount === 'ZILPAY_NOT_UNLOCKED') return 'Unlock ZilPay';
		if (walletAccount === 'ZILPAY_NOT_CONNECTED') return 'Connect to ZilPay';
		return shortenAddress(walletAccount.bech32);
	};

	return (
		<Popover>
			{({ open }) => (
				<>
					<Popover.Button className="menu-item-active inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-yellow-500 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
						{displayWalletText()}
						<ChevronDown size={14} className="" />
					</Popover.Button>
					<Transition
						show={open}
						as={Fragment}
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
					>
						<Popover.Panel>
							<div className="grid grid-cols-2">
								<a href="/analytics">Analytics</a>
								<a href="/engagement">Engagement</a>
								<a href="/security">Security</a>
								<a href="/integrations">Integrations</a>
							</div>
						</Popover.Panel>
					</Transition>
				</>
			)}
		</Popover>
	);
};

export default AccountPopover;
