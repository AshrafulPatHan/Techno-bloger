import React, { useState } from 'react';
import { FaPaperPlane, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { toast } from 'react-toastify';

const Footer = () => {
    const [feedback, setFeedback] = useState('');

    const handleFeedbackSubmit = (e) => {
        e.preventDefault();
        if (feedback.trim()) {
            toast.success("🤩 Feedback sent successfully!");
            setFeedback('');
        } else {
            toast.error("Please enter your feedback");
        }
    };

    return (
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 max-w-screen overflow-x-hidden">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand Section */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    className="fill-white">
                                    <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white">TechnoBloger</h3>
                        </div>
                        <p className="text-gray-400 leading-relaxed mb-4">
                            Providing reliable blogs and quality content since 2024. Your trusted source for technology insights.
                        </p>
                        <div className="flex gap-3">
                            <a 
                                href="https://www.facebook.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                            >
                                <FaFacebookF className="text-white text-sm" />
                            </a>
                            <a 
                                href="https://www.twitter.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-gray-800 hover:bg-sky-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                            >
                                <FaTwitter className="text-white text-sm" />
                            </a>
                            <a 
                                href="https://www.instagram.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                            >
                                <FaInstagram className="text-white text-sm" />
                            </a>
                            <a 
                                href="https://www.linkedin.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-gray-800 hover:bg-blue-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                            >
                                <FaLinkedinIn className="text-white text-sm" />
                            </a>
                            <a 
                                href="https://www.youtube.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                            >
                                <FaYoutube className="text-white text-sm" />
                            </a>
                            <a 
                                href="https://www.x.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-gray-800 hover:bg-gray-950 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                            >
                                <FaXTwitter className="text-white text-sm" />
                            </a>
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-6 relative inline-block">
                            Services
                            <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600"></span>
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white hover:translate-x-2 inline-block transition-all duration-300">
                                    Blogging
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white hover:translate-x-2 inline-block transition-all duration-300">
                                    Teaching
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white hover:translate-x-2 inline-block transition-all duration-300">
                                    Marketing
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white hover:translate-x-2 inline-block transition-all duration-300">
                                    Advertisement
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-6 relative inline-block">
                            Company
                            <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600"></span>
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white hover:translate-x-2 inline-block transition-all duration-300">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white hover:translate-x-2 inline-block transition-all duration-300">
                                    Contact
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white hover:translate-x-2 inline-block transition-all duration-300">
                                    Careers
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white hover:translate-x-2 inline-block transition-all duration-300">
                                    Privacy Policy
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Feedback Form */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-6 relative inline-block">
                            Send Your Feedback
                            <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600"></span>
                        </h4>
                        <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    placeholder="Your feedback..."
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                <FaPaperPlane className="text-sm" />
                                Send Feedback
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500 text-sm text-center md:text-left">
                            © {new Date().getFullYear()} TechnoBloger. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-sm">
                            <a href="#" className="text-gray-500 hover:text-white transition-colors">
                                Terms of Service
                            </a>
                            <a href="#" className="text-gray-500 hover:text-white transition-colors">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-gray-500 hover:text-white transition-colors">
                                Cookie Policy
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
