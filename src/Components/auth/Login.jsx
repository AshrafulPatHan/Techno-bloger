import { useRef, useState } from 'react';
import Navbar from '../navigation/Navbar';
import Footer from '../navigation/Footer';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
// ----
import { GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import auth from './Firebase/Firebase.init';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { FaEye, FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa';
import { FaEyeLowVision } from 'react-icons/fa6';


const Login = () => {
    const [showpas, setShowPas] = useState(false);
    const [loading, setLoading] = useState(true);
    const provider = new GoogleAuthProvider();
    const navigate = useNavigate();
    const emailRef = useRef();

    const handleLogin = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                console.log("Logged in user:", result.user);
                toast.success('Login successful');
                navigate('/');
                setLoading(false)//-----------------
            })
            .catch((error) => {
                console.error("Error during login:", error.message);
                toast.error('Something went wrong');
            });
    };

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log("Google login successful:", result.user);
                const _userData = {
                    gmail: result.user.email,
                    _userName: result.user.displayName,
                    _userphoto: result.user.photoURL,
                };
                toast.success('Google login successful');
                navigate('/')
                setLoading(false)//-----------------
            })
            .catch((error) => {
                console.error("Error during Google login:", error.message);
                toast.error('Something went wrong with Google login');
            });
    };

    const handleForgotPassword = () => {
        const email = emailRef.current.value;
        if (!email) {
            toast.warning('Please provide a valid email');
            return;
        }
        sendPasswordResetEmail(auth, email)
            .then(() => {
                toast.success('Reset email sent! Please check your inbox');
            })
            .catch((error) => {
                console.error("Error during password reset:", error.message);
                toast.error('Could not send reset email');
            });
    };


    return (
        <div>
            {/* <Navbar /> */}
            <div className='max-w-screen overflow-x-hidden '>
                {/* <h2 className="text-4xl font-bold text-center mt-1">Login now</h2> */}
                <div className="min-h-screen flex flex-col items-center justify-center mx-auto">
                    <div className="hero-content flex-col lg:flex-row">
                        {/* Animation */}
                        <div className="text-center lg:text-left">
                            <DotLottieReact
                                src="https://lottie.host/15535bab-5dfb-49d7-a12b-c97a4e5debb3/YzlhON4tI6.lottie"
                                loop
                                autoplay
                                className='w-[300px]  md:w-[600px] xl:w-[800px] '
                            />
                            <p className="py-6 text-center">
                                Get start with login
                            </p>
                        </div>
                        {/* Login From */}
                        <div>
                            <h2 className="text-2xl font-bold mb-1">Login now :</h2>
                            <div className="card bg-slate-100 dark:bg-base-100 w-[300px] sm:w-[500px] max-w-sm shrink-0 shadow-2xl">
                                <form onSubmit={handleLogin} className="card-body">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-gray-700 dark:text-gray-200">Email</span>
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            name="email"
                                            className="input input-bordered  bg-white dark:bg-gray-800"
                                            required
                                        />
                                    </div>
                                    <div className="form-control relative">
                                        <label className="label">
                                            <span className="label-text text-gray-700 dark:text-gray-200">Password</span>
                                        </label>
                                        <input
                                            type={showpas ? "text" : "password"}
                                            placeholder="Enter your password"
                                            name="password"
                                            className="input input-bordered bg-white dark:bg-gray-800"
                                            required
                                        />
                                        <button
                                            onClick={() => setShowPas(!showpas)}
                                            type="button"
                                            className="btn btn-xs absolute right-4 top-12"
                                            aria-label={showpas ? "Hide password" : "Show password"}
                                        >
                                            {showpas ? <FaEye /> : <FaEyeLowVision />}
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            onClick={handleForgotPassword}
                                            type="button"
                                            className="text-sm text-blue-500 hover:underline"
                                        >
                                            Forgot Password?
                                        </button>
                                    </div>
                                    <div className="form-control mt-6 gap-2">
                                        <button type="submit" className="btn border-none bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg font-semibold hover:from-green-500 hover:to-blue-600 transition-all">Login</button>
                                    </div>
                                    <Link to="/Registration" className='text-sm font-mono text-green-800'>Not have acount? <samp className='underline'>Create an account!</samp></Link>
                                </form>
                                <div className='flex items-center justify-center gap-4'>
                                    <button
                                        onClick={handleGoogleSignIn}
                                        className="btn bg-gray-950 w-14 mb-2 p-2 text-xl "
                                    >
                                        <FaGoogle className='text-red-500' />
                                    </button>
                                    <button
                                        className="btn bg-gray-950 w-14 mb-2 p-2 text-xl "
                                    >
                                        <FaFacebook className='text-blue-500' />
                                    </button>
                                    <button
                                        className="btn bg-gray-950 w-14 mb-2 p-2 text-xl "
                                    >
                                        <FaGithub className='text-orange-400' />
                                    </button>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {/* <Footer/> */}
        </div>
    );
};

export default Login;