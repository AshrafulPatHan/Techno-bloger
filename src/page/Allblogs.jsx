import { useContext, useEffect, useState } from 'react';
import Navbar from '../Components/navigation/Navbar';
import Footer from '../Components/navigation/Footer';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../Components/auth/AuthProvider/AuthProvider';
import { toast } from 'react-toastify';
import { motion } from "motion/react";
import { FaSearch, FaFilter, FaHeart, FaEye, FaBookmark } from 'react-icons/fa';
import { MdCategory } from 'react-icons/md';

const Allblogs = () => {
    const [all, setAll] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [category, setCategory] = useState('');
    const { user } = useContext(AuthContext);

    const navigate = useNavigate();
    const handleExploreDetails = (All) => {
        navigate(`/allblogs/${All.id}`, { state: All });
    };

    const API = import.meta.env.VITE_API;

    useEffect(() => {
        fetch(`${API}/alldata`)
            .then((res) => res.json())
            .then((data) => {
                setAll(data);
                setFilteredBlogs(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, []);

    const handleWatchList = (All) => {
        fetch(`${API}/watchList`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(All),
        })
            .then((res) => res.json())
            .then((data) => {
                toast.success("Added to Wishlist successfully!");
            })
            .catch((error) => {
                console.error('Error:', error);
                toast.error("Error adding to wishlist");
            });
    };

    useEffect(() => {
        let blogs = all;

        if (category) {
            blogs = blogs.filter((blog) => blog.category === category);
        }

        if (searchText) {
            blogs = blogs.filter((blog) =>
                blog.Title.toLowerCase().includes(searchText.toLowerCase())
            );
        }

        setFilteredBlogs(blogs);
    }, [searchText, category, all]);

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="flex flex-col items-center justify-center min-h-screen">
                    <div className="relative">
                        <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                        <div className="mt-4 text-gray-600 font-semibold">Loading blogs...</div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 max-w-screen overflow-x-hidden">
            <Navbar />

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 text-white py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                            Explore Our Blog Collection
                        </h1>
                        <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
                            Discover insightful articles, tutorials, and stories from our community
                        </p>
                        <div className="mt-6 flex items-center justify-center gap-6 text-sm">
                            <div className="flex items-center gap-2">
                                <FaBookmark className="text-blue-200" />
                                <span>{all.length} Articles</span>
                            </div>
                            <div className="w-1 h-4 bg-blue-400"></div>
                            <div className="flex items-center gap-2">
                                <MdCategory className="text-blue-200" />
                                <span>Multiple Categories</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Search and Filter Section */}
            <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
                >
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search Input */}
                        <div className="flex-1 relative">
                            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search blogs by title..."
                                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all text-gray-700 font-medium"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="md:w-64 relative">
                            <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                            <select
                                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all appearance-none bg-white text-gray-700 font-medium cursor-pointer"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">All Categories</option>
                                <option value="Technology">Technology</option>
                                <option value="Science">Science</option>
                                <option value="Other">Other</option>
                            </select>
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="mt-4 text-sm text-gray-600 font-medium">
                        Showing <span className="text-blue-600 font-bold">{filteredBlogs.length}</span> of <span className="font-bold">{all.length}</span> blogs
                    </div>
                </motion.div>
            </div>

            {/* Blog Cards Grid */}
            <div className=" max-w-[1550px] mx-auto px-6 py-12 md:py-16 flex flex-col items-center">
                {filteredBlogs.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">📝</div>
                        <h3 className="text-2xl font-bold text-gray-700 mb-2">No blogs found</h3>
                        <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-6 mx-0 lg:mx-6 mt-7">
                        {filteredBlogs.map((blog, index) => (
                            <motion.div
                                key={blog.id}
                                whileHover={{
                                    y: -9,
                                }}
                                transition={{
                                    ease: "easeInOut",
                                    duration: 0.3,
                                }}
                                className="w-[99%] sm:w-[350px] h-[520px] space-y-4 rounded-lg bg-white p-6 shadow-lg dark:shadow-[#303c42] hover:shadow-xl 
                                md:w-[350px] dark:bg-[#18181B] flex flex-col justify-between">
                                {/* Image Container */}
                                <div className="relative h-56 overflow-hidden group rounded-lg">
                                    <img
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                        src={blog.Image}
                                        alt={blog.Title}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                    {/* Category Badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                                            {blog.category || 'General'}
                                        </span>
                                    </div>
                                </div>
                                {/* <img className="h-[275px] w-[350px] rounded-lg object-cover" src={blog.Image} alt="card image" /> */}
                                <div className="grid gap-2">
                                    <h1 className="text-lg font-semibold font-sans ">{blog.Title}</h1>
                                    <p className="text-sm text-gray-500 dark:text-white/60">
                                        {blog.shortdescription.length > 150 ? `${blog.shortdescription.substring(0, 150)}...` : blog.shortdescription}
                                    </p>
                                </div>
                                <div className="flex items-center justify-between gap-4 ">
                                    <motion.button
                                        whileHover={{ scale: 1.08 }}
                                        whileTap={{ scale: 0.8 }}
                                        className="rounded-lg bg-slate-800 px-6 py-2 text-[12px] font-semibold text-white duration-300 
                                        hover:bg-slate-950 sm:text-sm md:text-base "
                                        onClick={() => handleExploreDetails(blog)}>
                                        Details
                                    </motion.button>
                                    {user ? (
                                        <motion.button
                                            whileHover={{ scale: 1.08 }}
                                            whileTap={{ scale: 0.8 }}
                                            className='btn btn-active btn-primary  text-white text-[16px] font-semibold  '
                                            onClick={() => handleWatchList(blog)}>
                                            <FaHeart />
                                        </motion.button>
                                    ) : (
                                        <Link to='/login' className='btn btn-active btn-primary text-white text-[16px] font-semibold'>
                                            <FaHeart />
                                        </Link>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default Allblogs;

// old code ->

// import { useContext, useEffect, useState } from 'react';
// import Navbar from '../Components/navigation/Navbar';
// import Footer from '../Components/navigation/Footer';
// import { Link, useNavigate } from 'react-router';
// import { AuthContext } from '../Components/auth/AuthProvider/AuthProvider';
// import { toast } from 'react-toastify';
// import { motion } from "motion/react"

// const Allblogs = () => {
//     const [all, setAll] = useState([]);
//     const [filteredBlogs, setFilteredBlogs] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [searchText, setSearchText] = useState('');
//     const [category, setCategory] = useState('');
//     const { user } = useContext(AuthContext);

//     // go to details page
//     const navigate = useNavigate();
//     const handleExploreDetails = (All) => {
//         navigate(`/allblogs/${All.id}`, { state: All });
//     };

//     // get api link from env file
//     const API = import.meta.env.VITE_API;

//     // fetch data
//     useEffect(() => {
//         fetch(`${API}/alldata`)
//             .then((res) => res.json())
//             .then((data) => {
//                 setAll(data);
//                 setFilteredBlogs(data);
//                 setLoading(false);
//             })
//             .catch((error) => {
//                 console.error("Error fetching data:", error);
//                 setLoading(false);
//             });
//     }, []);

//     // Add to WatchList
//     const handleWatchList = (All) => {
//         fetch(`${API}/watchList`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(All),
//         })
//             .then((res) => res.json())
//             .then((data) => {
//                 toast.success("Watchlist added successfully!");
//             })
//             .catch((error) => {
//                 console.error('Error:', error);
//                 toast.error("Error adding to watchlist");
//             });
//     };

//     // Filter and search logic
//     useEffect(() => {
//         let blogs = all;

//         // Filter by category
//         if (category) {
//             blogs = blogs.filter((blog) => blog.category === category);
//         }

//         // Search by title
//         if (searchText) {
//             blogs = blogs.filter((blog) =>
//                 blog.Title.toLowerCase().includes(searchText.toLowerCase())
//             );
//         }

//         setFilteredBlogs(blogs);
//     }, [searchText, category, all]);

//     if (loading) {
//         return (
//             <div className="flex flex-col items-center my-36">
//                 <span className="loading loading-ring loading-lg"></span>
//             </div>
//         );
//     }

//     return (
//         <div>
//             <Navbar />
//             <div className="flex flex-col items-center mt-9 mx-7 mb-24">
//                 {/* Search and Category Filter */}
//                 <div className="flex flex-col md:flex-row justify-between items-center gap-5 w-full mb-6">
//                     <input
//                         type="text"
//                         placeholder="Search blogs by title"
//                         className="border p-2 rounded w-full md:w-1/2"
//                         value={searchText}
//                         onChange={(e) => setSearchText(e.target.value)}
//                     />
//                     <select
//                         className="border p-2 rounded w-full md:w-1/4"
//                         value={category}
//                         onChange={(e) => setCategory(e.target.value)}
//                     >
//                         <option value="">All Categories</option>
//                         <option value="Technology">Technology</option>
//                         <option value="Science">Science</option>
//                         <option value="Other">Other</option>
//                         {/* Add more categories as needed */}
//                     </select>
//                 </div>

//                 <div className=''>
//                     <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-6 mx-0 lg:mx-6 mt-7 ">
//                         {filteredBlogs.map((All) => (
//                             <div key={All.id}>
//                                  <motion.div
//                                 whileHover={{
//                                     y:-9,
//                                 }}
//                                 transition={{
//                                     ease:"easeInOut",
//                                     duration:0.3,
//                                 }}
//                                 className="w-[90vw] h-[520px] space-y-4 rounded-lg bg-white p-6 shadow-lg dark:shadow-[#303c42] hover:shadow-xl
//                                     sm:w-[350px] dark:bg-[#18181B] flex flex-col justify-between">
//                                     <img className="h-[275px] w-[350px] rounded-lg object-cover" src={All.Image} alt="card image" />
//                                     <div className="grid gap-2">
//                                         <h1 className="text-lg font-semibold ">{All.Title}</h1>
//                                         <p className="text-sm text-gray-500 dark:text-white/60">
//                                             {All.shortdescription.length > 150? `${All.shortdescription.substring(0,150)} ...`:All.shortdescription}
//                                         </p>
//                                     </div>
//                                     <div className="flex gap-4 ">
//                                         <motion.button
//                                         whileHover={{ scale: 1.08 }}
//                                         whileTap={{ scale: 0.8 }}
//                                         className="rounded-lg bg-slate-800 px-6 py-2 text-[12px] font-semibold text-white duration-300
//                                         hover:bg-slate-950 sm:text-sm md:text-base "
//                                         onClick={()=> handleExploreDetails(All)}>
//                                             Details
//                                         </motion.button>
//                                         {user ? (
//                                             <motion.button
//                                             whileHover={{ scale: 1.08 }}
//                                             whileTap={{ scale: 0.8 }}
//                                             className='btn btn-active btn-primary  text-white text-[16px] font-semibold  '
//                                             onClick={() => handleWatchList(All)}>
//                                                 Wishlist
//                                             </motion.button>
//                                         ) : (
//                                             <Link to='/login' className='btn btn-active btn-primary text-white text-[16px] font-semibold'>
//                                                 Wishlist
//                                             </Link>
//                                         )}
//                                     </div>
//                                 </motion.div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </div>
//     );
// };

// export default Allblogs;
