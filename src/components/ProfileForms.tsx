import React, { FC, useEffect, useState } from 'react';
import { useForm, SubmitHandler, FieldError } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { UserInDB } from 'types/user.interface';
import { UserUpdate } from 'types/user.interface';
import updateUser from 'lib/user/endpoints/updateUser';
import { auth } from 'lib/firebase';
import { getUserInDB } from 'lib/user/database/getUserInDB';
import { useUser } from 'Hooks';

const ProfileForms: FC = () => {
	const user = useUser();
	const [userInDB, setUserInDB] = useState<UserInDB | null>(null);

	useEffect(() => {
		const updateUser = async () => {
			setUserInDB(await getUserInDB(user));
		};
		if (!userInDB) updateUser();
	}, []);

	/*
	const onSubmit: SubmitHandler<UserInDB> = async (data) => {
		const updateUserInfo = {
			email: data.email ?? '',
			firstname: data.firstname ?? '',
			lastname: data.lastname ?? '',
			username: data.username ?? '',
		} as UserUpdate;
		const updatedUser = await updateUser(updateUserInfo);
		setUserInDB(updatedUser);
		cookie.save('user', updatedUser, { path: '/' });
	};

	const schema = yup.object().shape({
		username: yup.string().required().min(3).max(12),
		firstname: yup.string().max(20),
		lastname: yup.string(),
		email: yup.string().email('Please provide a valid email address'),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UserInDB>({
		defaultValues: {
			username: userInDB?.username ?? '',
			firstname: userInDB?.firstname ?? '',
			lastname: userInDB?.lastname ?? '',
			email: userInDB?.email ?? '',
		},
		resolver: yupResolver(schema),
	});

	const onChangeUsernameHandler = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setUserInDB({
			id: userInDB?.id,
			username: event.target.value,
			firstname: userInDB?.firstname,
			lastname: userInDB?.lastname,
			email: userInDB?.email,
		} as UserInDB);
	};

	const onChangeEmailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUserInDB({
			id: userInDB?.id,
			username: userInDB?.username,
			firstname: userInDB?.firstname,
			lastname: userInDB?.lastname,
			email: event.target.value,
		} as UserInDB);
	};

	const onChangeFirstnameHandler = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setUserInDB({
			id: userInDB?.id,
			username: userInDB?.username,
			firstname: event.target.value,
			lastname: userInDB?.lastname,
			email: userInDB?.email,
		} as UserInDB);
	};

	const onChangeLastnameHandler = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setUserInDB({
			id: userInDB?.id,
			username: userInDB?.username,
			firstname: userInDB?.firstname,
			lastname: event.target.value,
			email: userInDB?.email,
		} as UserInDB);
	};*/

	const noProfileImageIcon = () => (
		<svg
			className="h-full w-full text-gray-300"
			fill="currentColor"
			viewBox="0 0 24 24"
		>
			<path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
		</svg>
	);

	const getPhoto = () => {
		if (!user || user === 'NOT_YET_LOADED') return noProfileImageIcon();
		return user.photoURL ? <img src={user.photoURL} /> : noProfileImageIcon();
	};

	const getFullName = () => {
		if (!user || user === 'NOT_YET_LOADED') return '';
		if (userInDB) {
			const fullName = `${userInDB.firstname} ${userInDB.lastname}`;
			if (!fullName) return user.displayName;
			return fullName;
		}
		return user.displayName;
	};

	const textBoxColor = (error?: FieldError) =>
		error ? 'border-red-500 bg-red-200' : 'border-gray-300 bg-gray-200';

	const editPencil = () => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="15"
			height="15"
			viewBox="0 0 24 24"
			fill="none"
			stroke="#F59E0B"
			strokeWidth="3"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="feather feather-edit-2"
		>
			<path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
		</svg>
	);

	return (
		<div className="">
			<div className="px-10">
				<div className="md:grid md:grid-cols-3 md:gap-6 py-20">
					<div className="md:col-span-1">
						<div className="px-4 sm:px-0">
							<h3 className="text-lg font-medium leading-6 text-gray-900">
								Profile
							</h3>
							<p className="mt-1 text-sm text-gray-600">
								This information will be displayed publicly so be careful what
								you share.
							</p>
						</div>
					</div>
					<div className="mt-5 md:mt-0 md:col-span-2">
						<form action="#" method="POST">
							<div className="shadow sm:rounded-md sm:overflow-hidden">
								<div className="px-4 py-5 bg-white space-y-6 sm:p-6">
									<div className="grid grid-cols-3 gap-6">
										<div className="col-span-3 sm:col-span-2">
											<label
												htmlFor="company-website"
												className="block text-sm font-medium text-gray-700"
											>
												Website
											</label>
											<div className="mt-1 flex rounded-md shadow-sm">
												<span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
													http://
												</span>
												<input
													type="text"
													name="company-website"
													id="company-website"
													className="focus:ring-gray-500 focus:border-gray-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
													placeholder="www.example.com"
												/>
											</div>
										</div>
									</div>

									<div>
										<label
											htmlFor="about"
											className="block text-sm font-medium text-gray-700"
										>
											About
										</label>
										<div className="mt-1">
											<textarea
												id="about"
												name="about"
												rows={3}
												className="shadow-sm focus:ring-gray-500 focus:border-gray-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
												placeholder="you@example.com"
												defaultValue={''}
											/>
										</div>
										<p className="mt-2 text-sm text-gray-500">
											Brief description for your profile. URLs are hyperlinked.
										</p>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700">
											Photo
										</label>
										<div className="mt-1 flex items-center">
											<span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
												{getPhoto()}
											</span>
											<button
												type="button"
												className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
											>
												Change
											</button>
										</div>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700">
											Cover photo
										</label>
										<div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
											<div className="space-y-1 text-center">
												<svg
													className="mx-auto h-12 w-12 text-gray-400"
													stroke="currentColor"
													fill="none"
													viewBox="0 0 48 48"
													aria-hidden="true"
												>
													<path
														d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
														strokeWidth={2}
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
												<div className="flex text-sm text-gray-600">
													<label
														htmlFor="file-upload"
														className="relative cursor-pointer bg-white rounded-md font-medium text-gray-500 hover:text-gray-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-gray-500"
													>
														<span>Upload a file</span>
														<input
															id="file-upload"
															name="file-upload"
															type="file"
															className="sr-only"
														/>
													</label>
													<p className="pl-1">or drag and drop</p>
												</div>
												<p className="text-xs text-gray-500">
													PNG, JPG, GIF up to 10MB
												</p>
											</div>
										</div>
									</div>
								</div>
								<div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
									<button
										type="submit"
										className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-yellow-500 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
									>
										Save
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>

			<div className="hidden sm:block" aria-hidden="true">
				<div className="px-10 py-5">
					<div className="border-t border-gray-200" />
				</div>
			</div>

			<div className="mt-10 sm:mt-0 px-10">
				<div className="md:grid md:grid-cols-3 md:gap-6">
					<div className="md:col-span-1">
						<div className="px-4 sm:px-0">
							<h3 className="text-lg font-medium leading-6 text-gray-900">
								Personal Information
							</h3>
							<p className="mt-1 text-sm text-gray-600">
								Use a permanent address where you can receive mail.
							</p>
						</div>
					</div>
					<div className="mt-5 md:mt-0 md:col-span-2">
						<form action="#" method="POST">
							<div className="shadow overflow-hidden sm:rounded-md">
								<div className="px-4 py-5 bg-white sm:p-6">
									<div className="grid grid-cols-6 gap-6">
										<div className="col-span-6 sm:col-span-3">
											<label
												htmlFor="first-name"
												className="block text-sm font-medium text-gray-700"
											>
												First name
											</label>
											<input
												type="text"
												name="first-name"
												id="first-name"
												autoComplete="given-name"
												className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</div>

										<div className="col-span-6 sm:col-span-3">
											<label
												htmlFor="last-name"
												className="block text-sm font-medium text-gray-700"
											>
												Last name
											</label>
											<input
												type="text"
												name="last-name"
												id="last-name"
												autoComplete="family-name"
												className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</div>

										<div className="col-span-6 sm:col-span-4">
											<label
												htmlFor="email-address"
												className="block text-sm font-medium text-gray-700"
											>
												Email address
											</label>
											<input
												type="text"
												name="email-address"
												id="email-address"
												autoComplete="email"
												className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</div>

										<div className="col-span-6 sm:col-span-3">
											<label
												htmlFor="country"
												className="block text-sm font-medium text-gray-700"
											>
												Country / Region
											</label>
											<select
												id="country"
												name="country"
												autoComplete="country"
												className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
											>
												<option>United States</option>
												<option>Canada</option>
												<option>Mexico</option>
											</select>
										</div>

										<div className="col-span-6">
											<label
												htmlFor="street-address"
												className="block text-sm font-medium text-gray-700"
											>
												Street address
											</label>
											<input
												type="text"
												name="street-address"
												id="street-address"
												autoComplete="street-address"
												className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</div>

										<div className="col-span-6 sm:col-span-6 lg:col-span-2">
											<label
												htmlFor="city"
												className="block text-sm font-medium text-gray-700"
											>
												City
											</label>
											<input
												type="text"
												name="city"
												id="city"
												className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</div>

										<div className="col-span-6 sm:col-span-3 lg:col-span-2">
											<label
												htmlFor="state"
												className="block text-sm font-medium text-gray-700"
											>
												State / Province
											</label>
											<input
												type="text"
												name="state"
												id="state"
												className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</div>

										<div className="col-span-6 sm:col-span-3 lg:col-span-2">
											<label
												htmlFor="postal-code"
												className="block text-sm font-medium text-gray-700"
											>
												ZIP / Postal
											</label>
											<input
												type="text"
												name="postal-code"
												id="postal-code"
												autoComplete="postal-code"
												className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											/>
										</div>
									</div>
								</div>
								<div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
									<button
										type="submit"
										className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-yellow-500 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
									>
										Save
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
export default ProfileForms;
/*

			<div className="hidden sm:block" aria-hidden="true">
				<div className="px-10 py-5">
					<div className="border-t border-gray-200" />
				</div>
			</div>

			<div className="mt-10 sm:mt-0 px-10">
				<div className="md:grid md:grid-cols-3 md:gap-6">
					<div className="md:col-span-1">
						<div className="px-4 sm:px-0">
							<h3 className="text-lg font-medium leading-6 text-gray-900">
								Notifications
							</h3>
							<p className="mt-1 text-sm text-gray-600">
								Decide which communications you would like to receive and how.
							</p>
						</div>
					</div>
					<div className="mt-5 md:mt-0 md:col-span-2">
						<form action="#" method="POST">
							<div className="shadow overflow-hidden sm:rounded-md">
								<div className="px-4 py-5 bg-white space-y-6 sm:p-6">
									<fieldset>
										<legend className="text-base font-medium text-gray-900">
											By Email
										</legend>
										<div className="mt-4 space-y-4">
											<div className="flex items-start">
												<div className="flex items-center h-5">
													<input
														id="comments"
														name="comments"
														type="checkbox"
														className="focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300 rounded"
													/>
												</div>
												<div className="ml-3 text-sm">
													<label
														htmlFor="comments"
														className="font-medium text-gray-700"
													>
														Comments
													</label>
													<p className="text-gray-500">
														Get notified when someones posts a comment on a
														posting.
													</p>
												</div>
											</div>
											<div className="flex items-start">
												<div className="flex items-center h-5">
													<input
														id="candidates"
														name="candidates"
														type="checkbox"
														className="focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300 rounded"
													/>
												</div>
												<div className="ml-3 text-sm">
													<label
														htmlFor="candidates"
														className="font-medium text-gray-700"
													>
														Candidates
													</label>
													<p className="text-gray-500">
														Get notified when a candidate applies for a job.
													</p>
												</div>
											</div>
											<div className="flex items-start">
												<div className="flex items-center h-5">
													<input
														id="offers"
														name="offers"
														type="checkbox"
														className="focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300 rounded"
													/>
												</div>
												<div className="ml-3 text-sm">
													<label
														htmlFor="offers"
														className="font-medium text-gray-700"
													>
														Offers
													</label>
													<p className="text-gray-500">
														Get notified when a candidate accepts or rejects an
														offer.
													</p>
												</div>
											</div>
										</div>
									</fieldset>
									<fieldset>
										<div>
											<legend className="text-base font-medium text-gray-900">
												Push Notifications
											</legend>
											<p className="text-sm text-gray-500">
												These are delivered via SMS to your mobile phone.
											</p>
										</div>
										<div className="mt-4 space-y-4">
											<div className="flex items-center">
												<input
													id="push-everything"
													name="push-notifications"
													type="radio"
													className="focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300"
												/>
												<label
													htmlFor="push-everything"
													className="ml-3 block text-sm font-medium text-gray-700"
												>
													Everything
												</label>
											</div>
											<div className="flex items-center">
												<input
													id="push-email"
													name="push-notifications"
													type="radio"
													className="focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300"
												/>
												<label
													htmlFor="push-email"
													className="ml-3 block text-sm font-medium text-gray-700"
												>
													Same as email
												</label>
											</div>
											<div className="flex items-center">
												<input
													id="push-nothing"
													name="push-notifications"
													type="radio"
													className="focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300"
												/>
												<label
													htmlFor="push-nothing"
													className="ml-3 block text-sm font-medium text-gray-700"
												>
													No push notifications
												</label>
											</div>
										</div>
									</fieldset>
								</div>
								<div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
									<button
										type="submit"
										className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-yellow-500 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
									>
										Save
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
*/
