
import AboutUs from "./components/AboutUs";
import Home from "./components/Home";
import Courses from "./components/Courses";
import { BrowserRouter as Router, Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import CourseRegistrationForm from "./components/CourseRegistrationForm";
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
    {/* <Route path="/Register" element={<CourseRegistrationForm/>}/> */}
   </Routes>
   </BrowserRouter>
    </>
  );
};

export default App;
