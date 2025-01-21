import { CheckCircle2 } from "lucide-react";
import { pricingOptions } from "../constants";

const Pricing = () => {
  return (
    <div className="mt-20" id="Courses">
    <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center my-8 tracking-wide">
      Courses
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {pricingOptions.map((option, index) => (
        <div key={index} className="p-2">
          <div
            className="p-10 border border-neutral-700 rounded-xl backdrop-blur-lg flex flex-col h-full"
          >
            <div className="flex-1">
              <p className="text-4xl mb-8">
                {option.title}
                {option.mode === "online" && (
                  <span className="bg-gradient-to-r from-orange-500 to-red-400 text-transparent bg-clip-text text-xl mb-4 ml-2">
                    (Online)
                  </span>
                )}
              </p>
              <p className="mb-8">
                <span className="text-5xl mt-6 mr-2 line-through">
                  ₹ {option.actual_price}
                </span>
                <br />
                <span className="text-5xl mt-6 mr-2">
                  ₹ {option.discount_price}
                </span>
                <span className="text-neutral-400 tracking-tight"> Fees</span>
              </p>
              <ul>
                {option.features.map((feature, idx) => (
                  <li key={idx} className="mt-8 flex items-center">
                    <CheckCircle2 />
                    <span className="ml-2">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <a
              href={option.link}
              target="_blank"
              className="inline-flex justify-center items-center text-center w-full h-12 p-5 mt-10 tracking-tight text-xl hover:bg-orange-500 border border-orange-900 rounded-lg transition duration-200"
            >
              Register
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
    );
};


export default Pricing;
