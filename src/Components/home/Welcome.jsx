import Slider from 'react-slick';
import { Link } from 'react-router';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Welcome = () => {
    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1724, 
                settings: {
                    slidesToShow: 1,
                },
            },
            {
                breakpoint: 1024, 
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768, 
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };



    return (
        <div className='flex flex-col items-center justify-center mt-20 mb-20'>
            <div className='flex flex-col xl:flex-row items-center xl:items-start justify-between'>
                <div className='flex flex-col text-center xl:text-start items-center xl:items-start gap-4 '>
                    <div className='flex flex-col items-center lg:items-start gap-2'>
                        <div className=''>
                            <h2 className='text-3xl sm:text-3xl lg:text-4xl  font-semibold'>Welcome to our website</h2>
                            {/* <h3 className=' text-xl sm:text-2xl mt-2 font-semibold'>Explore and deep drive in technology</h3> */}
                        </div>
                        <p className=' text-base sm:text-lg font-medium w-[300px] lg:w-[500px] xl:w-[620px]  '>Welcome to technobloger, your go-to source for the latest in technology. We provide in-depth reviews, insightful articles, and breaking news on startups, gadgets, and tech trends. Whether you re a tech enthusiast, entrepreneur, or industry professional, technobloger keeps your informed and ahead in the tech world.</p>
                    </div>
                    <div className='flex gap-3'>
                        <Link to='/allblogs' className="btn rounded-none bg-transparent
                         hover:bg-transparent hover:border-none transition-all duration-500 
                         text-lg font-semibold relative w-32 origin-top transform border-2 border-sky-500 
                          text-sky-500 
                            before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-white hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-sky-500">
                            All blogs
                        </Link>
                        <Link to='/about' className="btn rounded-none bg-transparent relative w-32 origin-top transform border-2 border-sky-500 
                            text-lg font-semibold text-sky-500 hover:bg-transparent hover:border-none transition-all duration-500
                            before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-white hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-sky-500">
                            About US
                        </Link>
                    </div>
                </div>
                <div className='flex flex-col items-center px-4'>
                    <div className='w-[300px] sm:w-[600px] lg:w-[43.75rem] ' >
                        <Slider {...settings}>
                            <div className="p-3 ">
                                <div className="card  image-full  ">
                                    <figure>
                                        <img
                                        src="https://i.ibb.co.com/PFr1bSG/Copilot-studio-Obalka.jpg"
                                        alt="photo"
                                        className="w-full h-[250px] md:h-[300px] rounded-xl object-cover "
                                        />
                                    </figure>
                                    <div className="card-body">
                                        <h2 className="card-title">Copilot</h2>
                                        <p>Copilot is free AI chat bot and toll</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-3 ">
                                <div className="card image-full  ">
                                    <figure>
                                        <img
                                        src="https://i.ibb.co.com/fD19qss/Copilot-Enterprise-Blog-Header.png"
                                        alt="photo"
                                        className="w-full h-[250px] md:h-[300px] rounded-xl object-cover "
                                        />
                                    </figure>
                                    <div className="card-body">
                                        <h2 className="card-title">Github Copilot</h2>
                                        <p>Copilot is a Ai tool for developer and it free for student</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-3 ">
                                <div className="card image-full ">
                                    <figure>
                                        <img
                                        src="https://i.ibb.co.com/8YSN31T/vast-starlink.jpg"
                                        alt="photo"
                                        className="w-full h-[250px] md:h-[300px] rounded-xl object-cover "
                                        />
                                    </figure>
                                    <div className="card-body">
                                        <h2 className="card-title">Star Link</h2>
                                        <p>Star Link is a network of satellite it provide data from space</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-3 ">
                                <div className="card image-full ">
                                    <figure>
                                        <img
                                        src="https://i.ibb.co.com/K5nJv9F/0x0.jpg"
                                        alt="photo"
                                        className="w-full h-[250px] md:h-[300px] rounded-xl object-cover "
                                        />
                                    </figure>
                                    <div className="card-body">
                                        <h2 className="card-title">Countom computer</h2>
                                        <p>Countom computer is the future of modern computing it work in to principal of countome electrode</p>
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Welcome;