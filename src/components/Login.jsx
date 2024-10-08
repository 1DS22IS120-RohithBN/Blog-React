import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import Input from './Input';
import Logo from './Logo';
import authservice from '../appwrite/auth';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    const login = async (data) => {
        setError("");
        try {
            const session = await authservice.login(data);
            if (session) {
                const userData = await authservice.getCurrentUser();
                console.log(userData);
                if (userData) {
                    dispatch(authLogin(userData)); // Dispatch the correct user data
                    navigate('/');
                }
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg bg-[#E9EFEC] rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have an account?&nbsp;
                    <Link to="/signup" className="font-medium text-primary transition-all duration-200 hover:underline">
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                            className="hover:outline-black"

                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) || "Email Address must be valid"
                                }
                            })}
                        />
                        <Input
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                            className="hover:outline-black"
                            {...register("password", {
                                required: true,
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters long"
                                }
                            })}
                        />
                        <button type='submit' className='w-full bg-[#16423C] h-12 rounded-xl text-white hover:bg-[#2a6f66]'>Sign in</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
