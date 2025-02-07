import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, BellIcon } from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";
import logo from "../assets/logo.png";
import ContactUs from "./ContactUs"; // Import the Register component

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