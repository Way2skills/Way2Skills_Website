import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import FeatureSection from "./FeatureSection";
import Workflow from "./Workflow";
import Footer from "./Footer";
import Pricing from "./Pricing";
import Testimonials from "./Testimonials";
import CourseRegistrationForm from "./CourseRegistrationForm";
import ReviewSystem from "./ReviewSystem";
const Home = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <HeroSection />
      
        <FeatureSection />
        <Workflow />
        <Pricing />
        <div className="w-[80vw] max-w-7xl mx-auto">
          <ReviewSystem />
        </div>
      
        <Footer />
       
      </div>
    
    </>
  );
};

export default Home;
