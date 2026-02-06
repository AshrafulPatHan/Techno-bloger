import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../../Components/navigation/Navbar';
import Footer from '../../Components/navigation/Footer';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../Components/auth/AuthProvider/AuthProvider';

const Update = () => {

    const { user } = useContext(AuthContext);
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { state: locationData } = useLocation();
    const [cardData, setCardData] = useState(locationData || {});
    // get api link from env file
    const API = import.meta.env.VITE_API;

    useEffect(() => {
        if (locationData) {
            setCardData(locationData);
            setCategory(locationData.category || ''); // Set Category if present
            setLoading(false);
        }
    }, [locationData]);


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

        const Update = { Title, shortdescription, Image, longdescription, category, username, userEmail };
        console.log(Update);

        // send data to the server
        const { _id: id } = cardData; // Get ID from cardData

        // send data to the server
        fetch(`${API}/blog/${id}`, {

            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Update),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('Response:', data);
                setLoading(false);
                toast.success("Review updated successfully!");
                navigate('/');
            })
            .catch((error) => {
                console.error('Error:', error);
                toast.error("Error updating review");
                setLoading(false);
            });
    };



    return (
        <div>
            <Navbar />
            <div className="flex justify-center mt-5 px-4">
                <form onSubmit={handleAddReview} className="card bg-base-100 shadow-2xl p-8 w-full max-w-4xl">
                    <h2 className="text-4xl font-bold text-center mb-8">Update Your Blog</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Section */}
                        <div>
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Blog Title</span>
                                </label>
                                <input
                                    type="text"
                                    name="Title"
                                    defaultValue={cardData.Title}
                                    placeholder="Blog Title"
                                    className="input input-bordered input-secondary w-full"
                                />
                            </div>
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Short Description</span>
                                </label>
                                <textarea
                                    name="shortdescription"
                                    defaultValue={cardData.shortdescription}
                                    placeholder="Write your Description..."
                                    className="textarea textarea-bordered textarea-secondary w-full"
                                ></textarea>
                            </div>
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Long Description</span>
                                </label>
                                <textarea
                                    name="longdescription"
                                    defaultValue={cardData.longdescription}
                                    placeholder="Write your Description..."
                                    className="textarea textarea-bordered textarea-secondary w-full"
                                ></textarea>
                            </div>
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Blog Cover Image/Thumbnail</span>
                                </label>
                                <input
                                    type="text"
                                    name="Image"
                                    defaultValue={cardData.Image}
                                    placeholder="Image URL"
                                    className="input input-bordered input-secondary w-full"
                                />
                            </div>
                        </div>
                        {/* Right Section */}
                        <div>
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Blog category</span>
                                </label>
                                <details className="dropdown">
                                    <summary className="btn w-full">category</summary>
                                    <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-full p-2 shadow">
                                        <li>
                                            <a onClick={() => setCategory('Technology')}>Technology</a>
                                        </li>
                                        <li>
                                            <a onClick={() => setCategory('Science')}>Science</a>
                                        </li>
                                        <li>
                                            <a onClick={() => setCategory('Other')}>Other</a>
                                        </li>
                                    </ul>
                                </details>
                            </div>
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">User Name</span>
                                </label>
                                <div className="input input-bordered input-secondary text-start w-full">
                                    <p className="mt-2">{user?.displayName || 'N/A'}</p>
                                </div>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">User Email</span>
                                </label>
                                <div className="input input-bordered input-secondary text-start w-full">
                                    <p className="mt-2">{user?.email || 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Submit Button */}
                    <button className="btn btn-primary w-full mt-6">Submit</button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default Update;