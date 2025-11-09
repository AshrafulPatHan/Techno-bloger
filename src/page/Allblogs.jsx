import { useContext, useEffect, useState } from 'react';
import Navbar from '../Components/navigation/Navbar';
import Footer from '../Components/navigation/Footer';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../Components/auth/AuthProvider/AuthProvider';
import { toast } from 'react-toastify';
import { motion } from "motion/react"

const Allblogs = () => {
    const [all, setAll] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [category, setCategory] = useState('');
    const { user } = useContext(AuthContext);

    // go to details page
    const navigate = useNavigate();
    const handleExploreDetails = (All) => {
        navigate(`/allblogs/${All.id}`, { state: All });
    };

    // get api link from env file
    const API = import.meta.env.VITE_API;

    // fetch data
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

    // Add to WatchList
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
                toast.success("Watchlist added successfully!");
            })
            .catch((error) => {
                console.error('Error:', error);
                toast.error("Error adding to watchlist");
            });
    };

    // Filter and search logic
    useEffect(() => {
        let blogs = all;

        // Filter by category
        if (category) {
            blogs = blogs.filter((blog) => blog.category === category);
        }

        // Search by title
        if (searchText) {
            blogs = blogs.filter((blog) =>
                blog.Title.toLowerCase().includes(searchText.toLowerCase())
            );
        }

        setFilteredBlogs(blogs);
    }, [searchText, category, all]);

    if (loading) {
        return (
            <div className="flex flex-col items-center my-36">
                <span className="loading loading-ring loading-lg"></span>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div className="flex flex-col items-center mt-9 mx-7 mb-24">
                {/* Search and Category Filter */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-5 w-full mb-6">
                    <input
                        type="text"
                        placeholder="Search blogs by title"
                        className="border p-2 rounded w-full md:w-1/2"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <select
                        className="border p-2 rounded w-full md:w-1/4"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        <option value="Technology">Technology</option>
                        <option value="Science">Science</option>
                        <option value="Other">Other</option>
                        {/* Add more categories as needed */}
                    </select>
                </div>

                <div className=''>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-6 mx-0 lg:mx-6 mt-7 ">
                        {filteredBlogs.map((All) => (
                            <div key={All.id}>
                                 <motion.div
                                whileHover={{
                                    y:-9,
                                }}
                                transition={{
                                    ease:"easeInOut",
                                    duration:0.3,
                                }}
                                className="w-[90vw] h-[520px] space-y-4 rounded-lg bg-white p-6 shadow-lg dark:shadow-[#303c42] hover:shadow-xl 
                                    sm:w-[350px] dark:bg-[#18181B] flex flex-col justify-between">
                                    <img className="h-[275px] w-[350px] rounded-lg object-cover" src={All.Image} alt="card image" />
                                    <div className="grid gap-2">
                                        <h1 className="text-lg font-semibold ">{All.Title}</h1>
                                        <p className="text-sm text-gray-500 dark:text-white/60">
                                            {All.shortdescription.length > 150? `${All.shortdescription.substring(0,150)} ...`:All.shortdescription}
                                        </p>
                                    </div>
                                    <div className="flex gap-4 ">
                                        <motion.button 
                                        whileHover={{ scale: 1.08 }}
                                        whileTap={{ scale: 0.8 }}
                                        className="rounded-lg bg-slate-800 px-6 py-2 text-[12px] font-semibold text-white duration-300 
                                        hover:bg-slate-950 sm:text-sm md:text-base "
                                        onClick={()=> handleExploreDetails(All)}>
                                            Details
                                        </motion.button>
                                        {user ? (
                                            <motion.button
                                            whileHover={{ scale: 1.08 }}
                                            whileTap={{ scale: 0.8 }}
                                            className='btn btn-active btn-primary  text-white text-[16px] font-semibold  '
                                            onClick={() => handleWatchList(All)}>
                                                Wishlist
                                            </motion.button>
                                        ) : (
                                            <Link to='/login' className='btn btn-active btn-primary text-white text-[16px] font-semibold'>
                                                Wishlist
                                            </Link>
                                        )}
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Allblogs;
