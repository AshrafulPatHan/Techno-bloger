import { Link } from "react-router";


export default function Hero() {
    return (
        <div className="relative ">
            <div className="pt-32 pb-32 h-[93vh] hero-background ">
                <div className="flex flex-col items-center justify-center max-w-[700px] mx-auto text-center font-medium">
                    <h1 className="text-6xl ">A Public Blogging site for publishing <span className="italic">blogs</span></h1>
                    <p className=" mt-5 mb-9 ">
                        Technobloger is your go-to destination for the latest in technology. We offer comprehensive reviews, insightful articles, and up-to-date news on startups, gadgets, and tech trends. Our mission is to keep you informed and ahead in the fast-paced world of technology.
                    </p>
                    <Link to='/login'
                        className="rounded-lg border-2 border-slate-800 px-6 py-2 text-[12px] font-semibold duration-300 
                        hover:bg-slate-950 hover:text-white sm:text-sm md:text-base ">Get Start Now</Link>
                </div>
            </div>
            <div className="absolute w-[40%] h-[40%] bg-blue-200 dark:bg-blue-800 rounded-b-full top-0 left-[30%] mix-blend-multiply filter blur-2xl opacity-50 z-10 "></div>
        </div>
    )
}