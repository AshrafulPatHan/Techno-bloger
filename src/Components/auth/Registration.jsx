import React, { useState } from 'react';
import Navbar from '../navigation/Navbar';
import Footer from '../navigation/Footer';
import { FaEye } from 'react-icons/fa';
import { FaEyeLowVision } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import auth from '../auth/Firebase/Firebase.init';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';




const Registration = () => {
    const [showpas, setshowpas] = useState(false)
    const navigate = useNavigate();
    // get api link from env file
    const API = import.meta.env.VITE_API;


    const validatePassword = (password) => {
        const upperCaseCheck = /[A-Z]/.test(password);
        const lowerCaseCheck = /[a-z]/.test(password);
        const lengthCheck = password.length >= 6; // Minimum Length Check

        if (!upperCaseCheck) {
            toast.error("Must have an Uppercase leer in the password");
            return false;
        }
        if (!lowerCaseCheck) {
            toast.error("Must have a Lowercase leer in the password");
            return false;
        }
        if (!lengthCheck) {
            toast.error("Length must be at least 6 character");
            return false;
        }
        return true;
    };


    const handelRegistra = (event) => {


        event.preventDefault();

        const name = event.target.name.value;
        const email = event.target.email.value;
        const photoURL = event.target.PhotoURL.value;
        const password = event.target.password.value;

        if (!validatePassword(password)) {
            return;
        }


        console.log(name, email, photoURL, password);


        // Creating a user with Firebase Authentication
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                console.log('User Created:', result.user);
                toast('Registration is sussesfully')
                navigate('/Login');
                // Updating user's profile with name and photoURL
                updateProfile(result.user, {
                    displayName: name,
                    photoURL: photoURL,
                })
                    .then(() => {
                        console.log('Profile updated successfully');
                        const userData = { name, email, photoURL };
                        // -----------send to server
                        fetch(`${API}/userData`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(userData),
                        })
                            .then((res) => res.json())
                            .then((data) => {
                                console.log(data);
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                                toast.error("Error adding Blog");
                            });
                    })
                    .catch((error) => {
                        console.error('Error updating profile:', error.message);
                        toast('soothing is wrang')
                    });
            })
            .catch((error) => {
                console.error('Error creating user:', error.message);
            });




    };


    return (
        <div>
            <div>
                {/* <Navbar /> */}
                <div className='max-w-screen overflow-x-hidden max-h-screen overflow-y-hidden bg-[#e2dada] dark:bg-gray-900 '>
                    <div>
                        <div className="hero  min-h-screen">
                            <div className="flex flex-col lg:flex-row">
                                {/* photo */}
                                <div className='hidden lg:flex w-[50vw] h-screen  bg-blue-300' style={{ backgroundImage: `url('https://i.ibb.co.com/mr817yZC/mountain-7775867.jpg')`, backgroundSize: 'cover' }}>

                                </div>

                                {/* Registration */}
                                <div className='w-[50vw] h-screen flex flex-col items-center justify-center '>
                                    <h2 className='text-lg lg:text-2xl font-bold text-center'>Registration on email and password</h2>
                                    <div className=" w-[300px] lg:w-full max-w-sm shrink-0">
                                        <form onSubmit={handelRegistra} className="card-body">
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text  text-gray-700 dark:text-gray-200">Name</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Name"
                                                    name="name"
                                                    className="input input-bordered bg-white dark:bg-gray-800"
                                                    required
                                                />
                                            </div>
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text text-gray-700 dark:text-gray-200">Email</span>
                                                </label>
                                                <input
                                                    type="email"
                                                    placeholder="email"
                                                    name="email"
                                                    className="input input-bordered bg-white dark:bg-gray-800"
                                                    required
                                                />
                                            </div>
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text  text-gray-700 dark:text-gray-200">Photo-URL</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Photo-URL"
                                                    name="PhotoURL"
                                                    className="input input-bordered bg-white dark:bg-gray-800"
                                                    required
                                                />
                                            </div>
                                            <div className="form-control relative">
                                                <label className="label">
                                                    <span className="label-text  text-gray-700 dark:text-gray-200">Password</span>
                                                </label>
                                                <input
                                                    type={showpas ? 'text' : 'password'}
                                                    placeholder="password"
                                                    name="password"
                                                    className="input input-bordered bg-white dark:bg-gray-800"
                                                    required
                                                />
                                                <button
                                                    onClick={() => setshowpas(!showpas)}
                                                    type="button"
                                                    className='btn btn-xs absolute right-4 top-12'>
                                                    {
                                                        showpas ? <FaEye ></FaEye> : <FaEyeLowVision ></FaEyeLowVision >
                                                    }
                                                </button>
                                            </div>
                                            <div className="form-control mt-6">
                                                <button type="submit" className="btn btn-primary text-white">
                                                    Register
                                                </button>
                                            </div>
                                            <Link to="/Login">Or Login</Link>
                                        </form>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                {/* <Footer /> */}
            </div>
        </div>
    );
};

export default Registration;



