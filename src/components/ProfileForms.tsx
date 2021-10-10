import React, { FC, useEffect, useState } from 'react';
import { useForm, SubmitHandler, FieldError } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { UserInDB } from 'types/user.interface';
import cookie from 'react-cookies';
import { UserUpdate } from 'types/user.interface';
import updateUser from 'lib/user/endpoints/updateUser';
import { auth } from 'lib/firebase';
import { getUserInDB } from 'lib/user/database/getUserInDB';
import { useUser } from 'Hooks';
import { Redirect } from 'react-router-dom';

const ProfileForms: FC = () => {
	const [user] = useUser();
	const [userInDB, setUserInDB] = useState<UserInDB | null>(null);

	useEffect(() => {
		const updateUser = async () => {
			setUserInDB(await getUserInDB(user));
		};
		updateUser();
	}, []);

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
	};

	const textBoxColor = (error?: FieldError) =>
		error ? 'border-red-500 bg-red-200' : 'border-gray-300 bg-gray-200';

	return (
		<>
			<div className="font-body text-base18 bg-darkcyan relative block overflow-hidden">
				<div className="min-h-screen flex flex-col justify-center items-center relative">
					<div className="mx-7 h-96 bg-white rounded-2xl relative block overflow-hidden w-80 z-30">
						<div className="absolute inset-x-0 top-0">
							<img src="/assets/images/bg-pattern-card.svg" alt="pattern" />
							<div className="relative block">
								<div className="absolute -top-10  left-1/2 -ml-12">
									{auth.currentUser?.photoURL && (
										<img
											src={auth.currentUser?.photoURL ?? ''}
											className="rounded-full w-10/11 border-4 border-white"
										/>
									)}
								</div>
							</div>
						</div>
						<div className="mt-56 flex flex-col justify-center items-center relative">
							<div className="flex flex-col justify-around">
								<div className="flex flex-row justify-around">
									<div className="text-darkDesaturatedBlue font-bold">
										{auth.currentUser?.displayName ?? ''}
									</div>
									<div className="text-darkGray ml-2">26</div>
								</div>
								<div className="text-darkGray  text-sm text-center mt-3">
									{userInDB?.username ?? ''}
								</div>
							</div>
							<hr className="mt-4 w-full text-darkGrayishBlue" />

							<div className="mt-4 flex flex-row justify-between items-center h-14">
								<div className="flex flex-col w-20">
									<div className="text-darkDesaturatedBlue font-bold text-center">
										<input
											{...register('username')}
											className={`text-gray-700 focus:outline-none focus:shadow-outline border  ${textBoxColor(
												errors.username
											)} rounded py-2 px-4 block w-full appearance-none`}
											type="username"
											value={userInDB?.username ?? ''}
											onChange={onChangeUsernameHandler}
										/>
									</div>
									<div className="text-darkGray text-xs text-center mt-3">
										Followers
									</div>
								</div>
								<div className="flex flex-col w-20">
									<div className="text-darkDesaturatedBlue font-bold text-center">
										803K
									</div>
									<div className="text-darkGray text-xs text-center mt-3">
										Likes
									</div>
								</div>
								<div className="flex flex-col w-20">
									<div className="text-darkDesaturatedBlue font-bold text-center">
										1.4K
									</div>
									<div className="text-darkGray text-xs text-center mt-3">
										Photos
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProfileForms;
