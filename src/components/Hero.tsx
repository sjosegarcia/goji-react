
import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div className='bg-white h-screen flex flex-col justify-center items-center text-center'>
            <h1 className='lg:text-9xl md:text-7xl sm:text-5xl text-3xl font-black mb-14'>
                THE PLACE TO LEARN CRYPTO
            </h1>
            <Link
                className='py-6 px-10 bg-yellow-500 rounded-full text-3xl hover:bg-yellow-300 transition duration-300 ease-in-out flex items-center animate-bounce'
                to='/login'
            >
                Start Now{' '}
                <svg
                    className='w-6 h-6 ml-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122'
                    />
                </svg>
            </Link>
        </div>
    );
};

export default Hero;