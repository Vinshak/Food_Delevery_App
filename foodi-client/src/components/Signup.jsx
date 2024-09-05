import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from '../contexts/AuthProvider';
import Modal from './Modal';

const Signup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, signUpWithGmail } = useContext(AuthContext);

    //redirecting to home page
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const onSubmit = async (data) => {
        try {
            const email = data.email;
            const password = data.password;
            const result = await createUser(email, password);
            const user = result.user;
            alert("Account creation successfully done");

            document.getElementById('my_modal_5').close()
            navigate(from, {replace: true})
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(`Error: ${errorMessage}`);
        }
    };

    return (
        <div className='max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20'>
            <div className="modal-action flex flex-col justify-center mt-0">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body" method='dialog'>
                    <h3 className='font-bold text-lg'>Create An Account</h3>

                    {/* Email */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="email" className="input input-bordered" {...register("email", { required: true })} />
                        {errors.email && <p className="text-red-500">Email is required</p>}
                    </div>

                    {/* Password */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="password" className="input input-bordered" {...register("password", { required: true })} />
                        {errors.password && <p className="text-red-500">Password is required</p>}
                        <label className="label mt-1">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>

                    {/* Signup Button */}
                    <div className="form-control mt-6">
                        <input type='submit' value='Signup' className="btn bg-green text-white" />
                    </div>

                    <p className='text-center my-2 '>Have an account? <button type='button' className='underline text-right ml-1'
                        onClick={() => document.getElementById('my_modal_5').showModal()}
                    >Login</button></p>

                    <Link
                        to="/"
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>
                </form>
                <div className='text-center space-x-3 mb-5'>
                    <button onClick={signUpWithGmail} className="btn btn-circle hover:bg-green hover:text-white">
                        <FaGoogle />
                    </button>
                    <button className="btn btn-circle hover:bg-green hover:text-white">
                        <FaFacebookF />
                    </button>
                    <button className="btn btn-circle hover:bg-green hover:text-white">
                        <FaGithub />
                    </button>
                </div>
            </div>
            <Modal />
        </div>
    );
};

export default Signup;
