import React, { FC, useState } from 'react';
import { useForm, SubmitHandler, FieldError } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { auth } from '../lib/firebase';
import { ForgotPassword } from 'types/user.interface';
import { useUser } from 'Hooks';
import { Redirect } from 'react-router-dom';

const schema = yup.object().shape({
	email: yup
		.string()
		.email('Please provide a valid email address')
		.required('Please provide a valid email address'),
});

const ForgotPasswordForms: FC = () => {
	const user = useUser();
	const [emailSent, setEmailSent] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ForgotPassword>({
		defaultValues: {
			email: '',
		},
		resolver: yupResolver(schema),
	});
	const onSubmit: SubmitHandler<ForgotPassword> = (data) => {
		auth.sendPasswordResetEmail(data.email);
		setEmailSent(true);
	};

	const textBoxColor = (error?: FieldError) =>
		error ? 'border-red-500 bg-red-200' : 'border-gray-300 bg-gray-200';

	if (user && user !== 'NOT_YET_LOADED') return <Redirect to="/" />;

	return (
		<div className="container mx-auto h-screen flex flex-col justify-center">
			<div className="flex justify-center px-6 my-12 bg-gray">
				<div className="w-full xl:w-3/4 lg:w-11/12 flex">
					<div
						className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
						style={{
							backgroundImage: `url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')`,
						}}
					></div>
					<div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
						<div className="px-8 mb-4 text-center">
							<h3 className="pt-4 mb-2 text-2xl">Forgot Your Password?</h3>
							<p className="mb-4 text-sm text-gray-700">
								We get it, stuff happens. Just enter your email address below
								and we will send you a link to reset your password!
							</p>
						</div>
						<form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
							<div className="mb-4">
								<label className="block mb-2 text-sm font-bold text-gray-700">
									Email
								</label>
								<input
									{...register('email')}
									className={`w-full px-3 py-2 text-sm leading-tight ${textBoxColor(
										errors.email
									)}  border rounded shadow appearance-none focus:outline-none focus:shadow-outline `}
									id="email"
									type="email"
									placeholder="Enter Email Address..."
								/>
							</div>
							{errors.email && (
								<span className="text-bold text-xs text-red-500">
									{errors.email.message}
								</span>
							)}
							<div className="mb-6 text-center">
								<button
									className="bg-yellow-500 text-gray-700 font-bold py-2 px-4 w-full rounded hover:bg-yellow-300"
									onClick={handleSubmit(onSubmit)}
									disabled={emailSent}
									type="button"
								>
									Reset Password
								</button>
							</div>
							<hr className="mb-6 border-t" />
							<div className="text-center">
								<a
									className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
									href="/signup"
								>
									Create an Account!
								</a>
							</div>
							<div className="text-center">
								<a
									className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
									href="/login"
								>
									Already have an account? Login!
								</a>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ForgotPasswordForms;
