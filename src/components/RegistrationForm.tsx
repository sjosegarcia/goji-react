import React from 'react'
import { UserVerify } from 'types/user.interface';
import { useForm, SubmitHandler } from "react-hook-form";

const RegistrationForms = () => {
    const { register, handleSubmit, watch, formState: {errors} } = useForm<UserVerify>({defaultValues: {firstName: '', lastName: '', emailAddress: '', password: '', passwordConfirm: ''}});
    const onSubmit: SubmitHandler<UserVerify> = data => console.log(data);

    return (
    <div className='bg-white h-screen flex flex-col justify-center'>
            <div className="py-6">
            <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
                <div className="w-full p-8 lg:w">
                    <h2 className="text-2xl font-semibold text-gray-700 text-center">GODZ</h2>
                    <p className="text-xl text-gray-600 text-center">Welcome back!</p>
                    <div className="mt-4">
                        <div className="flex justify-between">
                            <label className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
                        </div>
                        <input {...register("firstName", { required: true, maxLength: 20 })} className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="firstname"/>
                        {errors.firstName && <span>This is a required field</span>}
                    </div>
                    <div className="mt-4">
                        <div className="flex justify-between">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
                        </div>
                        <input {...register("lastName", { required: true, pattern: /^[A-Za-z]+$/i })} className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="lastname"/>
                        {errors.lastName && <span>This is a required field</span>}
                    </div>
                    <div className="mt-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                        <input {...register("emailAddress", { required: true })} className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="email"/>
                        {errors.emailAddress && <span>This is a required field</span>}
                    </div>
                    <div className="mt-4">
                        <div className="flex justify-between">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        </div>
                        <input {...register("password", { required: true })} className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="password"/>
                        {errors.password && <span>This is a required field</span>}
                    </div>
                    <div className="mt-4">
                        <div className="flex justify-between">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
                        </div>
                        <input {...register("passwordConfirm", { required: true })} className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="password"/>
                        {errors.passwordConfirm && <span>This is a required field</span>}
                    </div>
                    <div className="mt-8">
                    <button onClick={handleSubmit(onSubmit)} className="bg-yellow-500 text-gray-700 font-bold py-2 px-4 w-full rounded hover:bg-yellow-300">Sign Up</button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default RegistrationForms;