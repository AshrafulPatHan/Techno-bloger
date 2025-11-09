import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { toast } from 'react-toastify';



const Footer = () => {
    return (
        <div>
            <div className=''>
                <footer className="footer bg-[#393E46] dark:bg-base-200 text-black dark:text-white p-10">
                    <nav>
                        <h6 className="footer-title">Services</h6>
                        <a className="link link-hover">Blogging</a>
                        <a className="link link-hover">Teaching</a>
                        <a className="link link-hover">Marketing</a>
                        <a className="link link-hover">Advertisement</a>
                    </nav>
                    <nav>
                        <h6 className="footer-title">Company</h6>
                        <a className="link link-hover">About us</a>
                        <a className="link link-hover">Contact</a>
                        <a className="link link-hover">Jobs</a>
                    </nav>
                    <nav>
                        <h6 className="footer-title">Send Your Fatback</h6>
                        <label className="input input-bordered flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                            <path
                            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                        </svg>
                        <input type="text" className="grow " placeholder="Your Fatback" />
                        </label>
                        <button onClick={()=>{toast("🤩 Fatback is send sussesfully")}} to='/about' className="btn rounded-none bg-transparent relative w-24 origin-top transform border-2 border-sky-500 
                        text-lg font-semibold text-sky-500 
                        before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-white hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-sky-500">Send
                            </button>
                    </nav>
                    </footer>
                    <footer className="footer bg-[#393E46] dark:bg-base-200 text-base-content border-t border-[#d1c9c9] dark:border-white  px-10 py-4">
                    <aside className="grid-flow-col items-center">
                        <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        className="fill-current">
                        <path
                            d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
                        </svg>
                        <p>
                        technobloger
                        <br />
                        Providing reliable Blog since 2020
                        </p>
                    </aside>
                    <nav className="md:place-self-center md:justify-self-end">
                        <div className='text-5xl flex flex-row items-center gap-0 '>
                            <div>
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <i className="fa-brands text-2xl  fa-facebook" style={{ color: '#4267B2', marginRight: '10px' }}></i>
                            </a>
                            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                            <i className="fa-brands text-2xl  fa-twitter" style={{ color: '#1DA1F2', marginRight: '10px' }}></i>
                            </a>
                            </div>
                            <div>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <i className="fa-brands  text-2xl fa-instagram" style={{ color: '#E1306C', marginRight: '10px' }}></i>
                            </a>
                            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                            <i className="fa-brands  text-2xl fa-linkedin" style={{ color: '#4267B2', marginRight: '10px' }}></i>
                            </a>
                            </div>
                            <div>
                            <a href="https://www.x.com" target="_blank" rel="noopener noreferrer">
                            <i className="fa-brands  text-2xl fa-x-twitter"></i>
                            </a>
                            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                            <i className="fa-brands  text-2xl fa-youtube" style={{ color: '#E1306C', marginRight: '10px' }}></i>
                            </a>
                            </div>
                        </div>
                    </nav>
                </footer>
            </div>
        </div>
    );
};

export default Footer;