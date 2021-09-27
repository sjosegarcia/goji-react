import React, { FC, useEffect, useState } from 'react';
import { useForm, SubmitHandler, FieldError } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { UserInDB } from 'types/user.interface';
import cookie from 'react-cookies';
import { UserUpdate } from 'types/user.interface';
import updateUser from 'lib/users/updateUser';

const ProfileForms: FC = () => {
	const [userInDB, setUserInDB] = useState<UserInDB | undefined>(
		cookie.load('user') as UserInDB
	);

	useEffect(() => {
		const updateUser = () => {
			const user = cookie.load('user') as UserInDB;
			setUserInDB(user);
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
		<div className="bg-white h-screen flex flex-col justify-center">
			<div className="py-6">
				<div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
					<div className="w-full p-8 lg:w">
						<h2 className="text-2xl font-semibold text-gray-700 text-center">
							Edit Profile
						</h2>
						<div className="mt-4">
							<label className="block text-gray-700 text-sm font-bold mb-2">
								Username
							</label>
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
						<div className="mt-4">
							<label className="block text-gray-700 text-sm font-bold mb-2">
								Email Address
							</label>
							<input
								{...register('email')}
								className={`text-gray-700 focus:outline-none focus:shadow-outline border  ${textBoxColor(
									errors.email
								)} rounded py-2 px-4 block w-full appearance-none`}
								type="email"
								value={userInDB?.email ?? ''}
								onChange={onChangeEmailHandler}
							/>
						</div>
						<div className="mt-4">
							<label className="block text-gray-700 text-sm font-bold mb-2">
								Firstname
							</label>
							<input
								{...register('firstname')}
								className={`text-gray-700 focus:outline-none focus:shadow-outline border  ${textBoxColor(
									errors.firstname
								)} rounded py-2 px-4 block w-full appearance-none`}
								type="firstname"
								value={userInDB?.firstname ?? ''}
								onChange={onChangeFirstnameHandler}
							/>
						</div>
						<div className="mt-4">
							<label className="block text-gray-700 text-sm font-bold mb-2">
								Lastname
							</label>
							<input
								{...register('lastname')}
								className={`text-gray-700 focus:outline-none focus:shadow-outline border  ${textBoxColor(
									errors.lastname
								)} rounded py-2 px-4 block w-full appearance-none`}
								type="lastname"
								value={userInDB?.lastname ?? ''}
								onChange={onChangeLastnameHandler}
							/>
						</div>
						<div className="mt-8">
							<button
								onClick={handleSubmit(onSubmit)}
								className="bg-yellow-500 text-gray-700 font-bold py-2 px-4 w-full rounded hover:bg-yellow-300"
							>
								Update
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileForms;
