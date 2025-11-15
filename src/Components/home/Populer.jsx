
import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../auth/AuthProvider/AuthProvider';
import { toast } from 'react-toastify';
import { motion } from "motion/react"
import { FaHeart } from 'react-icons/fa';

const PopulerPost = () => {
    const [all, setAll] = useState([]);
    const { state: locationData } = useLocation();
    const [loading, setLoading] = useState(true);
    const [cardData, setCardData] = useState(locationData || {});
    const { user } = useContext(AuthContext);

    // get api link from env file
    const API = import.meta.env.VITE_API;

    useEffect(() => {
        if (locationData) {
            setCardData(locationData);
        }
    }, [locationData]);

    // Navigate to details page
    const navigate = useNavigate();
    const handleExploreDetails = (All) => {
        navigate(`/allblogs/${All.id}`, { state: All });
    };

    // Add to WatchList
    const handleWatchList = (All) => {
        let Id = All._id;
        let emaiL = user.email;
        let SendData = { id:Id,email:emaiL } ;
        console.log(SendData);

        fetch(`${API}/post-watchlists`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(SendData), // Send only the selected item
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                toast.success("Watchlist added successfully!");
            })
            .catch((error) => {
                console.error('Error:', error);
                toast.error("Error adding to watchlist");
            });
    };

    // Fetch data
    useEffect(() => {
        fetch(`${API}/featured-blogs`)
            .then((res) => res.json())
            .then((data) => {
                setAll(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, [API]);

    if (loading) {
        return <div className="flex flex-col items-center my-36">
            <span className="loading loading-ring loading-lg"></span>
        </div>;
    }

    return (
        <div>
            <div className='flex flex-col items-center gap-4 mt-28 '>
                <div className=''>
                    <h2 className='text-4xl font-bold text-center mb-3'>Populer Blog Posts</h2>
                </div>
                {/* Card */}
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-6 mx-0 lg:mx-6 mt-7 '>
                    {
                        all.map(All => (
                            <div key={All.id}>
                                <motion.div

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
                                            src={All.Image}
                                            alt={All.Title}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                        {/* Category Badge */}
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                                                {All.category || 'General'}
                                            </span>
                                        </div>
                                    </div>
                                    {/* <img className="h-[275px] w-[350px] rounded-lg object-cover" src={blog.Image} alt="card image" /> */}
                                    <div className="grid gap-2">
                                        <h1 className="text-lg font-semibold font-sans ">{All.Title}</h1>
                                        <p className="text-sm text-gray-500 dark:text-white/60">
                                            {All.shortdescription.length > 150 ? `${All.shortdescription.substring(0, 150)}...` : All.shortdescription}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between gap-4 ">
                                        <motion.button
                                            whileHover={{ scale: 1.08 }}
                                            whileTap={{ scale: 0.8 }}
                                            className="rounded-lg bg-slate-800 px-6 py-2 text-[12px] font-semibold text-white duration-300 
                                                hover:bg-slate-950 sm:text-sm md:text-base "
                                            onClick={() => handleExploreDetails(All)}>
                                            Details
                                        </motion.button>
                                        {user ? (
                                            <motion.button
                                                whileHover={{ scale: 1.08 }}
                                                whileTap={{ scale: 0.8 }}
                                                className='btn btn-active btn-primary  text-white text-[16px] font-semibold  '
                                                onClick={() => handleWatchList(All)}>
                                                <FaHeart />
                                            </motion.button>
                                        ) : (
                                            <Link to='/login' className='btn btn-active btn-primary text-white text-[16px] font-semibold'>
                                                <FaHeart />
                                            </Link>
                                        )}
                                    </div>
                                </motion.div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default PopulerPost;

