import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../auth/AuthProvider/AuthProvider';
import { toast } from 'react-toastify';
import { motion } from "motion/react"

const Recent = () => {
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
        fetch(`${API}/watchLists`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(All), // Send only the selected item
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
        fetch(`${API}/limited-data`)
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
            <div className='flex flex-col items-center gap-4 mt-6 '>
                <div className='bitter-Title'>
                    <h2 className='text-4xl font-semibold text-center mb-3'>Recent Blog Posts</h2>
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
                                    className="w-[99vw] sm:w-[350px] h-[520px] space-y-4 rounded-lg bg-white p-6 shadow-lg dark:shadow-[#303c42] hover:shadow-xl 
                                    md:w-[350px] dark:bg-[#18181B] flex flex-col justify-between">
                                    <img width={400} height={400} className="h-[275px] w-[350px] rounded-lg object-cover" src={All.Image} alt="card image" />
                                    <div className="grid gap-2">
                                        <h1 className="text-lg font-semibold ">{All.Title}</h1>
                                        <p className="text-sm text-gray-500 dark:text-white/60">
                                            {All.shortdescription}
                                        </p>
                                    </div>
                                    <div className="flex gap-4 ">
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
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Recent;
