
// wethout dark mode code => 

import React, { useEffect, useState } from 'react';
import Navbar from '../Components/navigation/Navbar';
import Footer from '../Components/navigation/Footer';
import { useNavigate } from 'react-router';
import DataTable from 'react-data-table-component';
import { FaStar, FaEye, FaCalendar, FaUser, FaBook, FaTag } from 'react-icons/fa';
import { MdTrendingUp } from 'react-icons/md';

const FeaturedBlogs = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const API = import.meta.env.VITE_API;

    const handleExploreDetails = (all) => {
        navigate(`/allblogs/${all.id}`, { state: all });
    };

    // Custom styles for DataTable
    const customStyles = {
        headRow: {
            style: {
                backgroundColor: '#1e40af',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: '700',
                borderRadius: '12px 12px 0 0',
                minHeight: '56px',
            },
        },
        headCells: {
            style: {
                paddingLeft: '16px',
                paddingRight: '16px',
                color: '#ffffff',
            },
        },
        rows: {
            style: {
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                backgroundColor: '#ffffff',
                minHeight: '72px',
                '&:hover': {
                    backgroundColor: '#f3f4f6',
                    cursor: 'pointer',
                    transform: 'scale(1.01)',
                    transition: 'all 0.2s ease-in-out',
                },
            },
            stripedStyle: {
                backgroundColor: '#f9fafb',
            },
        },
        cells: {
            style: {
                paddingLeft: '16px',
                paddingRight: '16px',
            },
        },
        pagination: {
            style: {
                backgroundColor: '#ffffff',
                borderTop: '1px solid #e5e7eb',
                minHeight: '56px',
                fontSize: '14px',
                color: '#374151',
            },
            pageButtonsStyle: {
                borderRadius: '8px',
                height: '40px',
                width: '40px',
                padding: '8px',
                margin: '4px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                backgroundColor: 'transparent',
                fill: '#374151',
                '&:disabled': {
                    cursor: 'not-allowed',
                    fill: '#9ca3af',
                },
                '&:hover:not(:disabled)': {
                    backgroundColor: '#3b82f6',
                    fill: '#ffffff',
                },
            },
        },
    };

    const columns = [
        {
            name: 'Blog Post',
            selector: row => row.Title,
            sortable: true,
            width: '300px',
            cell: row => (
                <div className="flex items-center gap-4 py-2">
                    <div className="relative group">
                        <div className="w-20 h-20 rounded-xl overflow-hidden shadow-md">
                            <img 
                                src={row.Image} 
                                alt={row.Title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                        </div>
                        <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300"></div>
                    </div>
                    <div className="flex-1">
                        <div className="font-bold text-gray-800 hover:text-blue-600 transition-colors line-clamp-2">
                            {row.Title}
                        </div>
                    </div>
                </div>
            ),
        },
        {
            name: 'Description',
            selector: row => row.shortdescription,
            sortable: true,
            width: '250px',
            cell: row => (
                <div className="text-sm text-gray-600 line-clamp-2">
                    {row.shortdescription}
                </div>
            ),
        },
        {
            name: 'Category',
            selector: row => row.category,
            sortable: true,
            width: '140px',
            cell: row => (
                <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-3 py-1.5 rounded-full text-xs font-semibold">
                    <FaTag className="text-xs" />
                    {row.category}
                </span>
            ),
        },
        {
            name: 'Word Count',
            selector: row => row.longdescription ? row.longdescription.split(' ').length : 0,
            sortable: true,
            width: '140px',
            cell: row => {
                const wordCount = row.longdescription ? row.longdescription.split(' ').length : 0;
                return (
                    <div className="flex items-center gap-2">
                        <FaBook className="text-blue-600" />
                        <span className="font-semibold text-gray-700">{wordCount}</span>
                        <span className="text-xs text-gray-500">words</span>
                    </div>
                );
            },
        },
        {
            name: 'Author',
            selector: row => row.username || "Anonymous",
            sortable: true,
            width: '150px',
            cell: row => (
                <div className="flex items-center gap-2">
                    <FaUser className="text-gray-400" />
                    <span className="text-gray-700 font-medium">{row.username || "Anonymous"}</span>
                </div>
            ),
        },
        {
            name: 'Published',
            selector: row => new Date(row.date).toLocaleString(),
            sortable: true,
            width: '180px',
            cell: row => (
                <div className="flex items-center gap-2 text-sm">
                    <FaCalendar className="text-gray-400" />
                    <span className="text-gray-600">
                        {new Date(row.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                        })}
                    </span>
                </div>
            ),
        },
    ];

    useEffect(() => {
        fetch(`${API}/featured-blogs`)
            .then((res) => res.json())
            .then((data) => {
                const sortedData = data.sort((a, b) => {
                    const wordCountA = a.longdescription ? a.longdescription.split(' ').length : 0;
                    const wordCountB = b.longdescription ? b.longdescription.split(' ').length : 0;
                    return wordCountB - wordCountA;
                });
                setData(sortedData);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, [API]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 dark:from-gray-800 via-blue-50 dark:via-gray-700 to-gray-100 dark:to-gray-900">
            <Navbar />
            
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 text-white py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <FaStar className="text-4xl text-yellow-300 animate-pulse" />
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                            Featured Blogs
                        </h1>
                        <FaStar className="text-4xl text-yellow-300 animate-pulse" />
                    </div>
                    <p className="text-center text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
                        Top-rated articles handpicked by our editorial team
                    </p>
                    <div className="mt-8 flex items-center justify-center gap-8 text-sm">
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                            <MdTrendingUp className="text-green-300 text-xl" />
                            <span className="font-semibold">Trending Content</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                            <FaBook className="text-blue-200" />
                            <span className="font-semibold">{data.length} Featured Posts</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                        <div className="flex items-center gap-4">
                            <div className="bg-blue-100 dark:bg-gray-700 p-4 rounded-xl">
                                <FaBook className="text-3xl text-blue-600" />
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-gray-800 dark:text-blue-100">{data.length}</div>
                                <div className="text-sm text-gray-600 dark:text-blue-100">Featured Articles</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                        <div className="flex items-center gap-4">
                            <div className="bg-purple-100 dark:bg-gray-700 p-4 rounded-xl">
                                <FaUser className="text-3xl text-purple-600" />
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-gray-800  dark:text-blue-100">
                                    {new Set(data.map(d => d.username)).size}
                                </div>
                                <div className="text-sm text-gray-600  dark:text-blue-100">Contributing Authors</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                        <div className="flex items-center gap-4">
                            <div className="bg-green-100 dark:bg-gray-700 p-4 rounded-xl">
                                <FaTag className="text-3xl text-green-600" />
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-gray-800 dark:text-blue-100">
                                    {new Set(data.map(d => d.category)).size}
                                </div>
                                <div className="text-sm text-gray-600  dark:text-blue-100">Categories</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* DataTable Section */}
            <div className="max-w-7xl mx-auto px-6 pb-16">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <DataTable
                        columns={columns}
                        data={data}
                        progressPending={loading}
                        progressComponent={
                            <div className="flex flex-col items-center justify-center py-20">
                                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                                <p className="text-gray-600 font-semibold">Loading featured blogs...</p>
                            </div>
                        }
                        pagination
                        paginationPerPage={10}
                        paginationRowsPerPageOptions={[10, 20, 30, 50]}
                        highlightOnHover
                        pointerOnHover
                        striped
                        customStyles={customStyles}
                        onRowClicked={handleExploreDetails}
                        noDataComponent={
                            <div className="flex flex-col items-center justify-center py-20">
                                <FaStar className="text-6xl text-gray-300 mb-4" />
                                <h3 className="text-2xl font-bold text-gray-700 mb-2">No Featured Blogs Yet</h3>
                                <p className="text-gray-500">Check back soon for curated content!</p>
                            </div>
                        }
                    />
                </div>

                {/* Info Banner */}
                <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-600 rounded-r-xl p-6">
                    <div className="flex items-start gap-4">
                        <FaEye className="text-3xl text-blue-600 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2">How It Works</h3>
                            <p className="text-gray-700">
                                Click on any row to read the full blog post. Featured blogs are sorted by word count, 
                                showcasing our most comprehensive and detailed articles.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default FeaturedBlogs;



// old code 

// import React, { useEffect, useState } from 'react';
// import Navbar from '../Components/navigation/Navbar';
// import Footer from '../Components/navigation/Footer';
// import { useNavigate } from 'react-router';
// import DataTable from 'react-data-table-component'; // Import DataTable
// import { MdDelete } from 'react-icons/md';

// const FeaturedBlogs = () => {
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const navigate = useNavigate();
//     // get api link from env file
//     const API = import.meta.env.VITE_API;

//     const handleExploreDetails = (all) => {
//         navigate(`/allblogs/${all.id}`, { state: all });
//     };

//     const columns = [
//         {
//             name: 'Title',
//             selector: row => row.Title,
//             sortable: true,
//             cell: row => (
//                 <div className="flex items-center gap-3">
//                     <div className="avatar">
//                         <div className="rounded-xl h-10 sm:h-24 w-10 sm:w-24 xl:w-32">
//                             <img src={row.Image} alt={row.name} />
//                         </div>
//                     </div>
//                     <div>
//                         <div className="font-bold">{row.Title}</div>
//                     </div>
//                 </div>
//             ),
//         },
//         {
//             name: 'Short Description',
//             selector: row => row.shortdescription,
//             sortable: true,
//         },
//         {
//             name: 'Category',
//             selector: row => row.category,
//             sortable: true,
//         },
//         {
//             name: 'Blog Length',
//             selector: row => row.longdescription ? row.longdescription.split(' ').length : 0,
//             sortable: true,
//             cell: row => (
//                 <span>{row.longdescription ? row.longdescription.split(' ').length : 0} Word</span>
//             ),
//         },
//         {
//             name: 'Author',
//             selector: row => row.username || "Anonymous",
//             sortable: true,
//         },
//         {
//             name: 'Publish Date',
//             selector: row => new Date(row.date).toLocaleString(),
//             sortable: true,
//         },
//     ];

//     useEffect(() => {
//         fetch(`${API}/featured-blogs`)
//             .then((res) => res.json())
//             .then((data) => {
//                 console.log("Fetched Data:", data);
//                 const sortedData = data.sort((a, b) => {
//                     const wordCountA = a.longdescription ? a.longdescription.split(' ').length : 0;
//                     const wordCountB = b.longdescription ? b.longdescription.split(' ').length : 0;
//                     return wordCountB - wordCountA;
//                 });
//                 setData(sortedData);
//                 setLoading(false);
//             })
//             .catch((error) => {
//                 console.error("Error fetching data:", error);
//                 setLoading(false);
//             });
//     }, [API]);

//     return (
//         <div>
//             <Navbar />
//             <div className='bg-slate-50 dark:bg-black '>
//                 <DataTable className='bg-slate-50 dark:bg-black'
//                     title="Featured Blogs"
//                     columns={columns}
//                     data={data}
//                     progressPending={loading} // Show loading indicator
//                     pagination
//                     highlightOnHover
//                     pointerOnHover
//                     onRowClicked={handleExploreDetails} // Navigate on row click
//                 />
//             </div>
//             <Footer />
//         </div>
//     );
// };

// export default FeaturedBlogs;
