import React, { useContext, useState } from 'react';
import Navbar from '../Components/navigation/Navbar';
import Footer from '../Components/navigation/Footer';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { AuthContext } from '../Components/auth/AuthProvider/AuthProvider';
import { FaPen, FaImage, FaUser, FaEnvelope, FaTag, FaAlignLeft, FaFileAlt } from 'react-icons/fa';
import { MdTitle, MdDescription } from 'react-icons/md';

const AddBlog = () => {
    const { user } = useContext(AuthContext);
    const [category, setCategory] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const API = import.meta.env.VITE_API;

    const handleAddReview = event => {
        event.preventDefault();
        const form = event.target;

        const Title = form.Title.value;
        const shortdescription = form.shortdescription.value;
        const Image = form.Image.value;
        const longdescription = form.longdescription.value;
        const username = user.displayName;
        const userEmail = user.email;

        if (!Title || !shortdescription || !Image || !longdescription || !category) {
            toast.error("All fields are required");
            return;
        }

        const allData = { 
            Title, 
            shortdescription, 
            Image, 
            longdescription, 
            category, 
            username, 
            userEmail,
            date: new Date()
        };

        fetch(`${API}/postblog`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(allData),
        })
            .then((res) => res.json())
            .then((data) => {
                toast.success("Blog added successfully!");
                navigate('/');
            })
            .catch((error) => {
                console.error('Error:', error);
                toast.error("Error adding Blog");
            });
    };

    const categories = [
        { value: 'Technology', icon: '💻', color: 'from-blue-500 to-cyan-500' },
        { value: 'Science', icon: '🔬', color: 'from-purple-500 to-pink-500' },
        { value: 'Other', icon: '📚', color: 'from-orange-500 to-red-500' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <Navbar />
            
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 dark:from-blue-800 dark:via-purple-800 dark:to-indigo-900 text-white py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <div className="inline-block mb-4">
                        <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                            <FaPen className="inline mr-2 text-2xl" />
                            <span className="font-semibold text-lg">Create New Post</span>
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                        Share Your Story
                    </h1>
                    <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
                        Write, inspire, and connect with readers around the world
                    </p>
                </div>
            </div>

            {/* Form Section */}
            <div className="max-w-6xl mx-auto px-6 -mt-12 pb-16 relative z-10">
                <form onSubmit={handleAddReview} className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
                    {/* Form Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 p-8">
                        <h2 className="text-3xl font-bold text-white text-center">
                            Create Your Blog Post
                        </h2>
                        <p className="text-center text-blue-100 mt-2">
                            Fill in the details below to publish your article
                        </p>
                    </div>

                    <div className="p-8 md:p-12">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Left Column */}
                            <div className="space-y-6">
                                {/* Blog Title */}
                                <div>
                                    <label className="flex items-center gap-2 text-gray-700 dark:text-gray-200 font-semibold mb-3">
                                        <MdTitle className="text-blue-600 dark:text-blue-400 text-xl" />
                                        Blog Title
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="Title"
                                            placeholder="Enter an engaging title..."
                                            className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                                        />
                                    </div>
                                </div>

                                {/* Short Description */}
                                <div>
                                    <label className="flex items-center gap-2 text-gray-700 dark:text-gray-200 font-semibold mb-3">
                                        <MdDescription className="text-blue-600 dark:text-blue-400 text-xl" />
                                        Short Description
                                    </label>
                                    <textarea
                                        name="shortdescription"
                                        rows="4"
                                        placeholder="Write a brief summary (2-3 sentences)..."
                                        className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all resize-none text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                                    ></textarea>
                                </div>

                                {/* Long Description */}
                                <div>
                                    <label className="flex items-center gap-2 text-gray-700 dark:text-gray-200 font-semibold mb-3">
                                        <FaFileAlt className="text-blue-600 dark:text-blue-400 text-xl" />
                                        Full Article Content
                                    </label>
                                    <textarea
                                        name="longdescription"
                                        rows="8"
                                        placeholder="Write your full blog content here..."
                                        className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all resize-none text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                                    ></textarea>
                                </div>

                                {/* Cover Image */}
                                <div>
                                    <label className="flex items-center gap-2 text-gray-700 dark:text-gray-200 font-semibold mb-3">
                                        <FaImage className="text-blue-600 dark:text-blue-400 text-xl" />
                                        Cover Image URL
                                    </label>
                                    <input
                                        type="url"
                                        name="Image"
                                        placeholder="https://example.com/image.jpg"
                                        className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 ml-1">
                                        Recommended size: 1200x630px
                                    </p>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-6">
                                {/* Category Selection */}
                                <div>
                                    <label className="flex items-center gap-2 text-gray-700 dark:text-gray-200 font-semibold mb-3">
                                        <FaTag className="text-blue-600 dark:text-blue-400 text-xl" />
                                        Blog Category
                                    </label>
                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                            className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-left text-gray-800 dark:text-gray-100 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all flex items-center justify-between"
                                        >
                                            <span className={category ? 'text-gray-800 dark:text-gray-100' : 'text-gray-400 dark:text-gray-500'}>
                                                {category || 'Select a category'}
                                            </span>
                                            <svg 
                                                className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
                                                fill="none" 
                                                stroke="currentColor" 
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        {isDropdownOpen && (
                                            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl shadow-xl z-20 overflow-hidden">
                                                {categories.map((cat) => (
                                                    <button
                                                        key={cat.value}
                                                        type="button"
                                                        onClick={() => {
                                                            setCategory(cat.value);
                                                            setIsDropdownOpen(false);
                                                        }}
                                                        className="w-full px-5 py-4 text-left hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors flex items-center gap-3 text-gray-800 dark:text-gray-100"
                                                    >
                                                        <span className="text-2xl">{cat.icon}</span>
                                                        <span className="font-medium">{cat.value}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Selected Category Display */}
                                {category && (
                                    <div className={`bg-gradient-to-r ${categories.find(c => c.value === category)?.color} p-6 rounded-xl text-white`}>
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-4xl">{categories.find(c => c.value === category)?.icon}</span>
                                            <div>
                                                <p className="text-sm font-medium opacity-90">Selected Category</p>
                                                <p className="text-2xl font-bold">{category}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Author Info Card */}
                                <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 p-6 rounded-xl border-2 border-blue-100 dark:border-gray-500">
                                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                                        <FaUser className="text-blue-600 dark:text-blue-400" />
                                        Author Information
                                    </h3>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2 block">
                                                Name
                                            </label>
                                            <div className="bg-white dark:bg-gray-800 px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600">
                                                <p className="text-gray-800 dark:text-gray-100 font-medium">
                                                    {user?.displayName || 'N/A'}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2 block">
                                                Email
                                            </label>
                                            <div className="bg-white dark:bg-gray-800 px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600">
                                                <p className="text-gray-800 dark:text-gray-100 font-medium break-all">
                                                    {user?.email || 'N/A'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Tips Card */}
                                <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-2 border-amber-200 dark:border-amber-700 rounded-xl p-6">
                                    <h4 className="font-bold text-amber-800 dark:text-amber-300 mb-3 flex items-center gap-2">
                                        <span className="text-xl">💡</span>
                                        Writing Tips
                                    </h4>
                                    <ul className="space-y-2 text-sm text-amber-700 dark:text-amber-200">
                                        <li className="flex items-start gap-2">
                                            <span className="text-amber-600 dark:text-amber-400 mt-0.5">•</span>
                                            <span>Use a clear, descriptive title</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-amber-600 dark:text-amber-400 mt-0.5">•</span>
                                            <span>Keep your short description concise</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-amber-600 dark:text-amber-400 mt-0.5">•</span>
                                            <span>Structure your content with paragraphs</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-amber-600 dark:text-amber-400 mt-0.5">•</span>
                                            <span>Use high-quality cover images</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-10">
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-700 dark:to-purple-700 dark:hover:from-blue-800 dark:hover:to-purple-800 text-white font-bold py-5 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-3 text-lg"
                            >
                                <FaPen className="text-xl" />
                                Publish Blog Post
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <Footer />
        </div>
    );
};

export default AddBlog;

// old code 

// import React, { useContext } from 'react';
// import Navbar from '../Components/navigation/Navbar';
// import Footer from '../Components/navigation/Footer';
// import { useState } from 'react';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router';
// import { AuthContext } from '../Components/auth/AuthProvider/AuthProvider';


// const AddBlog = () => {
//     const { user } = useContext(AuthContext);
//     const [category, setCategory] = useState('');
//     const navigate = useNavigate();
//     // get api link from env file
//     const API = import.meta.env.VITE_API;


//     const handleAddReview = event => {
//         event.preventDefault();
//         const form = event.target;

//         const Title = form.Title.value;
//         const shortdescription = form.shortdescription.value;
//         const Image = form.Image.value;
//         const longdescription = form.longdescription.value;
//         const username = user.displayName;
//         const userEmail = user.email;

//         if (!Title || !shortdescription || !Image || !longdescription || !category) {
//             toast.error("All fields are required");
//             return;
//         }

//         const allData = { Title, shortdescription, Image, longdescription, category, username, userEmail };
//         console.log(allData);

//         // send data to the server
//         fetch(`${API}/postdata`, {

//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(allData),
//         })
//             .then((res) => res.json())
//             .then((data) => {
//                 console.log(data);
//                 toast.success("Blog added successfully!");
//                 navigate('/');
//             })
//             .catch((error) => {
//                 console.error('Error:', error);
//                 toast.error("Error adding Blog");
//             });
//     };


//     return (
//         <div>
//             <Navbar />
//             <div className="flex justify-center mt-5 px-4">
//                 <form onSubmit={handleAddReview} className="card bg-slate-100 dark:bg-base-100 shadow-2xl p-8 w-full max-w-4xl">
//                     <h2 className="text-4xl font-bold text-center mb-8">Add Your Own Blog</h2>
//                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                         {/* Left Section */}
//                         <div>
//                             <div className="form-control mb-4">
//                                 <label className="label">
//                                     <span className="label-text">Blog Title</span>
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="Title"
//                                     placeholder="Blog Title"
//                                     className="input input-bordered input-secondary w-full"
//                                 />
//                             </div>
//                             <div className="form-control mb-4">
//                                 <label className="label">
//                                     <span className="label-text">Short Description</span>
//                                 </label>
//                                 <textarea
//                                     name="shortdescription"
//                                     placeholder="Write your Description..."
//                                     className="textarea textarea-bordered textarea-secondary w-full"
//                                 ></textarea>
//                             </div>
//                             <div className="form-control mb-4">
//                                 <label className="label">
//                                     <span className="label-text">Long Description</span>
//                                 </label>
//                                 <textarea
//                                     name="longdescription"
//                                     placeholder="Write your Description..."
//                                     className="textarea textarea-bordered textarea-secondary w-full"
//                                 ></textarea>
//                             </div>
//                             <div className="form-control mb-4">
//                                 <label className="label">
//                                     <span className="label-text">Blog Cover Image/Thumbnail</span>
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="Image"
//                                     placeholder="Image URL"
//                                     className="input input-bordered input-secondary w-full"
//                                 />
//                             </div>
//                         </div>
//                         {/* Right Section */}
//                         <div>
//                             <div className="form-control mb-4">
//                                 <label className="label">
//                                     <span className="label-text">Blog category</span>
//                                 </label>
//                                 <details className="dropdown">
//                                     <summary className="btn w-full">category</summary>
//                                     <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-full p-2 shadow">
//                                         <li>
//                                             <a onClick={() => setCategory('Technology')}>Technology</a>
//                                         </li>
//                                         <li>
//                                             <a onClick={() => setCategory('Science')}>Science</a>
//                                         </li>
//                                         <li>
//                                             <a onClick={() => setCategory('Other')}>Other</a>
//                                         </li>
//                                     </ul>
//                                 </details>
//                             </div>
//                             <div className="form-control mb-4">
//                                 <label className="label">
//                                     <span className="label-text">User Name</span>
//                                 </label>
//                                 <div className="input input-bordered input-secondary text-start w-full">
//                                     <p className="mt-2">{user?.displayName || 'N/A'}</p>
//                                 </div>
//                             </div>
//                             <div className="form-control">
//                                 <label className="label">
//                                     <span className="label-text">User Email</span>
//                                 </label>
//                                 <div className="input input-bordered input-secondary text-start w-full">
//                                     <p className="mt-2">{user?.email || 'N/A'}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     {/* Submit Button */}
//                     <button className="btn btn-primary w-full mt-6">Submit</button>
//                 </form>
//             </div>
//             <Footer />
//         </div>
//     );
// };

// export default AddBlog;