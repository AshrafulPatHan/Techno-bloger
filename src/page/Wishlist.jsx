import { useEffect, useState, useContext } from "react";
import Navbar from "../Components/navigation/Navbar";
import Footer from "../Components/navigation/Footer";
import { useNavigate } from "react-router";
import { MdDelete } from "react-icons/md";
import { FaHeart, FaEye, FaBook, FaTag, FaBookmark } from "react-icons/fa";
import swal from "sweetalert";
import { AuthContext } from "../Components/auth/AuthProvider/AuthProvider";

const Wishlist = () => {
    const [data, setData] = useState([]);
    const [likes, setLikes] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const API = import.meta.env.VITE_API;
    const navigate = useNavigate();

    const handleExploreDetails = (all) => {
        navigate(`/allblogs/${all.id}`, { state: all });
    };

    const userEmail = { email: `${user.email}` };

    useEffect(() => {
        async function getWish() {
            try {
                const response = await fetch(`${API}/get-watchlists`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userEmail)
                });

                const result = await response.json();
                setData(result);
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setLoading(false);
            }
        }
        getWish();
    }, [user?.email]);




    const handleDelete = (id) => {
        swal({
            title: "Remove from Wishlist?",
            text: "This blog will be removed from your wishlist.",
            icon: "warning",
            buttons: {
                cancel: {
                    text: "Cancel",
                    value: false,
                    visible: true,
                    className: "swal-button--cancel",
                },
                confirm: {
                    text: "Remove",
                    value: true,
                    visible: true,
                    className: "swal-button--danger",
                }
            },
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                setLoading(true);
                fetch(`${API}/watchListsdata/${id}`, {
                    method: "DELETE",
                })
                    .then((res) => {
                        if (!res.ok) throw new Error("Failed to delete");
                        return res.json();
                    })
                    .then(() => {
                        setData((prevData) => prevData.filter((item) => item._id !== id));
                        swal("Removed!", "The blog has been removed from your wishlist.", "success");
                    })
                    .catch((error) => {
                        console.error("Error deleting data:", error);
                        swal("Error!", "Failed to remove the blog.", "error");
                    })
                    .finally(() => setLoading(false));
            }
        });
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-pink-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                    <div className="relative">
                        <div className="w-20 h-20 border-4 border-pink-200 border-t-pink-600 rounded-full animate-spin"></div>
                        <FaHeart className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-pink-600 text-2xl animate-pulse" />
                    </div>
                    <div className="mt-4 text-gray-600 dark:text-gray-400 font-semibold">Loading your wishlist...</div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-pink-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <Navbar />

            {/* Hero Section */}
            <div className="wishlist-background text-white py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <FaHeart className="text-4xl text-pink-200 animate-pulse" />
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                            My Wishlist
                        </h1>
                    </div>
                    <p className="text-center text-lg md:text-xl text-pink-100 max-w-2xl mx-auto">
                        Your saved blogs and favorite articles in one place
                    </p>
                    <div className="mt-6 flex items-center justify-center gap-6 text-sm">
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                            <FaBookmark className="text-pink-200" />
                            <span className="font-semibold">{data.length} Saved Items</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
                {data.length === 0 ? (
                    /* Empty State */
                    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-12 text-center">
                        <div className="flex justify-center mb-6">
                            <div className="bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 p-8 rounded-full">
                                <FaHeart className="text-6xl text-pink-400 dark:text-pink-500" />
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                            Your Wishlist is Empty
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                            Start adding blogs to your wishlist to keep track of articles you want to read later.
                        </p>
                        <button
                            onClick={() => navigate('/allblogs')}
                            className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        >
                            Explore Blogs
                        </button>
                    </div>
                ) : (
                    /* Wishlist Grid */
                    <div className="grid grid-cols-1 gap-6">
                        {data.map((item, index) => {
                            const blog = item.blog[0];
                            return (
                                <div
                                    key={blog._id}
                                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                                >
                                    <div className="flex flex-col md:flex-row">
                                        {/* Image Section */}
                                        <div className="md:w-80 h-64 md:h-auto relative overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
                                            <img
                                                src={blog.Image}
                                                alt={blog.Title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-gradient-to-r from-pink-600 to-purple-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                                                    <FaTag className="text-xs" />
                                                    {blog.category}
                                                </span>
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </div>

                                        {/* Content Section */}
                                        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                                            <div>
                                                <div className="flex items-start justify-between mb-4">
                                                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors line-clamp-2">
                                                        {blog.Title}
                                                    </h3>
                                                </div>

                                                <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
                                                    {blog.shortdescription || "No description available"}
                                                </p>

                                                {/* Stats */}
                                                <div className="flex flex-wrap items-center gap-4 mb-6">
                                                    <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-lg">
                                                        <FaBook className="text-blue-600 dark:text-blue-400 text-sm" />
                                                        <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                                                            {blog.longdescription ? blog.longdescription.split(' ').length : 0} words
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2 bg-purple-50 dark:bg-purple-900/20 px-3 py-1.5 rounded-lg">
                                                        <FaTag className="text-purple-600 dark:text-purple-400 text-sm" />
                                                        <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">
                                                            {blog.category}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex flex-col sm:flex-row gap-3">
                                                <button
                                                    onClick={() => handleExploreDetails(blog)}
                                                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                                                >
                                                    <FaEye />
                                                    Read Article
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(blog._id)}
                                                    className="bg-red-50 hover:bg-red-600 dark:bg-red-900/20 dark:hover:bg-red-600 text-red-600 hover:text-white dark:text-red-400 dark:hover:text-white font-semibold py-3 px-6 rounded-xl border-2 border-red-200 dark:border-red-800 hover:border-red-600 transition-all duration-300 flex items-center justify-center gap-2"
                                                >
                                                    <MdDelete className="text-xl" />
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}

                {/* Info Banner */}
                {data.length > 0 && (
                    <div className="mt-12 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 border-2 border-pink-200 dark:border-pink-800 rounded-2xl p-8">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                            <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-4 rounded-2xl flex-shrink-0">
                                <FaBookmark className="text-4xl text-white" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                                    Keep Growing Your Collection
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    You have {data.length} {data.length === 1 ? 'article' : 'articles'} saved in your wishlist.
                                    Continue exploring and add more interesting reads!
                                </p>
                                <button
                                    onClick={() => navigate('/allblogs')}
                                    className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 inline-flex items-center gap-2"
                                >
                                    <FaBookmark />
                                    Browse More Blogs
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default Wishlist;


// old code :

// import { useEffect, useState,useContext } from "react";
// import Navbar from "../Components/navigation/Navbar";
// import Footer from "../Components/navigation/Footer";
// import { useNavigate } from "react-router";
// import { MdDelete } from "react-icons/md";
// import swal from "sweetalert";
// import { toast } from "react-toastify";
// import { AuthContext } from "../Components/auth/AuthProvider/AuthProvider";

// const Wishlist = () => {
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const { user } = useContext(AuthContext); // get user data
//     const API = import.meta.env.VITE_API; // get api link from env file

//     const navigate = useNavigate();

//     const handleExploreDetails = (all) => {
//         navigate(`/allblogs/${all.id}`, { state: all });
//     };

//     const userEmail = { email: `${user.email}` }
//     useEffect(() => {
//         async function getWish() {
//             try {
//                 const response = await fetch(`${API}/watchListsdata`, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify(userEmail)
//                 })

//                 const result = await response.json();
//                 setData(result)
//                 setLoading(false)
//                 console.log('Success:', result);
//             } catch (error) {
//                 console.error('Error:', error);
//             }

//         } getWish()
//     }, [user?.email]);


//     const handleDelete = (id) => {
//         console.log('Deleting ID:', id);
//         swal({
//             title: "Are you sure?",
//             text: "You will not be able to recover this data!",
//             icon: "warning",
//             buttons: true,
//             dangerMode: true,
//         }).then((willDelete) => {
//             if (willDelete) {
//                 setLoading(true);
//                 fetch(`${API}/watchListsdata/${id}`, {
//                     method: "DELETE",
//                 })
//                     .then((res) => {
//                         if (!res.ok) throw new Error("Failed to delete");
//                         return res.json();
//                     })
//                     .then(() => {

//                         setData((prevData) => prevData.filter((item) => item._id !== id));
//                         swal("Deleted!", "The data has been removed successfully.", "success");
//                     })
//                     .catch((error) => {
//                         console.error("Error deleting data:", error);
//                         swal("Error!", "Failed to delete the data.", "error");
//                     })
//                     .finally(() => setLoading(false));
//             }
//         });
//     };



//     return (
//         <div className="flex flex-col min-h-screen">
//             <Navbar />
//             <div className="flex-grow">
//                 <div className="overflow-x-auto">
//                     <table className="table">
//                         {/* Table Head */}
//                         <thead>
//                             <tr>
//                                 <th>Title</th>
//                                 <th>Category</th>
//                                 <th>Blog Length</th>
//                                 <th>Actions</th>
//                             </tr>
//                         </thead>
//                         {data.map((item) => (
//                             <tbody key={item._id}>
//                                 <tr>
//                                     <td>
//                                         <div className="flex items-center gap-3">
//                                             <div className="avatar">
//                                                 <div className="rounded-xl h-10 sm:h-24 w-10 sm:w-24 xl:w-32">
//                                                     <img src={item.Image} alt={item.name} />
//                                                 </div>
//                                             </div>
//                                             <div>
//                                                 <div className="font-bold">{item.Title}</div>
//                                             </div>
//                                         </div>
//                                     </td>
//                                     <td>{item.category}</td>
//                                     <td>
//                                         {item.longdescription
//                                             ? item.longdescription.length
//                                             : 0}{" "}
//                                         Word
//                                     </td>
//                                     <td>
//                                         <button
//                                             className="btn btn-outline btn-secondary w-28 mr-2"
//                                             onClick={() => handleExploreDetails(item)}
//                                         >
//                                             Details
//                                         </button>
//                                         <button
//                                             className="btn btn-outline text-white btn-secondary w-28"
//                                             onClick={() => handleDelete(item._id)}
//                                         >
//                                             Remove
//                                             <MdDelete />
//                                         </button>
//                                     </td>
//                                 </tr>
//                             </tbody>
//                         ))}
//                     </table>
//                 </div>
//             </div>
//             <Footer />
//         </div>

//     );
// };

// export default Wishlist;
