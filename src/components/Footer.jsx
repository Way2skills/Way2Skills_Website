import { SocialLinks } from "../constants";
import { Facebook } from "lucide-react";
import { Instagram } from "lucide-react";
const Footer = () => {
  return (
   
   <footer className="bg-gray-900 text-white py-8 bg-transparent">
     <hr></hr>
     <br />
  <div className="container mx-auto px-4">
    <div className="flex flex-col md:flex-row items-center justify-between">
      {/* Logo or Branding */}
      <div className="mb-4 md:mb-0">
        <h1 className="text-2xl font-bold">Way2Skills</h1>
        <p className="text-sm text-gray-400">Building an Innovative Education With Us</p>
      </div>

      {/* Social Media Links */}
      <div className="flex space-x-4">
    

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
    </div>

    {/* Footer Bottom */}
    <div className="flex justify-center text-right text-sm m-5 text-gray-500">
    <a className="mx-3" href="/T&C"><u>Terms and Conditions</u></a> 
    <a className="mx-3" href="/privacy_policy"><u>Privacy Policy</u></a> 

    <a className="mx-3" href="/refund_policy"><u>Refund Policy</u></a> 
    </div>
    {/* <div className=" text-right text-sm text-gray-500">
    <a className="mx-5" href="/T&C"><u>Terms and Conditions</u></a> 
    <a className="mx-5" href="/privacy_policy"><u>Privacy Policy</u></a> 
    </div> */}
    <div className="mt-8 text-center text-sm text-gray-500">
      © 2025 Way2Skills. All rights reserved. 
    </div>
  </div>
</footer>

  );
};

export default Footer;
