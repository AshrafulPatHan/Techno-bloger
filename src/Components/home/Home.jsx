import Navbar from '../navigation/Navbar';
import Footer from '../navigation/Footer';
import Hero from './Hero';
import Recent from './Recent';
import Newsleer from './Newsleer';
import AboutUs from './AboutUs';
import Mape from './Mape';
import Welcome from './Welcome';



const Home = () => {
    return (
        < >
            <Navbar />
            <main className='max-w-screen overflow-x-hidden'>
                <Hero />
                <Welcome />
                <AboutUs />
                <Recent />
                <Mape />
                <Newsleer />
            </main>
            <Footer />
        </>
    );
};

export default Home;