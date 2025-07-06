
import AboutUs from "./components/AboutUs";
import Home from "./components/Home";
import Courses from "./components/Courses";
import { BrowserRouter as Router, Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import CourseRegistrationForm from "./components/CourseRegistrationForm";
import ContactUs from "./components/ContactUs";
import TermsAndConditions from "./components/TermsAndConditions";
import PoliciesComponent from "./components/PoliciesComponent";
import RefundPolicy from "./components/RefundPolicy";
import Admin from "./components/Admin";
import AISearchDashboard from "./components/AISearchDashboard";
const App = () => {
  return (
    <>
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/about-us" element={<AboutUs/>}/>
    <Route path="/Courses" element={<Courses/>}/>
    <Route path="/blogger" element={<Navigate to="/" />}/>
    <Route path="*" element={<Navigate to="/" />} />
    <Route path="/Register" element={<ContactUs/>}/>
    <Route path="/CourseRegister" element={<CourseRegistrationForm/>}/>
    <Route path="/Admin" element={<Admin/>}/>
    <Route path="/ai-search" element={<AISearchDashboard/>}/>
  
    <Route path="/T&C" element={<TermsAndConditions/>}/>
    <Route path="/privacy_policy" element={<PoliciesComponent/>}/>
    <Route path="/refund_policy" element={<RefundPolicy/>}/>

    
   </Routes>
   </BrowserRouter>
    </>
  );
};

export default App;
