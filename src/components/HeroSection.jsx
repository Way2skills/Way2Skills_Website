// import video1 from "../assets/video1.mp4";
// import video2 from "../assets/video2.mp4";
import coding from "../assets/Coding workshop-bro.svg";
// import ReactTypingEffect from 'react-typing-effect';
const HeroSection = () => {
  return (
<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center landing z-1">
  {/* Text Section */}
  <div className="lg:w-3/4 sm:w-full mx-auto md:mx-0 text-center md:text-left my-10 z-10">
    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-wide">
      Welcome To<br />
      <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
        WAY2SKILLS
      </span>
    </h1>
    <h2 className="text-xl sm:text-2xl lg:text-3xl mt-4">
      Building an Innovative Education With Us.
    </h2>
  </div>

  {/* Image Section */}
  <div className="w-full flex items-center justify-center">
    <img 
      src={coding} 
      alt="Coding" 
      className="w-3/4 md:w-2/3 lg:w-1/2 xl:w-auto max-w-full h-auto"
    />
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
