

export default function Hero() {
    return (
        <div className="relative ">
            <div className="pt-32 pb-32 h-[93vh] hero-background ">
                <div className="flex flex-col items-center justify-center max-w-[700px] mx-auto text-center font-medium">
                    <h1 className="text-6xl ">A Public Cloud Built For Developers Who <span className="italic">Ship</span></h1>
                    <p className=" mt-5 mb-9 ">Over 3 million apps have launched on Fly.io, leveraging global Anycast load-balancing, zero-config private networking, hardware isolation, instant WireGuard VPN connections, and push-button deployments scaling to thousands of instances.</p>
                    <button className="bg-[var(--blue)] text-black dark:text-white py-3 px-7 rounded-3xl shadow-[0_-5px_10px_#0000] ">Deploy Your App in 5 minutes </button>
                </div>
            </div>
            <div className="absolute w-[40%] h-[40%] bg-blue-200 dark:bg-blue-800 rounded-b-full top-0 left-[30%] mix-blend-multiply filter blur-2xl opacity-50 z-10 "></div>
        </div>
    )
}