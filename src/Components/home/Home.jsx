import Navbar from '../navigation/Navbar';
import Footer from '../navigation/Footer';
import Hero from './Hero';
import Recent from './Recent';
import Newsleer from './Newsleer';
import AboutUs from './AboutUs';
import Mape from './Mape';



const Home = () => {
    return (
        <>
            <div >
                <Navbar/>
                <Hero/>
                <AboutUs/>
                <Recent/>
                <Mape/>
                <Newsleer/>
                <Footer/>
            </div>
        </>
    );
};

export default Home;