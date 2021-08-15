import React, { FC, useEffect, useState } from 'react';
import { useForm, SubmitHandler, FieldError } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { auth } from '../lib/firebase';
import { User, UserInDB } from 'types/user.interface';
import { Redirect } from 'react-router-dom';
import getAuthenticatedUser from 'lib/users/getAuthenticatedUser';

const ProfileForms: FC = () => {
	const schema = yup.object().shape({
		username: yup.string().required().max(12).min(3).label('Username'),
		firstName: yup.string().max(20).required('Please provide your first name'),
		lastName: yup.string().required('Please provide your last name'),
		emailAddress: yup
			.string()
			.email('Please provide a valid email address')
			.required('Please provide a valid email address'),
	});

	const [user, setUser] = useState<UserInDB | null>(null);

	const queryUser = async () => {
		const user = await getAuthenticatedUser();
		console.log(user);
		setUser(user);
		return user;
	};

	useEffect(() => {
		const user = queryUser();
	}, []);

	//if (!user) return <Redirect to="/" />;

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<User>({
		defaultValues: {
			username: '',
			firstName: '',
			lastName: '',
			emailAddress: '',
		},
		resolver: yupResolver(schema),
	});

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
							/>
						</div>
						<div className="mt-4">
							<label className="block text-gray-700 text-sm font-bold mb-2">
								Email Address
							</label>
							<input
								{...register('emailAddress')}
								className={`text-gray-700 focus:outline-none focus:shadow-outline border  ${textBoxColor(
									errors.emailAddress
								)} rounded py-2 px-4 block w-full appearance-none`}
								type="email"
							/>
						</div>
						<div className="mt-4">
							<label className="block text-gray-700 text-sm font-bold mb-2">
								Firstname
							</label>
							<input
								{...register('firstName')}
								className={`text-gray-700 focus:outline-none focus:shadow-outline border  ${textBoxColor(
									errors.firstName
								)} rounded py-2 px-4 block w-full appearance-none`}
								type="firstname"
							/>
						</div>
						<div className="mt-4">
							<label className="block text-gray-700 text-sm font-bold mb-2">
								Lastname
							</label>
							<input
								{...register('lastName')}
								className={`text-gray-700 focus:outline-none focus:shadow-outline border  ${textBoxColor(
									errors.lastName
								)} rounded py-2 px-4 block w-full appearance-none`}
								type="lastname"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileForms;
