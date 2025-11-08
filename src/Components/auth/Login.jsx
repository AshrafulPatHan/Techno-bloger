import  { useRef, useState } from 'react';
import Navbar from '../navigation/Navbar';
import Footer from '../navigation/Footer';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
// ----
import { GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import auth from './Firebase/Firebase.init';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { FaEye } from 'react-icons/fa';
import { FaEyeLowVision } from 'react-icons/fa6';





const Login = () => {
    const [showpas, setShowPas] = useState(false);
    const [loading,setLoading] =useState(true) ;
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
            <Navbar/>
            <div>
                <h2 className="text-4xl font-bold text-center mt-1">Login now</h2>
                <div className="hero  min-h-screen">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        {/* Login From */}
                        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                            <form onSubmit={handleLogin} className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        name="email"
                                        className="input input-bordered"
                                        required
                                    />
                                </div>
                                <div className="form-control relative">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input
                                        type={showpas ? "text" : "password"}
                                        placeholder="Enter your password"
                                        name="password"
                                        className="input input-bordered"
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
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </div>
                                <Link to="/Registration">Not have acount go Registration</Link>
                            </form>
                            <button
                                onClick={handleGoogleSignIn}
                                className="btn bg-cyan-300 mb-2 mx-8"
                            >
                                Login with Google
                            </button>
                        </div>
                        {/* Animation */}
                        <div className="text-center border-[7px] py-7 rounded-md bg-blue-50 border-blue-300 lg:text-left">
                            <DotLottieReact
                                src="https://lottie.host/15535bab-5dfb-49d7-a12b-c97a4e5debb3/YzlhON4tI6.lottie"
                                loop
                                autoplay
                                className='w-[300px]  md:w-[600px] '
                            />
                            <p className="py-6 text-center">
                                Login for enjoy our all function
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Login;