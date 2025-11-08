import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../Components/navigation/Navbar";
import Footer from "../../Components/navigation/Footer";
import { toast } from "react-toastify";
import { AuthContext } from "../../Components/auth/AuthProvider/AuthProvider";
import { FaCommentDots } from "react-icons/fa";
import { MdTipsAndUpdates } from "react-icons/md";


const Details = () => {
    const { state: locationData } = useLocation();
    const [cardData, setCardData] = useState(locationData || { comments: [] });
    const { user } = useContext(AuthContext);
    // get api link from env file
    const API = import.meta.env.VITE_API;

    // Update Reviews page
    const navigate = useNavigate();
    const handleUpdate = (cardData) => {
        navigate(`/update/${cardData.id}`, { state: cardData });
    };


    useEffect(() => {
        if (locationData) {
            setCardData(locationData);
        }
    }, [locationData]);

    // ---- Add Comment ----
    const handleAddComment = (event) => {
        event.preventDefault();
        const form = event.target;

        const Comment = form.Comment.value;
        const username = user?.displayName || "Anonymous";
        const userEmail = user?.email || "No Email Provided";
        const userphotoURL = user?.photoURL || "No photoURL Provided";
        const documentId = cardData?._id; // Target specific document by its ID

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
        console.log("Submitted comment data:", detailData);
        fetch(`${API}/comant`, {

            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(detailData),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Response from server:", data);
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
            <div className="flex flex-col items-center mt-10">
                <h2 className="text-2xl font-bold">Details not available!</h2>
                <button
                    className="btn btn-primary mt-4"
                    onClick={() => window.history.back()}
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center">
                <div className="flex flex-col items-center mt-7 gap-4">
                    {/* Image Section */}
                    <div>
                        <img
                            src={cardData?.Image || "default-image-url.jpg"}
                            alt="Image"
                            className="w-full h-[250px] md:h-[550px] object-cover"
                        />
                    </div>
                    {/* Content Section */}
                    <div className="border-[15px] border-green-300">
                        <div className="flex flex-col items-start p-2 gap-3">
                            <h2 className="text-3xl font-bold">{cardData.Title}</h2>
                            <div className="text-base sm:text-lg font-medium w-[300px] sm:w-[500px] lg:w-[600px] xl:w-[720px] 2xl:w-[1250px]">
                                <h4 className="text-xl font-bold text-blue-400">
                                    <span className="text-black">Category:</span> {cardData.category}
                                </h4>
                                <h4 className="text-xl font-bold text-red-400">
                                    {cardData.shortdescription}
                                </h4>
                                <p>
                                    <span className="text-lg font-bold text-amber-500">
                                        Details :
                                    </span>{" "}
                                    {cardData.longdescription}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-9 mb-8">
                    <div className="flex flex-col items-center">
                        {/* update */}
                        {user?.email === cardData.userEmail && (
                            <div>
                                <button
                                    onClick={() => handleUpdate(cardData)}
                                    className="btn btn-active bg-blue-400 text-white mb-3">
                                    Update <MdTipsAndUpdates />
                                </button>
                            </div>
                        )}
                        {/* comante */}
                        {user?.email === cardData.userEmail ? (
                            <div>
                                <p className="text-lg mb-3">you are the oner of this blog</p>
                            </div>
                        ) : (
                            <form
                                className="flex flex-col sm:flex-row sm:items-center items-end mb-6 gap-3"
                                onSubmit={handleAddComment}
                            >
                                <input
                                    type="text"
                                    name="Comment"
                                    placeholder="Type here"
                                    className="input input-bordered input-warning max-w-xs w-[350px]"
                                />
                                <button className="btn btn-active border-t-green-400">
                                    Comment <FaCommentDots />
                                </button>
                            </form>
                        )}
                        <div className="mockup-window bg-base-300 border w-[300px] md:w-[650px] xl:w-[700px]">
                            <div className="bg-base-200 flex px-4 py-6">
                                <div className="flex flex-col items-start">
                                    <h2 className="flex flex-row items-center gap-1 text-xl font-bold">
                                        <FaCommentDots /> Comments :
                                    </h2>
                                    {cardData.comments?.map((comment, index) => (
                                        <div key={index} className="mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img
                                                            src={comment.userphotoURL}
                                                            alt="User Avatar"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{comment.username}</div>
                                                    <div className="text-sm opacity-50">
                                                        {new Date(comment.date).toLocaleString()}
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="ml-16">
                                                <span className="badge badge-ghost text-lg badge-sm">
                                                    {comment.Comment}
                                                </span>
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Details;