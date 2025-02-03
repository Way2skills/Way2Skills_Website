
import AboutUs from "./components/AboutUs";
import Home from "./components/Home";
import Courses from "./components/Courses";
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
const App = () => {
  return (
    <>
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/about-us" element={<AboutUs/>}/>
    <Route path="/Courses" element={<Courses/>}/>
   </Routes>
   </BrowserRouter>
    </>
  );
};

export default App;
