import FeatureSection from "./FeatureSection";
import Footer from "./Footer";
import Navbar from "./Navbar";

const AboutUs = () => {
    return (
        <>
        <Navbar/>
        <div className="max-w-7xl mx-auto pt-20 px-6">
        <FeatureSection/>
        <Footer/>
        </div>
        </>
    );
}

export default AboutUs;