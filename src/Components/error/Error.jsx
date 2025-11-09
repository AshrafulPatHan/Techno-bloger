import { HiHome, HiExclamationCircle } from 'react-icons/hi';
import { BiError } from 'react-icons/bi';
import { MdError } from 'react-icons/md';
import { Link } from 'react-router';

const Error = () => {

    return (
        <div className='max-w-screen overflow-x-hidden'>
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl w-full text-center">
                    {/* Animated Error Icons */}
                    <div className="relative mb-8">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <MdError className="text-purple-200 animate-ping" size={200} />
                        </div>
                        <div className="relative flex items-center justify-center">
                            <BiError className="text-indigo-600" size={180} />
                        </div>
                    </div>

                    {/* 404 Text */}
                    <h1 className="text-8xl sm:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
                        404
                    </h1>

                    {/* Error Message */}
                    <div className="mb-8">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                            Oops! Page Not Found
                        </h2>
                        <p className="text-lg text-gray-600 mb-2">
                            The page you're looking for seems to have wandered off into the digital void.
                        </p>
                        <p className="text-base text-gray-500">
                            Don't worry though, you can find plenty of other things on our homepage.
                        </p>
                    </div>

                    {/* Warning Box */}
                    <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-8 rounded-r-lg shadow-sm">
                        <div className="flex items-center">
                            <HiExclamationCircle className="text-amber-400 mr-3 flex-shrink-0" size={24} />
                            <p className="text-sm text-amber-800">
                                If you believe this is a mistake, please contact our support team.
                            </p>
                        </div>
                    </div>

                    {/* Go Home Button */}
                    <Link
                        to='/'
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out"
                    >
                        <HiHome size={24} />
                        <span className="text-lg">Go to Homepage</span>
                    </Link>

                    {/* Decorative Elements */}
                    <div className="mt-12 flex justify-center gap-8 text-gray-400">
                        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-indigo-300 to-transparent rounded-full"></div>
                        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-purple-300 to-transparent rounded-full"></div>
                        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-indigo-300 to-transparent rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Error;