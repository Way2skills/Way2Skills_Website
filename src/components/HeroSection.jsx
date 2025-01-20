// import video1 from "../assets/video1.mp4";
// import video2 from "../assets/video2.mp4";
import coding from "../assets/Coding workshop-bro.svg";

const HeroSection = () => {
  return (
    <div className="grid grid-rows-1 grid-col-2 grid-flow-col">
  <div className="lg:w-1/2 sm:w-full lg:mb-20  col-span-1 ">
    <h1 className="text-4xl sm:text-6xl lg:text-9xl text-left tracking-wide">
      ABOUT OUR 
      <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
        {" "}WAY2SKILLS
      </span>
    </h1>
   
  </div>
  <div className="p-0 col-span-2 w-full">
    <img src={coding} alt="Coding" className="w-auto" />
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
