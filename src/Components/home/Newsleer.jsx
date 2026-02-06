import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { toast } from "react-toastify";
import * as motion from "motion/react-client";
import onlineG from "../../assets/animetion/online.webp";

const Newsletter = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(email)) {
      setLoading(true);
      setTimeout(() => {
        toast.success("You’ve successfully subscribed! 🎉");
        setLoading(false);
        event.target.reset();
      }, 1000);
    } else {
      toast.error("Please enter a valid email address.");
    }
  };

  return (
    <section className="flex flex-col items-center justify-center mt-20 mb-28 px-4">

      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex flex-col lg:flex-row items-center gap-10 backdrop-blur-sm p-8 w-full sm:w-[90%] md:w-[80%] lg:w-[70%]"
      >
        {/* Image Section */}
        <motion.div
          className="w-full lg:w-1/2 flex justify-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <img
            src={onlineG}
            alt="Newsletter Animation"
            className="rounded-xl w-[90%] sm:w-[400px] lg:w-[420px] object-cover"
          />
        </motion.div>

        {/* Text + Form */}
        <div className="flex flex-col items-start lg:items-start w-full lg:w-1/2 gap-5">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">
            Subscribe to Our Newsletter
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
            Get the latest news, tutorials, and insights delivered straight to your inbox.
            Join our growing community of tech enthusiasts and stay ahead with{" "}
            <span className="text-sky-500 font-medium">TechnoBloger</span>.
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 w-full mt-2"
          >
            <label className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 bg-transparent rounded-lg px-3 py-2 w-full sm:w-[320px]">
              <MdEmail className="text-xl text-sky-500" />
              <input
                type="email"
                name="email"
                className="w-full bg-transparent outline-none text-gray-700 dark:text-gray-200 placeholder-gray-400"
                placeholder="Enter your email"
                required
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className={`relative px-6 py-2 text-lg font-semibold border-2 border-sky-500 rounded-full 
              overflow-hidden text-sky-600 transition-all duration-500 hover:text-white 
              before:absolute before:top-0 before:left-0 before:w-0 before:h-full before:bg-sky-500 
              hover:before:w-full before:transition-all before:duration-500 before:-z-10
              ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
            We respect your privacy. No spam, ever.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default Newsletter;
