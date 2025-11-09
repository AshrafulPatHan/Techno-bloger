import React, { useContext, useEffect, useState } from 'react';
import Logo from '../../assets/wite.png'
import { AuthContext } from '../auth/AuthProvider/AuthProvider';
import { signOut } from 'firebase/auth';
import auth from '../auth/Firebase/Firebase.init';
import { toast } from 'react-toastify';
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { IoIosPartlySunny, IoMdCloudyNight } from 'react-icons/io';
import { RiDropdownList } from 'react-icons/ri';
import { FaRegUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router';


const Navbar = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log('User logged out successfully');
                toast('Loge out successfully!');
                navigate('/');

            })
            .catch((error) => {
                console.error('Error during logout:', error.message);
                toast('Failed to log out!');
            });
    };
    const [showTooltip, setShowTooltip] = useState(false);

    // chang mode
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    // scorle background
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 0;
            setScrolled(isScrolled);
        };

        window.addEventListener("scroll", handleScroll);

        // cleanup
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


    return (
        <div className='sticky top-0 z-50'>
            <div className={` transition-colors duration-300  ${scrolled ? "bg-[#00000010] backdrop-blur-[12px] border-b-2 border-b-[#0000000e] " : "bg-white dark:bg-gray-900"
                }`} >
                <div className="navbar max-w-[1500px] mx-auto ">
                    <div className="navbar-start">
                        {/* mobile dropdown */}
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-black">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            </div>
                            {user ? (
                                <ul tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-white ">
                                    <li><Link to='/'>Home</Link></li>
                                    <li>
                                        <Link to='/addblog'>AddBlog</Link>
                                        <ul className="p-2">
                                            <li><Link to='/allblogs'>Allblogs</Link></li>
                                            <li><Link to='/featuredblogs'>FeaturedBlogs</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link to='/wishlist'>Wishlist</Link></li>
                                    <li><Link to='/dashboard'>Dashboard</Link></li>
                                </ul>
                            ) : (
                                <ul tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                    <li><Link Link to='/'>Home</Link></li>
                                    <li>
                                        <Link to='/allblogs'>Allblogs</Link>
                                    </li>
                                </ul>
                            )}
                        </div>
                        {/* company name */}
                        <div className='flex flex-row items-center'>
                            <img src={Logo} alt="image" className='w-[50px] ' />
                            <p className="text-sm font-bold sm:text-xl flex md:font-bold text-black dark:text-white">Technobloger</p>
                        </div>
                    </div>
                    {/* navigation */}
                    <div className="navbar-center hidden lg:flex">
                        {user ? (
                            <div className=' flex lg:flex-col xl:flex-row items-center xl:gap-4'>
                                <div className='flex flex-row items-center gap-6 xl:gap-4 '>
                                    <Link to='/' className=' text-xl text-blue-600 rounded-md hover:text-blue-500 transition-all duration-500 font-bold'>
                                        Home
                                    </Link>
                                    <Link to='/allblogs' className=' text-xl text-blue-600 rounded-md hover:text-blue-500 transition-all duration-500 font-bold'>
                                        All blogs
                                    </Link>
                                    <Link to='/featuredblogs' className=' text-xl text-blue-600 rounded-md hover:text-blue-500 transition-all duration-500 font-bold'>
                                        Featured Blogs
                                    </Link>
                                </div>
                                <div className='flex flex-row items-center gap-6 xl:gap-4'>
                                    <Link to='/addblog' className='text-xl text-blue-600 rounded-md hover:text-blue-500 transition-all duration-500 font-bold'>
                                        Add Blog
                                    </Link>
                                    <Link to='/wishlist' className='text-xl text-blue-600 rounded-md hover:text-blue-500 transition-all duration-500 font-bold'>
                                        Wishlist
                                    </Link>
                                    <Link to='/dashboard' className='text-xl text-blue-600 rounded-md hover:text-blue-500 transition-all duration-500 font-bold'>
                                        Dashboard
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-row items-center gap-4 px-1">
                                <div>
                                    <Link to='/' className='text-xl text-blue-600 font-bold hover:text-blue-500 transition-all duration-500'>Home</Link>
                                </div>
                                <div>
                                    <Link to='/allblogs' className='text-xl text-blue-600 font-bold hover:text-blue-500 transition-all duration-500'>All blogs</Link>
                                </div>
                                <div>
                                    <Link to='/featuredblogs' className='text-xl text-blue-600 font-bold hover:text-blue-500 transition-all duration-500'>Featured Blogs</Link>
                                </div>
                                <Link to='/addblog' className='text-xl text-blue-600 font-bold hover:text-blue-500 transition-all duration-500'>
                                    Add Blog
                                </Link>
                                <Link to='/wishlist' className='text-xl text-blue-600 font-bold hover:text-blue-500 transition-all duration-500'>
                                    Wishlist
                                </Link>
                                <Link to='/dashboard' className='text-xl text-blue-600 font-bold hover:text-blue-500 transition-all duration-500'>
                                    Dashboard
                                </Link>
                            </div>
                        )}
                    </div>
                    <div className='navbar-end '>
                        {/* user in mobile */}
                        <div className="dropdown dropdown-end lg:hidden">
                            <div tabIndex={0} role="button" className="btn btn-ghost ">
                                <FaRegUserCircle className='text-4xl text-black' />
                            </div>
                            {user ? (
                                <ul tabIndex={0}
                                    className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 px-2 shadow">
                                    <div className="tooltip" data-tip={user.displayName || "User"}>
                                        <img
                                            src={user.photoURL || "default-avatar.png"}
                                            alt={user.displayName || "User"}
                                            className="w-8 md:w-10 h-8 md:h-10  rounded-full"
                                            onMouseEnter={() => setShowTooltip(true)}
                                            onMouseLeave={() => setShowTooltip(false)}
                                        />
                                    </div>
                                    <button onClick={handleLogout} className="btn text-sky-600">
                                        Log out
                                    </button>
                                </ul>
                            ) : (
                                <ul tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 px-2 shadow">
                                    <li><Link Link to='/login' >Login</Link></li>
                                    <li>
                                        <Link to='/registration'>Registration</Link>
                                    </li>
                                </ul>
                            )}
                        </div>
                        {/* light mode /dark mode ------------- */}
                        <label className="swap swap-rotate mr-0 md:mr-2 border-2 border-black dark:border-white rounded-full p-2 w-10 h-10 ">
                            <input type="checkbox" onClick={toggleTheme} className="theme-controller" value="synthwave" />
                            {/* sun icon */}
                            <IoIosPartlySunny className='swap-off h-10 w-8 fill-current text-black dark:text-white' />
                            {/* moon icon */}
                            <IoMdCloudyNight className="swap-on h-10 w-8 fill-current text-black dark:text-white" />
                        </label>
                        {/* user in desktop */}
                        <div className='hidden lg:flex'>
                            <div className='flex flex-col items-center sm:flex  sm:flex-row sm:items-center '>
                                {user ? (
                                    <div >
                                        <div className='flex flex-row items-center gap-1 md:gap-2 '>
                                            <div className="tooltip tooltip-bottom  text-black" data-tip={user.displayName || "User"}>
                                                <img
                                                    src={user.photoURL || "default-avatar.png"}
                                                    alt={user.displayName || "User"}
                                                    className="w-8 md:w-10 h-8 md:h-10  rounded-full object-cover bg-blue-400"
                                                    onMouseEnter={() => setShowTooltip(true)}
                                                    onMouseLeave={() => setShowTooltip(false)}
                                                />
                                            </div>
                                            <button onClick={handleLogout} className="rounded-lg bg-slate-800 px-6 py-2 text-[12px] font-semibold text-blue-400 duration-300 
                                                hover:bg-slate-950 sm:text-sm md:text-base font-sans ">
                                                Log out
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-row items-center gap-1">
                                        <Link to='/login' className="rounded-lg bg-slate-800 px-6 py-2 text-[12px] font-semibold text-white duration-300 
                                                hover:bg-slate-950 sm:text-sm md:text-base ">Login</Link>
                                        <Link to='/registration' className="rounded-lg bg-slate-800 px-6 py-2 text-[12px] font-semibold text-white duration-300 
                                                hover:bg-slate-950 sm:text-sm md:text-base ">Register</Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
