import { useContext, useState } from "react";
import Footer from "../Components/navigation/Footer";
import Navbar from "../Components/navigation/Navbar";
import { AuthContext } from "../Components/auth/AuthProvider/AuthProvider";
import { updateProfile } from "firebase/auth";
import auth from '../Components/auth/Firebase/Firebase.init';
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { FaUser, FaEnvelope, FaImage, FaEdit, FaCamera, FaCheckCircle, FaFacebook, FaLinkedin, FaInstagram, FaDribbble, FaTwitter, FaYoutube } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

export default function Dashboard() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);

    // Social Media Icons
    const socialLinks = [
        { 
            name: 'Dribbble', 
            color: 'from-pink-500 to-rose-500',
            hoverColor: 'hover:from-pink-600 hover:to-rose-600',
            icon: (
                <FaDribbble/>
            )
        },
        { 
            name: 'Twitter', 
            color: 'from-sky-400 to-blue-500',
            hoverColor: 'hover:from-sky-500 hover:to-blue-600',
            icon: (
                <FaTwitter/>
            )
        },
        { 
            name: 'Instagram', 
            color: 'from-purple-500 to-pink-500',
            hoverColor: 'hover:from-purple-600 hover:to-pink-600',
            icon: (
                <FaInstagram/>
            )
        },
        { 
            name: 'YouTube', 
            color: 'from-red-500 to-red-600',
            hoverColor: 'hover:from-red-600 hover:to-red-700',
            icon: (
                <FaYoutube/>
            )
        },
        { 
            name: 'Facebook', 
            color: 'from-blue-600 to-blue-700',
            hoverColor: 'hover:from-blue-700 hover:to-blue-800',
            icon: (
                <FaFacebook/>
            )
        }
    ];

    const handleUpdateProfile = (event) => {
        event.preventDefault();
        const name = event.target.name.value || user.displayName || "User";
        const PhotoURL = event.target.PhotoURL.value || user.photoURL || "default-avatar.png";

        updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: PhotoURL
        })
        .then(() => {
            toast.success("Profile updated successfully!");
            setIsEditing(false);
            navigate('/dashboard');
        })
        .catch((error) => {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile");
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <Navbar />
            
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-800 dark:via-purple-800 dark:to-pink-800 pt-20 pb-32">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center text-white">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Dashboard</h1>
                        <p className="text-lg text-blue-100">Manage your profile and view your activity</p>
                    </div>
                </div>
            </div>

            {/* Profile Card Section */}
            <div className="max-w-7xl mx-auto px-6 -mt-20 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Card */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
                            {/* Profile Header with Image */}
                            <div className="relative h-48 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                                    <div className="relative group">
                                        <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-xl overflow-hidden bg-white">
                                            <img
                                                src={user?.photoURL || "https://via.placeholder.com/150"}
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <button className="absolute bottom-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-3 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110">
                                            <FaCamera className="text-sm" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Profile Info */}
                            <div className="pt-20 pb-8 px-8">
                                <div className="text-center mb-8">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                                            {user?.displayName || "User Name"}
                                        </h2>
                                        <MdVerified className="text-2xl text-blue-500" />
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2">
                                        <FaEnvelope className="text-sm" />
                                        {user?.email || "user@example.com"}
                                    </p>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-3 gap-4 mb-8">
                                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-6 text-center border border-blue-200 dark:border-blue-800">
                                        <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">23</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Articles</p>
                                    </div>
                                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl p-6 text-center border border-purple-200 dark:border-purple-800">
                                        <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">314</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Following</p>
                                    </div>
                                    <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 rounded-2xl p-6 text-center border border-pink-200 dark:border-pink-800">
                                        <p className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-1">487</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Followers</p>
                                    </div>
                                </div>

                                {/* Social Links */}
                                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                                    <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-4 text-center">
                                        CONNECT WITH ME
                                    </h3>
                                    <div className="flex justify-center gap-3">
                                        {socialLinks.map((social, idx) => (
                                            <button
                                                key={idx}
                                                className={`bg-gradient-to-r ${social.color} ${social.hoverColor} p-3 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-xl`}
                                                title={social.name}
                                            >
                                                {social.icon}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Edit Profile Button */}
                                <div className="mt-8">
                                    <button
                                        onClick={() => setIsEditing(!isEditing)}
                                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                                    >
                                        <FaEdit />
                                        {isEditing ? 'Cancel Editing' : 'Edit Profile'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Edit Profile Form */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 sticky top-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl">
                                    <FaEdit className="text-white text-xl" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                                    Update Profile
                                </h2>
                            </div>

                            <form onSubmit={handleUpdateProfile} className="space-y-6">
                                {/* Name Input */}
                                <div>
                                    <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-semibold mb-3">
                                        <FaUser className="text-blue-600 dark:text-blue-400" />
                                        Display Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder={user?.displayName || "Enter your name"}
                                        defaultValue={user?.displayName}
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                                        disabled={!isEditing}
                                    />
                                </div>

                                {/* Photo URL Input */}
                                <div>
                                    <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-semibold mb-3">
                                        <FaImage className="text-blue-600 dark:text-blue-400" />
                                        Profile Photo URL
                                    </label>
                                    <input
                                        type="url"
                                        name="PhotoURL"
                                        placeholder="https://example.com/photo.jpg"
                                        defaultValue={user?.photoURL}
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                                        disabled={!isEditing}
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={!isEditing}
                                    className={`w-full font-semibold py-4 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                                        isEditing
                                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white hover:shadow-xl transform hover:scale-[1.02]'
                                            : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed'
                                    }`}
                                >
                                    <FaCheckCircle />
                                    Save Changes
                                </button>

                                {/* Info Box */}
                                <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-xl p-4">
                                    <div className="flex items-start gap-3">
                                        <span className="text-2xl">💡</span>
                                        <div>
                                            <h4 className="font-bold text-amber-800 dark:text-amber-300 mb-1 text-sm">
                                                Profile Tips
                                            </h4>
                                            <ul className="text-xs text-amber-700 dark:text-amber-200 space-y-1">
                                                <li>• Click "Edit Profile" to enable editing</li>
                                                <li>• Use high-quality profile photos</li>
                                                <li>• Keep your information up to date</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Activity Section */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl">
                                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <span className="text-3xl font-bold text-gray-800 dark:text-white">23</span>
                        </div>
                        <h3 className="text-gray-600 dark:text-gray-400 font-semibold">Total Posts</h3>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl">
                                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="text-3xl font-bold text-gray-800 dark:text-white">18</span>
                        </div>
                        <h3 className="text-gray-600 dark:text-gray-400 font-semibold">Published</h3>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-xl">
                                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </div>
                            <span className="text-3xl font-bold text-gray-800 dark:text-white">1.2k</span>
                        </div>
                        <h3 className="text-gray-600 dark:text-gray-400 font-semibold">Total Views</h3>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-pink-100 dark:bg-pink-900/30 p-3 rounded-xl">
                                <svg className="w-6 h-6 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <span className="text-3xl font-bold text-gray-800 dark:text-white">342</span>
                        </div>
                        <h3 className="text-gray-600 dark:text-gray-400 font-semibold">Total Likes</h3>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}


// old code :

// import { useContext } from "react";
// import Footer from "../Components/navigation/Footer";
// import Navbar from "../Components/navigation/Navbar";
// import { AuthContext } from "../Components/auth/AuthProvider/AuthProvider";
// import { updateProfile } from "firebase/auth";
// import auth from '../Components/auth/Firebase/Firebase.init';
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router";


// export default function Dashboard() {
//        const { user } = useContext(AuthContext);
//        const navigate = useNavigate();

//       // All Svg 
//        const svgArr = [
//          {svg: (<svg width="25px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve" fill="#000000"><g strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><circle fill="#DC4373" cx="256" cy="256" r="256"></circle><path fill="#C13366" d="M358.334,151.376c-6.666,2.577-14.305,1.838-17.863-0.534 c-43.098-24.135-89.643-31.03-132.741-18.963c-61.693,18.227-86.893,86.635-86.73,150.494 c11.311,21.068,26.279,52.617,30.927,76.552l149.12,149.123C406.313,489.36,489.339,406.344,508.04,301.084L358.334,151.376z"></path><path fill="#F0F1F1" d="M255.997,109.654c-80.796,0-146.529,65.655-146.529,146.348s65.733,146.342,146.529,146.342 c80.799,0,146.535-65.646,146.535-146.342C402.532,175.309,336.796,109.654,255.997,109.654L255.997,109.654z M352.418,178.728 c16.715,20.716,26.872,46.878,27.341,75.386c-5.561-1.141-29.115-5.534-57.263-5.534c-9.082,0-18.641,0.455-28.224,1.639 c-0.809-1.967-1.619-3.927-2.469-5.906c-2.486-5.846-5.163-11.645-7.937-17.36C327.187,209.105,348.084,184.334,352.418,178.728 L352.418,178.728z M255.997,132.563c31.223,0,59.764,11.6,81.563,30.706c-3.451,4.708-22.166,28.101-63.938,43.884 c-19.335-35.344-40.498-64.61-45.535-71.406C237.063,133.668,246.405,132.563,255.997,132.563L255.997,132.563z M202.821,144.558 c4.268,5.879,25.464,35.459,45.296,70.518c-53.224,13.991-100.488,14.903-111.895,14.903h-1.212 C143.205,192.212,168.722,160.83,202.821,144.558L202.821,144.558z M132.201,256.195c0-1.019,0.017-2.038,0.05-3.051 c0.74,0.009,1.833,0.009,3.25,0.009c15.363,0,68.691-1.269,123.644-17.577c3.336,6.523,6.511,13.145,9.464,19.763 c-1.388,0.398-2.757,0.796-4.117,1.241c-61.874,19.983-95.884,72.888-101.117,81.536 C143.986,316.268,132.201,287.587,132.201,256.195L132.201,256.195z M255.997,379.818c-28.393,0-54.596-9.616-75.505-25.74 c3.537-6.934,29.206-53.15,97.013-76.75c0.041-0.017,0.086-0.033,0.136-0.045c17.003,44.265,24.204,81.417,26.179,92.931 C289.104,376.401,272.944,379.818,255.997,379.818L255.997,379.818z M326.115,358.026c-1.66-9.526-8.33-44.344-23.726-86.809 c8.635-1.343,17.036-1.874,24.914-1.874c25.874,0,46.115,5.665,50.817,7.102C372.529,310.167,353.223,339.349,326.115,358.026 L326.115,358.026z"></path><path fill="#D1D1D1" d="M255.997,109.654c-0.191,0-0.379,0.014-0.571,0.014v22.902c0.19,0,0.379-0.009,0.571-0.009 c31.223,0,59.764,11.6,81.563,30.706c-3.451,4.708-22.166,28.101-63.938,43.884c-6.07-11.097-12.321-21.594-18.196-30.984v60.478 c1.238-0.353,2.477-0.705,3.717-1.072c3.336,6.523,6.511,13.145,9.464,19.763c-1.388,0.398-2.757,0.796-4.117,1.239 c-3.098,1.002-6.106,2.105-9.064,3.26v26.614c6.811-3.281,14.145-6.359,22.078-9.121c0.041-0.017,0.086-0.033,0.136-0.045 c17.003,44.265,24.204,81.417,26.179,92.931c-14.714,6.187-30.873,9.604-47.823,9.604c-0.191,0-0.379-0.012-0.571-0.012v22.525 c0.191,0,0.379,0.014,0.571,0.014c80.799,0,146.535-65.646,146.535-146.342C402.532,175.309,336.796,109.654,255.997,109.654z M291.804,244.312c-2.486-5.846-5.163-11.645-7.937-17.36c43.32-17.848,64.217-42.618,68.551-48.225 c16.715,20.716,26.874,46.878,27.341,75.385c-5.561-1.141-29.115-5.534-57.261-5.534c-9.082,0-18.641,0.457-28.224,1.639 C293.462,248.251,292.654,246.291,291.804,244.312z M326.115,358.026c-1.66-9.526-8.33-44.344-23.726-86.809 c8.635-1.343,17.036-1.874,24.914-1.874c25.874,0,46.115,5.665,50.817,7.102C372.529,310.167,353.223,339.349,326.115,358.026z"></path></g></svg>)},
//          {svg: (<svg width="25px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve" fill="#000000"><g strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><circle fill="#65A2D9" cx="256" cy="256" r="256"></circle><path fill="#3A7CA5" d="M393.014,139.326c-26.703,23.169-53.253,43.475-74.954,71.852 c-53.381,64.372-118.613,155.7-207.386,142.086l158.61,158.396c134.456-6.873,241.497-117.493,242.686-253.376L393.014,139.326z"></path><path fill="#FFFFFF" d="M397.872,162.471c-6.513,2.889-13.271,5.167-20.208,6.815c7.644-7.261,13.39-16.346,16.631-26.484 c0.926-2.893-2.219-5.398-4.832-3.848c-9.65,5.725-20.044,10.016-30.894,12.762c-0.628,0.16-1.276,0.24-1.929,0.24 c-1.979,0-3.896-0.733-5.411-2.065c-11.542-10.174-26.39-15.777-41.805-15.777c-6.672,0-13.405,1.04-20.016,3.091 c-20.487,6.353-36.295,23.254-41.257,44.103c-1.86,7.818-2.362,15.648-1.496,23.264c0.097,0.876-0.314,1.486-0.569,1.772 c-0.45,0.502-1.084,0.791-1.745,0.791c-0.072,0-0.15-0.003-0.224-0.01c-44.846-4.168-85.287-25.772-113.869-60.837 c-1.455-1.789-4.253-1.569-5.415,0.422c-5.596,9.606-8.554,20.589-8.554,31.766c0,17.127,6.884,33.27,18.837,45.039 c-5.027-1.193-9.893-3.07-14.414-5.582c-2.188-1.214-4.877,0.35-4.908,2.851c-0.31,25.445,14.588,48.087,36.905,58.282 c-0.45,0.01-0.9,0.014-1.35,0.014c-3.537,0-7.121-0.338-10.645-1.015c-2.463-0.467-4.532,1.867-3.768,4.253 c7.246,22.618,26.717,39.288,50.021,43.07c-19.339,12.983-41.863,19.83-65.302,19.83l-7.306-0.003c-2.255,0-4.16,1.469-4.73,3.65 c-0.565,2.145,0.474,4.413,2.396,5.53c26.412,15.372,56.541,23.495,87.138,23.495c26.784,0,51.838-5.313,74.466-15.798 c20.745-9.609,39.076-23.345,54.486-40.827c14.357-16.286,25.581-35.085,33.365-55.879c7.418-19.816,11.34-40.967,11.34-61.154 v-0.964c0-3.241,1.465-6.291,4.024-8.37c9.706-7.882,18.16-17.158,25.122-27.572C403.796,164.578,400.896,161.13,397.872,162.471 L397.872,162.471z"></path><path fill="#D1D1D1" d="M397.872,162.471c-6.515,2.889-13.271,5.167-20.208,6.815c7.644-7.261,13.39-16.346,16.632-26.484 c0.926-2.893-2.219-5.398-4.832-3.848c-9.65,5.725-20.044,10.016-30.894,12.762c-0.628,0.16-1.276,0.24-1.929,0.24 c-1.979,0-3.896-0.733-5.411-2.065c-11.542-10.174-26.39-15.777-41.805-15.777c-6.671,0-13.405,1.04-20.016,3.091 c-14.322,4.441-26.343,14.048-33.985,26.546v205.477c6.222-2.029,12.293-4.403,18.198-7.139 c20.745-9.609,39.076-23.345,54.486-40.827c14.357-16.287,25.581-35.085,33.365-55.879c7.418-19.816,11.34-40.967,11.34-61.154 v-0.964c0-3.241,1.465-6.291,4.024-8.37c9.706-7.882,18.16-17.158,25.122-27.572C403.796,164.578,400.896,161.13,397.872,162.471z"></path></g></svg>)},
//          {svg: (<svg width="25px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve" fill="#000000"><g strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><circle fill="#6C27B3" cx="256" cy="256" r="256"></circle><path fill="#501A96" d="M374.71,132.922c-30.587,3.872-62.479,3.737-94.575,0.681 c-44.822-3.448-110.33-24.135-134.465,17.239c-38.772,66.236-19.649,151.035-10.614,226.078l134.737,134.708 c130.388-6.923,234.886-111.407,241.831-241.79L374.71,132.922z"></path><g><path fill="#FFFFFF" d="M315.227,109.468H196.772c-48.14,0-87.304,39.164-87.304,87.304v118.455 c0,48.138,39.164,87.305,87.305,87.305h118.455c48.138,0,87.305-39.165,87.305-87.305V196.772 C402.532,148.632,363.367,109.468,315.227,109.468L315.227,109.468z M373.05,315.228c0,31.934-25.888,57.822-57.822,57.822H196.773 c-31.934,0-57.822-25.888-57.822-57.822V196.773c0-31.934,25.888-57.823,57.822-57.823h118.455 c31.934,0,57.822,25.89,57.822,57.823V315.228z"></path><path fill="#FFFFFF" d="M256,180.202c-41.794,0-75.798,34.004-75.798,75.798c0,41.791,34.004,75.795,75.798,75.795 s75.795-34.001,75.795-75.795S297.794,180.202,256,180.202L256,180.202z M256,302.313c-25.579,0-46.316-20.733-46.316-46.313 s20.737-46.316,46.316-46.316s46.313,20.735,46.313,46.316C302.313,281.579,281.579,302.313,256,302.313L256,302.313z"></path></g><g><path fill="#D1D1D1" d="M350.103,180.774c0,10.03-8.132,18.163-18.163,18.163c-10.03,0-18.163-8.133-18.163-18.163 c0-10.031,8.133-18.163,18.163-18.163C341.973,162.611,350.103,170.741,350.103,180.774L350.103,180.774z"></path><path fill="#D1D1D1" d="M315.228,109.468h-59.802v29.482h59.802c31.934,0,57.822,25.89,57.822,57.823v118.455 c0,31.934-25.888,57.822-57.822,57.822h-59.802v29.482h59.802c48.138,0,87.304-39.165,87.304-87.305V196.772 C402.532,148.632,363.367,109.468,315.228,109.468z"></path><path fill="#D1D1D1" d="M256,180.202c-0.193,0-0.381,0.014-0.574,0.014v29.482c0.191-0.002,0.381-0.014,0.574-0.014 c25.579,0,46.313,20.735,46.313,46.316c0,25.579-20.733,46.313-46.313,46.313c-0.193,0-0.383-0.012-0.574-0.014v29.482 c0.193,0.002,0.381,0.014,0.574,0.014c41.794,0,75.795-34.002,75.795-75.795C331.795,214.206,297.794,180.202,256,180.202z"></path></g></g></svg>)},
//          {svg: (<svg width="25px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve" fill="#000000"><g strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><circle fill="#D22215" cx="256" cy="256" r="256"></circle><path fill="#A81411" d="M384.857,170.339c-7.677,2.343-15.682,4.356-23.699,6.361 c-56.889,12.067-132.741-20.687-165.495,32.754c-27.317,42.494-35.942,95.668-67.017,133.663L294.629,509.1 c110.47-16.72,197.773-104.036,214.476-214.511L384.857,170.339z"></path><path fill="#FFFFFF" d="M341.649,152.333H170.351c-33.608,0-60.852,27.245-60.852,60.852v85.632 c0,33.608,27.245,60.852,60.852,60.852h171.298c33.608,0,60.852-27.245,60.852-60.852v-85.632 C402.501,179.578,375.256,152.333,341.649,152.333L341.649,152.333z M300.494,260.167l-80.12,38.212 c-2.136,1.019-4.603-0.536-4.603-2.901v-78.814c0-2.4,2.532-3.955,4.67-2.87l80.12,40.601 C302.947,255.602,302.904,259.019,300.494,260.167L300.494,260.167z"></path><path fill="#D1D1D1" d="M341.649,152.333h-87.373v78.605l46.287,23.455c2.384,1.208,2.341,4.624-0.069,5.773l-46.218,22.044 v77.459h87.373c33.608,0,60.852-27.245,60.852-60.852v-85.632C402.501,179.578,375.256,152.333,341.649,152.333z"></path></g></svg>)},
//          {svg: (<svg width="25px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512.002 512.002" xmlSpace="preserve" fill="#000000"><g strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><circle fill="#4E598F" cx="256.001" cy="256" r="256"></circle><path fill="#364270" d="M511.596,241.7L391.019,121.085c-1.998,0.605-6.982-1.714-9.173-1.274 c-51.717,8.62-101.71,0-151.704,13.791c-24.135,6.896-25.859,36.202-34.478,55.165c-12.067,34.478-10.343,72.404-25.859,105.158 c-10.343,22.411-34.478,36.202-43.098,62.061c-2.875,10.785-2.705,24.379-5.956,34.69l120.98,120.922 c4.725,0.26,9.48,0.403,14.269,0.403c141.384,0,256-114.616,256-256C512.001,251.201,511.858,246.434,511.596,241.7z"></path><g><path fill="#FFFFFF" d="M363.043,109.466H148.958c-21.809,0-39.49,17.68-39.49,39.49v214.085 c0,21.811,17.68,39.49,39.49,39.49h105.584l0.183-104.722h-27.21c-3.536,0-6.406-2.86-6.418-6.396l-0.133-33.759 c-0.014-3.553,2.867-6.444,6.42-6.444h27.162v-32.618c0-37.852,23.118-58.463,56.884-58.463h27.71c3.543,0,6.42,2.874,6.42,6.42 v28.463c0,3.546-2.874,6.42-6.416,6.42l-17.006,0.01c-18.363,0-21.921,8.725-21.921,21.533v28.239h40.351 c3.848,0,6.83,3.358,6.375,7.173l-4.001,33.759c-0.381,3.232-3.122,5.665-6.375,5.665h-36.168l-0.183,104.726h62.826 c21.809,0,39.49-17.682,39.49-39.491v-214.09C402.533,127.147,384.852,109.466,363.043,109.466L363.043,109.466z"></path><polygon fill="#FFFFFF" points="254.542,402.53 254.725,297.808 254.277,297.808 254.277,402.53 "></polygon></g><path fill="#D1D1D1" d="M363.043,109.466H254.277v141.741h0.269V218.59c0-37.852,23.118-58.463,56.884-58.463h27.71 c3.543,0,6.42,2.874,6.42,6.42v28.463c0,3.546-2.874,6.42-6.416,6.42l-17.006,0.01c-18.363,0-21.921,8.725-21.921,21.533v28.238 h40.351c3.848,0,6.83,3.358,6.375,7.173l-4.001,33.759c-0.381,3.232-3.122,5.665-6.375,5.665h-36.168l-0.183,104.726h62.826 c21.809,0,39.49-17.682,39.49-39.491V148.956C402.533,127.147,384.852,109.466,363.043,109.466z"></path></g></svg>)}
//    ]
//    // the Update profile
//    const handleUpdateProfile = (event) =>{
//       event.preventDefault();
//       const name = event.target.name.value || user.displayName || "User" ;
//       const PhotoURL = event.target.PhotoURL.value || user.photoURL || "default-avatar.png";

//       updateProfile(auth.currentUser, {
//          displayName: name,
//          photoURL: PhotoURL
//      })
//      .then(() => {
//          console.log("Profile update is sussesfully!");
//          toast.success("Your Profile Is Update");
//          navigate('/')
//      })
//      .catch((error) => {
//          console.error("Something is wrong:", error);
//          toast.error("Something is wrong");
//      });

//    }

//    return(
//       <div>
//          <Navbar/>
//          <div className="h-screen">
//             <div className="flex flex-col items-center justify-center md:flex-row mt-10">
//                <div className="group relative  sm:w-[350px]">
//                   <img width={350} height={350} className="h-full w-full scale-105 transform rounded-lg bg-black/70" 
//                   src={user.photoURL || "default-avatar.png"} alt="card navigate ui" />
//                   <span className="absolute -bottom-6 left-1/2 z-30 flex h-[40px] w-[40px] -translate-x-1/2 transform items-center  justify-center rounded-full bg-white bg-gradient-to-tr from-[#0d87f8]  to-[#70c4ff] duration-500 group-hover:rotate-180 group-hover:shadow-[0px_0px_30px_2px_#0d87f8]"><svg width={25} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round"></g><g><g id="style=linear"><g id="add"><path id="vector" d="M11.998 5.84424L11.998 18.1604" stroke="#9EE6FD" strokeWidth="2" strokeLinecap="round"></path><path id="vector_2" d="M18.1561 12.002L5.83998 12.0019" stroke="#9EE6FD" strokeWidth="2" strokeLinecap="round"></path></g></g></g></svg></span>
//                   <span className="absolute -bottom-6 left-1/2 z-20 h-0 w-0 -translate-x-1/2 transform rounded-full bg-gradient-to-tr from-[#0d87f8]/80 to-[#70c4ff]/80 duration-300 group-hover:h-[50px] group-hover:w-[50px]"></span>
//                   <span className="absolute -bottom-6 left-1/2 z-20 h-0 w-0 -translate-x-1/2 transform rounded-full bg-gradient-to-tr from-[#0d87f8]/50 to-[#70c4ff]/50 duration-500 hover:duration-300 group-hover:h-[60px] group-hover:w-[60px] "></span>
//                </div>
//                <div className="min-w-[250px] max-w-[350px] h-[350px] space-y-12 rounded-br-lg rounded-tr-lg bg-white p-10 text-center 
//                   shadow-[0px_7px_30px_2px_rgba(100,100,111,0.2)] dark:bg-[#18181B] md:w-[350px] dark:shadow-[0px_2px_8px_0px_rgba(0,0,0,0.8)]">
//                   <div className="space-y-1">
//                      <h2 className="text-center text-2xl font-medium text-gray-700 dark:text-white/90 lg:text-3xl">{user.displayName || "User"}</h2>
//                      <p className="text-gray-500 dark:text-white/70">{user.email || "User Email"}</p>
//                   </div>
//                   <div className="flex flex-wrap items-center justify-between">
//                      <div className="space-y-1">
//                            <p className="text-sm text-gray-500 dark:text-white/70">Shots</p>
//                            <p className="text-2xl tracking-wider text-gray-700 dark:text-white/80 lg:text-3xl">23</p>
//                      </div>
//                      <div className="space-y-1">
//                            <p className="text-sm text-gray-500 dark:text-white/70">Following</p>
//                            <p className="text-2xl tracking-wider text-gray-700 dark:text-white/80 lg:text-3xl">314</p>
//                      </div>
//                      <div className="space-y-1">
//                            <p className="text-sm text-gray-500 dark:text-white/70">Followers</p>
//                            <p className="text-2xl tracking-wider text-gray-700 dark:text-white/80 lg:text-3xl">487</p>
//                      </div>
//                   </div>
//                   <div className="flex justify-between gap-4 py-2">
//                      {svgArr?.map((svg, idx) => (
//                         <div key={idx} className="rounded-full shadow-[0px_2px_8px_0px_rgba(99,99,99,0.4)]  duration-300 hover:scale-150 cursor-pointer">
//                               {svg?.svg}
//                         </div>
//                      ))}
//                   </div>
//                </div>
//             </div>  
//             <div className="flex flex-col items-center mt-20">
//                <div className="w-full max-w-md rounded-lg bg-white px-10 pb-10 pt-8 shadow-md dark:bg-zinc-900">
//                   <div className="mb-6">
//                      <h2 className="text-center text-3xl font-semibold tracking-tight">chang your profile</h2>
//                      {/* <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">We&apos;d love to hear from you!</p> */}
//                   </div>
//                   <form 
//                   onSubmit={handleUpdateProfile}
//                   className="w-full space-y-6">
//                      <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-400">
//                         <label className="block font-medium" htmlFor="name">
//                               Name
//                         </label>
//                         <input
//                               className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
//                               id="name"
//                               placeholder="Your Name"
//                               name="name"
//                               type="text"
//                         />
//                      </div>
//                      <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-400">
//                         <label className="block font-medium" htmlFor="_email">
//                               Photo url
//                         </label>
//                         <input
//                               className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
//                               id="photo"
//                               placeholder="Photo url"
//                               name="PhotoURL"
//                               type="text"
//                         />
//                      </div>
//                      <button 
//                      type="submit"
//                      className="rounded-md bg-sky-500 px-4 py-2 text-white transition-colors hover:bg-sky-600 dark:bg-sky-700">
//                         Submit
//                      </button>
//                   </form>
//                </div>
//             </div>
//          </div>
//          <Footer/>
//       </div>
//    )
// }
                                               