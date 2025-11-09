import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../Components/navigation/Navbar";
import Footer from "../../Components/navigation/Footer";
import { toast } from "react-toastify";
import { AuthContext } from "../../Components/auth/AuthProvider/AuthProvider";
import { FaCommentDots, FaEdit, FaClock, FaTag, FaUser } from "react-icons/fa";
import { MdTipsAndUpdates } from "react-icons/md";
import { BiSolidQuoteAltLeft } from "react-icons/bi";

const Details = () => {
    const { state: locationData } = useLocation();
    const [cardData, setCardData] = useState(locationData || { comments: [] });
    const { user } = useContext(AuthContext);
    const API = import.meta.env.VITE_API;

    const navigate = useNavigate();
    const handleUpdate = (cardData) => {
        navigate(`/update/${cardData.id}`, { state: cardData });
    };

    useEffect(() => {
        if (locationData) {
            setCardData(locationData);
        }
    }, [locationData]);

    const handleAddComment = (event) => {
        event.preventDefault();
        const form = event.target;

        const Comment = form.Comment.value;
        const username = user?.displayName || "Anonymous";
        const userEmail = user?.email || "No Email Provided";
        const userphotoURL = user?.photoURL || "No photoURL Provided";
        const documentId = cardData?._id;

        if (!Comment) {
            toast.error("All fields are required");
            return;
        }

        const detailData = {
            Comment,
            username,
            userEmail,
            userphotoURL,
            date: new Date(),
            _id: documentId,
        };

        fetch(`${API}/comant`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(detailData),
        })
            .then((res) => res.json())
            .then((data) => {
                toast.success("Comment added successfully!");
                setCardData((prevState) => ({
                    ...prevState,
                    comments: [...(prevState.comments || []), detailData],
                }));
                form.reset();
            })
            .catch((error) => {
                console.error("Fetch error:", error);
                toast.error("Error adding comment");
            });
    };

    if (!locationData) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Details not available!</h2>
                    <button
                        className="btn bg-blue-600 hover:bg-blue-700 text-white border-none px-8"
                        onClick={() => window.history.back()}
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            
            {/* Hero Image Section */}
            <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800">
                <img
                    src={cardData?.Image || "default-image-url.jpg"}
                    alt={cardData.Title}
                    className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                
                {/* Floating Title Card */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                    <div className="max-w-5xl mx-auto">
                        <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                            <FaTag className="text-xs" />
                            {cardData.category}
                        </div>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                            {cardData.Title}
                        </h1>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-5xl mx-auto px-4 md:px-6 py-12">
                {/* Featured Quote */}
                <div className="relative bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600 rounded-r-2xl p-8 mb-10 shadow-md">
                    <BiSolidQuoteAltLeft className="absolute top-4 left-4 text-5xl text-blue-200 opacity-50" />
                    <p className="text-xl md:text-2xl font-semibold text-gray-800 italic pl-8">
                        {cardData.shortdescription}
                    </p>
                </div>

                {/* Article Content */}
                <article className="prose prose-lg max-w-none mb-12">
                    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                        <div className="text-gray-700 leading-relaxed text-lg">
                            {cardData.longdescription}
                        </div>
                    </div>
                </article>

                {/* Update Button (if owner) */}
                {user?.email === cardData.userEmail && (
                    <div className="flex justify-center mb-10">
                        <button
                            onClick={() => handleUpdate(cardData)}
                            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <MdTipsAndUpdates className="text-xl" />
                            Update Article
                        </button>
                    </div>
                )}

                {/* Comments Section */}
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
                    <h2 className="flex items-center gap-3 text-3xl font-bold text-gray-800 mb-8">
                        <FaCommentDots className="text-blue-600" />
                        Comments
                        <span className="text-lg font-normal text-gray-500">
                            ({cardData.comments?.length || 0})
                        </span>
                    </h2>

                    {/* Comment Form */}
                    {user?.email === cardData.userEmail ? (
                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6 mb-8">
                            <p className="flex items-center gap-2 text-amber-800 font-medium">
                                <FaUser className="text-amber-600" />
                                You are the owner of this blog
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleAddComment} className="mb-10">
                            <div className="flex flex-col md:flex-row gap-4">
                                <input
                                    type="text"
                                    name="Comment"
                                    placeholder="Share your thoughts..."
                                    className="flex-1 px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-lg"
                                />
                                <button 
                                    type="submit"
                                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                                >
                                    <FaCommentDots />
                                    Post Comment
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Comments List */}
                    <div className="space-y-6">
                        {cardData.comments?.length > 0 ? (
                            cardData.comments.map((comment, index) => (
                                <div 
                                    key={index} 
                                    className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-200"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="avatar flex-shrink-0">
                                            <div className="w-12 h-12 rounded-full ring-2 ring-blue-200 ring-offset-2">
                                                <img
                                                    src={comment.userphotoURL}
                                                    alt={comment.username}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                                <h4 className="font-bold text-gray-900 text-lg">
                                                    {comment.username}
                                                </h4>
                                                <span className="flex items-center gap-1 text-sm text-gray-500">
                                                    <FaClock className="text-xs" />
                                                    {new Date(comment.date).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </span>
                                            </div>
                                            <p className="text-gray-700 text-base leading-relaxed">
                                                {comment.Comment}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12">
                                <FaCommentDots className="text-6xl text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500 text-lg">
                                    No comments yet. Be the first to share your thoughts!
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Details;


// import React, { useContext, useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import Navbar from "../../Components/navigation/Navbar";
// import Footer from "../../Components/navigation/Footer";
// import { toast } from "react-toastify";
// import { AuthContext } from "../../Components/auth/AuthProvider/AuthProvider";
// import { FaCommentDots } from "react-icons/fa";
// import { MdTipsAndUpdates } from "react-icons/md";


// const Details = () => {
//     const { state: locationData } = useLocation();
//     const [cardData, setCardData] = useState(locationData || { comments: [] });
//     const { user } = useContext(AuthContext);
//     // get api link from env file
//     const API = import.meta.env.VITE_API;

//     // Update Reviews page
//     const navigate = useNavigate();
//     const handleUpdate = (cardData) => {
//         navigate(`/update/${cardData.id}`, { state: cardData });
//     };


//     useEffect(() => {
//         if (locationData) {
//             setCardData(locationData);
//         }
//     }, [locationData]);

//     // ---- Add Comment ----
//     const handleAddComment = (event) => {
//         event.preventDefault();
//         const form = event.target;

//         const Comment = form.Comment.value;
//         const username = user?.displayName || "Anonymous";
//         const userEmail = user?.email || "No Email Provided";
//         const userphotoURL = user?.photoURL || "No photoURL Provided";
//         const documentId = cardData?._id; // Target specific document by its ID

//         if (!Comment) {
//             toast.error("All fields are required");
//             return;
//         }

//         const detailData = {
//             Comment,
//             username,
//             userEmail,
//             userphotoURL,
//             date: new Date(),
//             _id: documentId,
//         };
//         console.log("Submitted comment data:", detailData);
//         fetch(`${API}/comant`, {

//             method: "PATCH",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(detailData),
//         })
//             .then((res) => res.json())
//             .then((data) => {
//                 console.log("Response from server:", data);
//                 toast.success("Comment added successfully!");
//                 setCardData((prevState) => ({
//                     ...prevState,
//                     comments: [...(prevState.comments || []), detailData],
//                 }));
//                 form.reset();
//             })
//             .catch((error) => {
//                 console.error("Fetch error:", error);
//                 toast.error("Error adding comment");
//             });
//     };

//     if (!locationData) {
//         return (
//             <div className="flex flex-col items-center mt-10">
//                 <h2 className="text-2xl font-bold">Details not available!</h2>
//                 <button
//                     className="btn btn-primary mt-4"
//                     onClick={() => window.history.back()}
//                 >
//                     Go Back
//                 </button>
//             </div>
//         );
//     }

//     return (
//         <>
//             <Navbar />
//             <div className="flex flex-col items-center">
//                 <div className="flex flex-col items-center mt-7 gap-4">
//                     {/* Image Section */}
//                     <div>
//                         <img
//                             src={cardData?.Image || "default-image-url.jpg"}
//                             alt="Image"
//                             className="w-full h-[250px] md:h-[550px] object-cover"
//                         />
//                     </div>
//                     {/* Content Section */}
//                     <div className="border-[5px] border-green-300 rounded-xl p-6">
//                         <div className="flex flex-col items-start p-2 gap-3">
//                             <h2 className="text-3xl font-bold">{cardData.Title}</h2>
//                             <div className="text-base sm:text-lg font-medium w-[300px] sm:w-[500px] lg:w-[600px] xl:w-[720px] 2xl:w-[1250px]">
//                                 <h4 className="font-bold text-blue-400 text-sm">
//                                     <span className="text-black ">Category:</span> {cardData.category}
//                                 </h4>
//                                 <h4 className="text-xl font-bold text-red-400 italic">
//                                     {cardData.shortdescription}
//                                 </h4>
//                                 <p>
//                                     <span className="text-lg font-bold text-amber-500">
//                                         Details :
//                                     </span>{" "}
//                                     {cardData.longdescription}
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="mt-9 mb-8">
//                     <div className="flex flex-col items-center">
//                         {/* update */}
//                         {user?.email === cardData.userEmail && (
//                             <div>
//                                 <button
//                                     onClick={() => handleUpdate(cardData)}
//                                     className="btn btn-active bg-blue-400 text-white mb-3">
//                                     Update <MdTipsAndUpdates />
//                                 </button>
//                             </div>
//                         )}
//                         {/* comante */}
//                         {user?.email === cardData.userEmail ? (
//                             <div>
//                                 <p className="text-lg mb-3">you are the oner of this blog</p>
//                             </div>
//                         ) : (
//                             <form
//                                 className="flex flex-col sm:flex-row sm:items-center items-end mb-6 gap-3"
//                                 onSubmit={handleAddComment}
//                             >
//                                 <input
//                                     type="text"
//                                     name="Comment"
//                                     placeholder="Type here"
//                                     className="input input-bordered input-warning max-w-xs w-[350px]"
//                                 />
//                                 <button className="btn btn-active border-t-green-400">
//                                     Comment <FaCommentDots />
//                                 </button>
//                             </form>
//                         )}
//                         <div className="mockup-window bg-slate-100 dark:bg-base-300 border w-[300px] md:w-[650px] xl:w-[700px]">
//                             <div className="bg-white dark:bg-base-200 flex px-4 py-6">
//                                 <div className="flex flex-col items-start">
//                                     <h2 className="flex flex-row items-center gap-1 text-xl font-bold">
//                                         <FaCommentDots /> Comments :
//                                     </h2>
//                                     {cardData.comments?.map((comment, index) => (
//                                         <div key={index} className="mb-4">
//                                             <div className="flex items-center gap-3">
//                                                 <div className="avatar">
//                                                     <div className="mask mask-squircle h-12 w-12">
//                                                         <img
//                                                             src={comment.userphotoURL}
//                                                             alt="User Avatar"
//                                                         />
//                                                     </div>
//                                                 </div>
//                                                 <div>
//                                                     <div className="font-bold">{comment.username}</div>
//                                                     <div className="text-sm opacity-50">
//                                                         {new Date(comment.date).toLocaleString()}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <p className="ml-16">
//                                                 <span className="badge badge-ghost text-lg badge-sm">
//                                                     {comment.Comment}
//                                                 </span>
//                                             </p>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </>
//     );
// };

// export default Details;