
import AboutUs from "./components/AboutUs";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
const App = () => {
  return (
    <>
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/about-us" element={<AboutUs/>}/>
   </Routes>
   </BrowserRouter>
    </>
  );
};

export default App;
