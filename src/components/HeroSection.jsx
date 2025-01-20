// import video1 from "../assets/video1.mp4";
// import video2 from "../assets/video2.mp4";
import coding from "../assets/Coding workshop-bro.svg";
import ReactTypingEffect from 'react-typing-effect';
const HeroSection = () => {
  return (
<div className="grid grid-cols-2 grid-rows-1 landing z-1">
  {/* Text Section */}
  <div className="lg:w-1/2 sm:w-full lg:mb-20 col-span-1 my-20 z-10">
    <h1 className="text-4xl sm:text-6xl lg:text-8xl text-left tracking-wide">
      Welcome To<br />
      <span className="bg-gradient-to-r from-orange-500 to-red-800 text-left text-transparent bg-clip-text">
        WAY2SKILLS
      </span>
    </h1>
    <h2 className="text-2xl text-left mt-4">
      Building an Innovative Education With Us.
    </h2>
  </div>

  {/* Image Section */}
  <div className="w-full flex items-center justify-center col-span-1 z-5">
    <img src={coding} alt="Coding" className=" " />
  </div>


      {/* <div className="flex justify-center my-10">
        <a
          href="#"
          className="bg-gradient-to-r from-orange-500 to-orange-800 py-3 px-4 mx-3 rounded-md"
        >
          Start for free
        </a>
        <a href="#" className="py-3 px-4 mx-3 rounded-md border">
          Documentation
        </a>
      </div> */}
     
      {/* <div className="flex mt-10 justify-center">
        <video
          autoPlay
          loop
          muted
          className="rounded-lg w-1/2 border border-orange-700 shadow-sm shadow-orange-400 mx-2 my-4"
        >
          <source src={video1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <video
          autoPlay
          loop
          muted
          className="rounded-lg w-1/2 border border-orange-700 shadow-sm shadow-orange-400 mx-2 my-4"
        >
          <source src={video2} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div> */}
   
    </div>
  );
};

export default HeroSection;
