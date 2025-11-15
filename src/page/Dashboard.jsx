import { useContext, useState, useEffect } from "react";
import Footer from "../Components/navigation/Footer";
import Navbar from "../Components/navigation/Navbar";
import { AuthContext } from "../Components/auth/AuthProvider/AuthProvider";
import { updateProfile } from "firebase/auth";
import auth from '../Components/auth/Firebase/Firebase.init';
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { FaUser, FaEnvelope, FaImage, FaEdit, FaCamera, FaCheckCircle, FaFacebook, FaLinkedin, FaInstagram, FaDribbble, FaTwitter, FaYoutube, FaGithub, FaGlobe } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdVerified } from "react-icons/md";

export default function Dashboard() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    const API = import.meta.env.VITE_API; // fecth the api from env

    // Fetch user data from API
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Replace with your actual API endpoint
                const response = await fetch(`${API}/get-user`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user.email),
                });
                const data = await response.json();
                setUserData(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setLoading(false);
            }
        };

        if (user?.email) {
            fetchUserData();
        }
    }, [user]);

    // Get dashboard data
    const dashboardData = userData?.dashboard?.[0] || {};

    // Social Media Links with API integration
    const socialLinks = [
        {
            name: 'Portfolio',
            url: dashboardData.Portfolio,
            color: 'from-indigo-500 to-purple-600',
            hoverColor: 'hover:from-indigo-600 hover:to-purple-700',
            icon: <FaGlobe />
        },
        {
            name: 'GitHub',
            url: dashboardData.github,
            color: 'from-gray-700 to-gray-900',
            hoverColor: 'hover:from-gray-800 hover:to-black',
            icon: <FaGithub />
        },
        {
            name: 'X (Twitter)',
            url: dashboardData.x,
            color: 'from-gray-800 to-black',
            hoverColor: 'hover:from-gray-900 hover:to-gray-950',
            icon: <FaXTwitter />
        },
        {
            name: 'Instagram',
            url: dashboardData.instagram,
            color: 'from-purple-500 to-pink-500',
            hoverColor: 'hover:from-purple-600 hover:to-pink-600',
            icon: <FaInstagram />
        },
        {
            name: 'Facebook',
            url: dashboardData.facebook,
            color: 'from-blue-600 to-blue-700',
            hoverColor: 'hover:from-blue-700 hover:to-blue-800',
            icon: <FaFacebook />
        }
    ];

    const handleUpdateProfile = async (event) => {
        event.preventDefault();
        const name = event.target.name.value || user.displayName || "User";
        const PhotoURL = event.target.PhotoURL.value || user.photoURL || "default-avatar.png";
        const bannerURL = event.target.bannerURL.value || dashboardData.baner;
        const aboutMe = event.target.aboutme.value || dashboardData.aboutme;
        const portfolio = event.target.portfolio.value || dashboardData.Portfolio;
        const facebook = event.target.facebook.value || dashboardData.facebook;
        const github = event.target.github.value || dashboardData.github;
        const x = event.target.x.value || dashboardData.x;
        const instagram = event.target.instagram.value || dashboardData.instagram;

        try {
            // Update Firebase Auth Profile
            await updateProfile(auth.currentUser, {
                displayName: name,
                photoURL: PhotoURL
            });

            // Update API data
            const response = await fetch(`https://your-api-endpoint.com/users/${userData._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    photoURL: PhotoURL,
                    dashboard: [{
                        Portfolio: portfolio,
                        facebook,
                        github,
                        x,
                        instagram,
                        followers: dashboardData.followers || 0,
                        following: dashboardData.following || 0,
                        baner: bannerURL,
                        aboutme: aboutMe
                    }]
                })
            });

            if (response.ok) {
                toast.success("Profile updated successfully!");
                setIsEditing(false);
                // Refresh user data
                const updatedData = await response.json();
                setUserData(updatedData);
            } else {
                throw new Error("Failed to update profile");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <Navbar />

            {/* Hero Section with Custom Banner */}
            <div
                className="relative pt-20 pb-32 bg-cover bg-center"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${dashboardData.baner || 'https://i.ibb.co.com/wZMqtsGP/pexels-pixabay-39896.jpg'})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                }}
            >
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center text-white">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Dashboard</h1>
                        <p className="text-lg text-gray-100">Manage your profile and view your activity</p>
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
                            <div className="relative h-48 "
                                style={{
                                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url( ${'https://i.ibb.co.com/MVwBCf5/pexels-morningtrain-18104.jpg'})`,
                                    height: '290px',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                }}>
                                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                                    <div className="relative group">
                                        <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-xl overflow-hidden bg-white">
                                            <img
                                                src={userData?.photoURL || user?.photoURL || "https://via.placeholder.com/150"}
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
                                            {userData?.name || user?.displayName || "User Name"}
                                        </h2>
                                        <MdVerified className="text-2xl text-blue-500" />
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2 mb-4">
                                        <FaEnvelope className="text-sm" />
                                        {userData?.email || user?.email || "user@example.com"}
                                    </p>

                                    {/* About Me Section */}
                                    {dashboardData.aboutme && (
                                        <div className="mt-4 max-w-2xl mx-auto">
                                            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                                                {dashboardData.aboutme}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-3 gap-4 mb-8">
                                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-6 text-center border border-blue-200 dark:border-blue-800">
                                        <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                                            {userData?.watchlists?.length || 0}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Watchlists</p>
                                    </div>
                                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl p-6 text-center border border-purple-200 dark:border-purple-800">
                                        <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                                            {dashboardData.following || 0}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Following</p>
                                    </div>
                                    <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 rounded-2xl p-6 text-center border border-pink-200 dark:border-pink-800">
                                        <p className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-1">
                                            {dashboardData.followers || 0}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Followers</p>
                                    </div>
                                </div>

                                {/* Social Links */}
                                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                                    <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-4 text-center">
                                        CONNECT WITH ME
                                    </h3>
                                    <div className="flex justify-center gap-3 flex-wrap">
                                        {socialLinks.map((social, idx) => (
                                            social.url && (
                                                <a
                                                    key={idx}
                                                    href={social.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`bg-gradient-to-r ${social.color} ${social.hoverColor} p-3 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-xl text-white`}
                                                    title={social.name}
                                                >
                                                    {social.icon}
                                                </a>
                                            )
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

                            <form onSubmit={handleUpdateProfile} className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
                                {/* Name Input */}
                                <div>
                                    <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-semibold mb-3">
                                        <FaUser className="text-blue-600 dark:text-blue-400" />
                                        Display Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder={userData?.name || "Enter your name"}
                                        defaultValue={userData?.name}
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
                                        defaultValue={userData?.photoURL}
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                                        disabled={!isEditing}
                                    />
                                </div>

                                {/* Banner URL Input */}
                                <div>
                                    <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-semibold mb-3">
                                        <FaImage className="text-blue-600 dark:text-blue-400" />
                                        Banner Image URL
                                    </label>
                                    <input
                                        type="url"
                                        name="bannerURL"
                                        placeholder="https://example.com/banner.jpg"
                                        defaultValue={dashboardData.baner}
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                                        disabled={!isEditing}
                                    />
                                </div>

                                {/* About Me Input */}
                                <div>
                                    <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-semibold mb-3">
                                        <FaUser className="text-blue-600 dark:text-blue-400" />
                                        About Me
                                    </label>
                                    <textarea
                                        name="aboutme"
                                        placeholder="Tell us about yourself..."
                                        defaultValue={dashboardData.aboutme}
                                        rows="3"
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 resize-none"
                                        disabled={!isEditing}
                                    />
                                </div>

                                {/* Social Links Section */}
                                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                                    <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-4">Social Links</h3>

                                    <div className="space-y-4">
                                        <input
                                            type="url"
                                            name="portfolio"
                                            placeholder="Portfolio URL"
                                            defaultValue={dashboardData.Portfolio}
                                            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all text-gray-800 dark:text-gray-100 text-sm"
                                            disabled={!isEditing}
                                        />
                                        <input
                                            type="url"
                                            name="facebook"
                                            placeholder="Facebook URL"
                                            defaultValue={dashboardData.facebook}
                                            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all text-gray-800 dark:text-gray-100 text-sm"
                                            disabled={!isEditing}
                                        />
                                        <input
                                            type="url"
                                            name="github"
                                            placeholder="GitHub URL"
                                            defaultValue={dashboardData.github}
                                            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all text-gray-800 dark:text-gray-100 text-sm"
                                            disabled={!isEditing}
                                        />
                                        <input
                                            type="url"
                                            name="x"
                                            placeholder="X (Twitter) URL"
                                            defaultValue={dashboardData.x}
                                            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all text-gray-800 dark:text-gray-100 text-sm"
                                            disabled={!isEditing}
                                        />
                                        <input
                                            type="url"
                                            name="instagram"
                                            placeholder="Instagram URL"
                                            defaultValue={dashboardData.instagram}
                                            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all text-gray-800 dark:text-gray-100 text-sm"
                                            disabled={!isEditing}
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={!isEditing}
                                    className={`w-full font-semibold py-4 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${isEditing
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
                                                <li>• Use high-quality images for better appearance</li>
                                                <li>• Keep your social links up to date</li>
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
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                </svg>
                            </div>
                            <span className="text-3xl font-bold text-gray-800 dark:text-white">
                                {userData?.watchlists?.length || 0}
                            </span>
                        </div>
                        <h3 className="text-gray-600 dark:text-gray-400 font-semibold">Total Watchlists</h3>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl">
                                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <span className="text-3xl font-bold text-gray-800 dark:text-white">
                                {dashboardData.following || 0}
                            </span>
                        </div>
                        <h3 className="text-gray-600 dark:text-gray-400 font-semibold">Following</h3>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-xl">
                                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <span className="text-3xl font-bold text-gray-800 dark:text-white">
                                {dashboardData.followers || 0}
                            </span>
                        </div>
                        <h3 className="text-gray-600 dark:text-gray-400 font-semibold">Followers</h3>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-pink-100 dark:bg-pink-900/30 p-3 rounded-xl">
                                <svg className="w-6 h-6 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <span className="text-3xl font-bold text-gray-800 dark:text-white">
                                {dashboardData.followers + dashboardData.following || 0}
                            </span>
                        </div>
                        <h3 className="text-gray-600 dark:text-gray-400 font-semibold">Total Connections</h3>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}


// import { useContext, useState } from "react";
// import Footer from "../Components/navigation/Footer";
// import Navbar from "../Components/navigation/Navbar";
// import { AuthContext } from "../Components/auth/AuthProvider/AuthProvider";
// import { updateProfile } from "firebase/auth";
// import auth from '../Components/auth/Firebase/Firebase.init';
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router";
// import { FaUser, FaEnvelope, FaImage, FaEdit, FaCamera, FaCheckCircle, FaFacebook, FaLinkedin, FaInstagram, FaDribbble, FaTwitter, FaYoutube } from "react-icons/fa";
// import { MdVerified } from "react-icons/md";

// export default function Dashboard() {
//     const { user } = useContext(AuthContext);
//     const navigate = useNavigate();
//     const [isEditing, setIsEditing] = useState(false);

//     // Social Media Icons
//     const socialLinks = [
//         {
//             name: 'Dribbble',
//             color: 'from-pink-500 to-rose-500',
//             hoverColor: 'hover:from-pink-600 hover:to-rose-600',
//             icon: (
//                 <FaDribbble />
//             )
//         },
//         {
//             name: 'Twitter',
//             color: 'from-sky-400 to-blue-500',
//             hoverColor: 'hover:from-sky-500 hover:to-blue-600',
//             icon: (
//                 <FaTwitter />
//             )
//         },
//         {
//             name: 'Instagram',
//             color: 'from-purple-500 to-pink-500',
//             hoverColor: 'hover:from-purple-600 hover:to-pink-600',
//             icon: (
//                 <FaInstagram />
//             )
//         },
//         {
//             name: 'YouTube',
//             color: 'from-red-500 to-red-600',
//             hoverColor: 'hover:from-red-600 hover:to-red-700',
//             icon: (
//                 <FaYoutube />
//             )
//         },
//         {
//             name: 'Facebook',
//             color: 'from-blue-600 to-blue-700',
//             hoverColor: 'hover:from-blue-700 hover:to-blue-800',
//             icon: (
//                 <FaFacebook />
//             )
//         }
//     ];

//     const handleUpdateProfile = (event) => {
//         event.preventDefault();
//         const name = event.target.name.value || user.displayName || "User";
//         const PhotoURL = event.target.PhotoURL.value || user.photoURL || "default-avatar.png";

//         updateProfile(auth.currentUser, {
//             displayName: name,
//             photoURL: PhotoURL
//         })
//             .then(() => {
//                 toast.success("Profile updated successfully!");
//                 setIsEditing(false);
//                 navigate('/dashboard');
//             })
//             .catch((error) => {
//                 console.error("Error updating profile:", error);
//                 toast.error("Failed to update profile");
//             });
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
//             <Navbar />

//             {/* Hero Section */}
//             <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-800 dark:via-purple-800 dark:to-pink-800 pt-20 pb-32">
//                 <div className="max-w-7xl mx-auto px-6">
//                     <div className="text-center text-white">
//                         <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Dashboard</h1>
//                         <p className="text-lg text-blue-100">Manage your profile and view your activity</p>
//                     </div>
//                 </div>
//             </div>

//             {/* Profile Card Section */}
//             <div className="max-w-7xl mx-auto px-6 -mt-20 pb-16">
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                     {/* Profile Card */}
//                     <div className="lg:col-span-2">
//                         <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
//                             {/* Profile Header with Image */}
//                             <div className="relative h-48 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
//                                 <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
//                                     <div className="relative group">
//                                         <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-xl overflow-hidden bg-white">
//                                             <img
//                                                 src={user?.photoURL || "https://via.placeholder.com/150"}
//                                                 alt="Profile"
//                                                 className="w-full h-full object-cover"
//                                             />
//                                         </div>
//                                         <button className="absolute bottom-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-3 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110">
//                                             <FaCamera className="text-sm" />
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Profile Info */}
//                             <div className="pt-20 pb-8 px-8">
//                                 <div className="text-center mb-8">
//                                     <div className="flex items-center justify-center gap-2 mb-2">
//                                         <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
//                                             {user?.displayName || "User Name"}
//                                         </h2>
//                                         <MdVerified className="text-2xl text-blue-500" />
//                                     </div>
//                                     <p className="text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2">
//                                         <FaEnvelope className="text-sm" />
//                                         {user?.email || "user@example.com"}
//                                     </p>
//                                 </div>

//                                 {/* Stats Grid */}
//                                 <div className="grid grid-cols-3 gap-4 mb-8">
//                                     <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-6 text-center border border-blue-200 dark:border-blue-800">
//                                         <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">23</p>
//                                         <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Articles</p>
//                                     </div>
//                                     <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl p-6 text-center border border-purple-200 dark:border-purple-800">
//                                         <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">314</p>
//                                         <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Following</p>
//                                     </div>
//                                     <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 rounded-2xl p-6 text-center border border-pink-200 dark:border-pink-800">
//                                         <p className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-1">487</p>
//                                         <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Followers</p>
//                                     </div>
//                                 </div>

//                                 {/* Social Links */}
//                                 <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
//                                     <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-4 text-center">
//                                         CONNECT WITH ME
//                                     </h3>
//                                     <div className="flex justify-center gap-3">
//                                         {socialLinks.map((social, idx) => (
//                                             <button
//                                                 key={idx}
//                                                 className={`bg-gradient-to-r ${social.color} ${social.hoverColor} p-3 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-xl`}
//                                                 title={social.name}
//                                             >
//                                                 {social.icon}
//                                             </button>
//                                         ))}
//                                     </div>
//                                 </div>

//                                 {/* Edit Profile Button */}
//                                 <div className="mt-8">
//                                     <button
//                                         onClick={() => setIsEditing(!isEditing)}
//                                         className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
//                                     >
//                                         <FaEdit />
//                                         {isEditing ? 'Cancel Editing' : 'Edit Profile'}
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Edit Profile Form */}
//                     <div className="lg:col-span-1">
//                         <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 sticky top-6">
//                             <div className="flex items-center gap-3 mb-6">
//                                 <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl">
//                                     <FaEdit className="text-white text-xl" />
//                                 </div>
//                                 <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
//                                     Update Profile
//                                 </h2>
//                             </div>

//                             <form onSubmit={handleUpdateProfile} className="space-y-6">
//                                 {/* Name Input */}
//                                 <div>
//                                     <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-semibold mb-3">
//                                         <FaUser className="text-blue-600 dark:text-blue-400" />
//                                         Display Name
//                                     </label>
//                                     <input
//                                         type="text"
//                                         name="name"
//                                         placeholder={user?.displayName || "Enter your name"}
//                                         defaultValue={user?.displayName}
//                                         className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
//                                         disabled={!isEditing}
//                                     />
//                                 </div>

//                                 {/* Photo URL Input */}
//                                 <div>
//                                     <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-semibold mb-3">
//                                         <FaImage className="text-blue-600 dark:text-blue-400" />
//                                         Profile Photo URL
//                                     </label>
//                                     <input
//                                         type="url"
//                                         name="PhotoURL"
//                                         placeholder="https://example.com/photo.jpg"
//                                         defaultValue={user?.photoURL}
//                                         className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
//                                         disabled={!isEditing}
//                                     />
//                                 </div>

//                                 {/* Submit Button */}
//                                 <button
//                                     type="submit"
//                                     disabled={!isEditing}
//                                     className={`w-full font-semibold py-4 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${isEditing
//                                             ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white hover:shadow-xl transform hover:scale-[1.02]'
//                                             : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed'
//                                         }`}
//                                 >
//                                     <FaCheckCircle />
//                                     Save Changes
//                                 </button>

//                                 {/* Info Box */}
//                                 <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-xl p-4">
//                                     <div className="flex items-start gap-3">
//                                         <span className="text-2xl">💡</span>
//                                         <div>
//                                             <h4 className="font-bold text-amber-800 dark:text-amber-300 mb-1 text-sm">
//                                                 Profile Tips
//                                             </h4>
//                                             <ul className="text-xs text-amber-700 dark:text-amber-200 space-y-1">
//                                                 <li>• Click "Edit Profile" to enable editing</li>
//                                                 <li>• Use high-quality profile photos</li>
//                                                 <li>• Keep your information up to date</li>
//                                             </ul>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Activity Section */}
//                 <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                     <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
//                         <div className="flex items-center justify-between mb-4">
//                             <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl">
//                                 <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                                 </svg>
//                             </div>
//                             <span className="text-3xl font-bold text-gray-800 dark:text-white">23</span>
//                         </div>
//                         <h3 className="text-gray-600 dark:text-gray-400 font-semibold">Total Posts</h3>
//                     </div>

//                     <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
//                         <div className="flex items-center justify-between mb-4">
//                             <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl">
//                                 <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                                 </svg>
//                             </div>
//                             <span className="text-3xl font-bold text-gray-800 dark:text-white">18</span>
//                         </div>
//                         <h3 className="text-gray-600 dark:text-gray-400 font-semibold">Published</h3>
//                     </div>

//                     <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
//                         <div className="flex items-center justify-between mb-4">
//                             <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-xl">
//                                 <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                                 </svg>
//                             </div>
//                             <span className="text-3xl font-bold text-gray-800 dark:text-white">1.2k</span>
//                         </div>
//                         <h3 className="text-gray-600 dark:text-gray-400 font-semibold">Total Views</h3>
//                     </div>

//                     <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
//                         <div className="flex items-center justify-between mb-4">
//                             <div className="bg-pink-100 dark:bg-pink-900/30 p-3 rounded-xl">
//                                 <svg className="w-6 h-6 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//                                 </svg>
//                             </div>
//                             <span className="text-3xl font-bold text-gray-800 dark:text-white">342</span>
//                         </div>
//                         <h3 className="text-gray-600 dark:text-gray-400 font-semibold">Total Likes</h3>
//                     </div>
//                 </div>
//             </div>

//             <Footer />
//         </div>
//     );
// }

