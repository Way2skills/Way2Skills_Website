import React from "react";
import { Monitor, Code, ShoppingCart, Instagram } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { SocialLinks } from "../constants";

const ITSolutions = () => {
  const solutions = [
    {
      id: 1,
      icon: <Monitor className="w-12 h-12 text-blue-400" />,
      title: "Digital Marketing Services",
      description: "Boost your online presence with our comprehensive digital marketing strategies",
      iconBg: "bg-gradient-to-r from-blue-500 to-blue-600"
    },
    {
      id: 2,
      icon: <Code className="w-12 h-12 text-purple-400" />,
      title: "Website Design Services",
      description: "Custom, responsive websites that convert visitors into customers",
      iconBg: "bg-gradient-to-r from-purple-500 to-purple-600"
    },
    {
      id: 3,
      icon: <ShoppingCart className="w-12 h-12 text-pink-400" />,
      title: "White Label Solutions for E-commerce",
      description: "Complete e-commerce solutions ready to launch under your brand",
      iconBg: "bg-gradient-to-r from-pink-500 to-pink-600"
    }
  ];

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        {/* Hero Section - Home Page Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center my-10">
          <div className="lg:w-3/4 sm:w-full mx-auto md:mx-0 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-wide">
              <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
                IT Solutions
              </span>
            </h1>
            <h2 className="text-xl sm:text-2xl lg:text-3xl mt-4 text-gray-300">
              Comprehensive technology solutions to elevate your business
            </h2>
          </div>

          <div className="w-full flex items-center justify-center">
            <div className="w-3/4 md:w-2/3 lg:w-1/2 xl:w-auto max-w-full h-auto">
              <div className="bg-gradient-to-r from-orange-500 to-red-800 rounded-full w-64 h-64 flex items-center justify-center">
                <Monitor className="w-32 h-32 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Links - Home Page Style */}
        <div className="hidden sm:flex space-x-4 p-5">
          <a
            href={SocialLinks[1].href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M16 2.6c-7.412 0-13.4 5.988-13.4 13.4 0 2.37.618 4.675 1.79 6.715l-1.174 4.254 4.368-1.157a13.387 13.387 0 0 0 6.416 1.638c7.412 0 13.4-5.988 13.4-13.4S23.412 2.6 16 2.6zm0 24.2a11.13 11.13 0 0 1-5.637-1.513l-.404-.24-2.592.685.695-2.524-.263-.419A11.125 11.125 0 1 1 16 26.8zm6.211-8.528c-.339-.169-2.012-.993-2.324-1.105-.313-.113-.54-.169-.768.169-.229.338-.884 1.105-1.084 1.336-.2.23-.394.256-.732.087-.339-.17-1.432-.527-2.728-1.678-1.009-.9-1.692-2.014-1.892-2.352-.2-.338-.021-.52.149-.69.154-.153.338-.394.508-.592.17-.199.226-.338.339-.564.113-.227.056-.423-.028-.592-.087-.169-.768-1.848-1.052-2.537-.276-.66-.556-.57-.768-.578h-.651c-.198 0-.52.074-.791.362-.271.287-1.043 1.02-1.043 2.484 0 1.464 1.068 2.878 1.217 3.075.15.198 2.104 3.207 5.101 4.497.713.307 1.269.49 1.703.628.716.227 1.368.196 1.884.119.576-.085 1.765-.721 2.015-1.415.25-.694.25-1.289.175-1.415-.076-.127-.276-.2-.576-.338z" />
            </svg>
          </a>
          <a
            href={SocialLinks[0].href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <Instagram />
          </a>
        </div>

        {/* Office Address Section - Home Page Style */}
        {/* <div className="mt-6 text-gray-300 text-sm leading-relaxed space-y-1">
          <p className="font-semibold text-white">Office Address:</p>
          <p>6/54A, Melapatti,</p>
          <p>Near SMN Poultry Farm,</p>
          <p>Melapatti, Namakkal,</p>
          <p>Tamil Nadu, India - 637020</p>
          <p className="mt-2 font-semibold text-white">Contact No: 
            <a href="tel:+918610093520" className="ml-1 text-blue-400 hover:underline">
              +91 86100 93520
            </a>
          </p>
          <p className="font-semibold text-white">Email Id: 
            <a href="mailto:way2skills.learn@gmail.com" className="ml-1 text-blue-400 hover:underline">
              way2skills.learn@gmail.com
            </a>
          </p>
        </div> */}

        {/* Solutions Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution) => (
            <div
              key={solution.id}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:border-orange-500"
            >
              {/* Icon */}
              <div className={`w-16 h-16 ${solution.iconBg} rounded-2xl flex items-center justify-center mb-6`}>
                <div className="text-white">
                  {solution.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-4">
                {solution.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {solution.description}
              </p>

              {/* Learn More Button */}
              <button className="mt-6 bg-gradient-to-r from-orange-500 to-red-800 text-white px-6 py-3 rounded-lg hover:from-orange-600 hover:to-red-900 transition-all duration-300 font-medium">
                Learn More
              </button>
            </div>
          ))}
        </div>

        {/* Additional Services Section - Home Page Style */}
        <div className="mt-20 bg-neutral-900 border border-neutral-800 rounded-3xl shadow-lg p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Why Choose Our IT Solutions?
            </h2>
            <p className="text-gray-300 text-lg">
              We deliver cutting-edge technology solutions tailored to your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">24/7</span>
              </div>
              <h4 className="font-semibold text-white mb-2">24/7 Support</h4>
              <p className="text-gray-300 text-sm">Round-the-clock technical support for all our solutions</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">⚡</span>
              </div>
              <h4 className="font-semibold text-white mb-2">Fast Delivery</h4>
              <p className="text-gray-300 text-sm">Quick turnaround times without compromising quality</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">✓</span>
              </div>
              <h4 className="font-semibold text-white mb-2">Quality Assured</h4>
              <p className="text-gray-300 text-sm">Rigorous testing and quality control processes</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">$</span>
              </div>
              <h4 className="font-semibold text-white mb-2">Cost Effective</h4>
              <p className="text-gray-300 text-sm">Competitive pricing with maximum value for your investment</p>
            </div>
          </div>
        </div>

        {/* Call to Action - Home Page Style */}
        

        <Footer />
      </div>
    </>
  );
};

export default ITSolutions;