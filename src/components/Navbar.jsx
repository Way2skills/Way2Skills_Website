import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, BellIcon } from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";
import logo from "../assets/logo.png";
import ContactUs from "./ContactUs"; // Import the Register component
import { SocialLinks } from "../constants";
import { Instagram } from "lucide-react";
const navigation = [
  { name: "Home", href: "/", current: false },
  { name: "About Us", href: "/about-us", current: false },
  { name: "Courses", href: "/Courses", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [isRegisterOpen, setRegisterOpen] = useState(false);

  return (
    <>
      <Disclosure as="nav" className="bg-black/70 backdrop-blur-lg border-b border-neutral-800 fixed w-full z-50 top-0">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                {/* Mobile menu button */}
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset">
                    {open ? <XMarkIcon className="size-6" aria-hidden="true" /> : <Bars3Icon className="size-6" aria-hidden="true" />}
                  </Disclosure.Button>
                </div>

                {/* Logo */}
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex items-center space-x-2">
                    <img className="h-10 w-10 border-2 bg-white border-white rounded-full" src={logo} alt="Logo" />
                    <span className="text-xl font-semibold text-white">Way2Skills</span>
                  </div>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden sm:ml-6 sm:flex space-x-8">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                    >
                      {item.name}
                    </a>
                  ))}
                  <button
                    onClick={() => setRegisterOpen(true)}
                    className=" px-3 py-2 text-sm font-medium hover:bg-orange-500 border border-orange-900 rounded-lg transition duration-200"
                  >
                    Contact Us
                  </button>
                  
                </div>

                {/* Right Section */}
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Notification and Profile icons */}
                </div>
              </div>
            </div>

            {/* Mobile Menu */}
            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
                <Disclosure.Button
                  as="button"
                  onClick={() => setRegisterOpen(true)}
                  className="w-full text-left px-3 py-2 text-base font-medium hover:bg-orange-500 border border-orange-900 rounded-lg transition duration-200"
                >
                  Contact Us
                </Disclosure.Button>
                
      {/* Social Media Links */}
      <div className="flex space-x-4 p-5">
        
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
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      {/* Register Modal */}
      {isRegisterOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="relative bg-neutral-900 rounded-lg p-6 max-w-md w-full mx-4 border border-neutral-800">
            <button
              onClick={() => setRegisterOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white z-10"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            <ContactUs onClose={() => setRegisterOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}