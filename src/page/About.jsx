import Navbar from "../Components/navigation/Navbar";
import Footer from "../Components/navigation/Footer";

const About = () => {
  return (
    <>
      <Navbar />
      <section className="bg-gradient-to-b from-gray-50 to-white text-gray-800 py-16 max-w-screen overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-2xl lg:text-4xl md:text-5xl font-extrabold text-green-600 mb-4 tracking-wide">
              About Technobloger
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your ultimate hub for the latest in technology, innovation, and
              digital trends.
            </p>
          </div>

          {/* Content Layout */}
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Left Image */}
            <div className="w-full lg:w-1/2">
              <img
                src="https://t4.ftcdn.net/jpg/03/08/69/75/360_F_308697506_9dsBYHXm9FwuW0qcEqimAEXUvzTwfzwe.jpg"
                alt="Technobloger illustration"
                className="rounded-2xl shadow-xl hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Right Content */}
            <div className="w-full lg:w-1/2 bg-white shadow-lg border border-green-200 rounded-2xl p-8">
              <h2 className="text-3xl font-semibold text-green-600 mb-4">
                Welcome to Technobloger
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6 font-sans">
                Technobloger is your go-to destination for the latest in
                technology. We offer comprehensive reviews, insightful articles,
                and up-to-date news on startups, gadgets, and tech trends. Our
                mission is to keep you informed and ahead in the fast-paced
                world of technology.
              </p>

              <h3 className="text-2xl font-semibold mb-3 text-green-500">
                Why Choose Us?
              </h3>
              <p className="text-gray-700 mb-6 font-serif">
                Our team of experienced writers and tech enthusiasts brings you
                reliable and engaging content that helps you stay ahead in the
                ever-evolving tech landscape.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    title: "Comprehensive Reviews",
                    desc: "Detailed analysis, pros & cons, and real-world performance.",
                  },
                  {
                    title: "Insightful Articles",
                    desc: "In-depth explorations of AI, Blockchain, IoT, and more.",
                  },
                  {
                    title: "Up-to-Date News",
                    desc: "Stay informed about the latest tech updates and launches.",
                  },
                  {
                    title: "Startups & Innovations",
                    desc: "Discover emerging companies changing the world.",
                  },
                  {
                    title: "Community & Engagement",
                    desc: "Join a growing network of tech enthusiasts.",
                  },
                  {
                    title: "Expert Opinions",
                    desc: "Insights and interviews from top industry professionals.",
                  },
                  {
                    title: "Tutorials & How-Tos",
                    desc: "Step-by-step guides for beginners and experts alike.",
                  },
                  {
                    title: "Events & Conferences",
                    desc: "Get updates and analyses from global tech events.",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-green-400 bg-gray-50 hover:bg-green-50 transition duration-300 rounded-md p-4 shadow-sm"
                  >
                    <h4 className="text-lg font-bold text-green-600 mb-1">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <h3 className="text-2xl font-semibold text-green-500 mb-2">
                  Join Our Journey
                </h3>
                <p className="text-gray-700">
                  At Technobloger, we're passionate about technology and
                  dedicated to sharing knowledge that empowers you. Subscribe to
                  our newsletter, engage with our content, and be a part of this
                  growing tech community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default About;
