import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import photo from "../../assets/animetion/data-any.gif";
import { Link } from "react-router";
import { motion } from "framer-motion";

const AboutUs = () => {
    return (
        <section className="flex flex-col items-center mt-12 mb-20 px-4">
            {/* Section Title */}
            <motion.h2
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl font-bold text-center mb-8 text-sky-600 dark:text-sky-400"
            >
                About Us
            </motion.h2>

            {/* Main Card */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="flex flex-col lg:flex-row items-center justify-between gap-8 rounded-2xl p-6 sm:w-[85%] w-[95%] backdrop-blur-sm"
            >
                {/* Image Section */}
                <div className="flex justify-center w-full lg:w-1/2">
                    <motion.img
                        src={photo}
                        alt="About TechnoBloger"
                        className="rounded-xl w-[300px] sm:w-[400px] md:w-[450px] lg:w-[480px] object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 200 }}
                    />
                </div>

                {/* Text Section */}
                <div className="flex flex-col justify-center items-start gap-4 text-left w-full lg:w-1/2">
                    <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                        TechnoBloger
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                        <span className="font-semibold">TechnoBloger</span> is your ultimate
                        destination for everything tech. From in-depth gadget reviews to startup news,
                        we deliver content that keeps you <span className="text-sky-500">inspired and informed</span>.
                        Whether you're a tech enthusiast, entrepreneur, or developer, TechnoBloger brings
                        insights that help you stay ahead in the fast-evolving digital world.
                    </p>

                    {/* Button */}
                    <Link
                        to="/about"
                        className="relative inline-block px-6 py-2 text-lg font-semibold text-sky-600 border-2 border-sky-500 rounded-full
                        overflow-hidden transition-all duration-500 hover:text-white before:absolute before:top-0 before:left-0 
                        before:w-0 before:h-full before:bg-sky-500 hover:before:w-full before:transition-all before:duration-500 before:-z-10"
                    >
                        Learn More
                    </Link>

                    {/* Social Icons */}
                    <div className="flex items-center gap-5 text-2xl mt-2">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-sky-600 transition-colors"
                        >
                            <FaFacebook className="text-blue-600" />
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-sky-600 transition-colors"
                        >
                            <FaTwitter className="text-sky-400"/>
                        </a>
                        <a
                            href="https://youtube.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-sky-600 transition-colors"
                        >
                            <FaYoutube className="text-red-700"/>
                        </a>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default AboutUs;
