import Footer from "./Footer";
import Navbar from "./Navbar";
import Pricing from "./Pricing";

const Courses = () => {
    return (
        <>
        <Navbar/>
        <div className="max-w-7xl mx-auto pt-20 px-6">
            <Pricing/>
            <Footer/>
        </div>
     
        </>
    );
}

export default Courses;