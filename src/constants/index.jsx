import { BotMessageSquare } from "lucide-react";
import { BatteryCharging } from "lucide-react";
import { Fingerprint } from "lucide-react";
import { ShieldHalf } from "lucide-react";
import { PlugZap } from "lucide-react";
import { GlobeLock } from "lucide-react";

import user1 from "../assets/profile-pictures/user1.jpg";
import user2 from "../assets/profile-pictures/user2.jpg";
import user3 from "../assets/profile-pictures/user3.jpg";
import user4 from "../assets/profile-pictures/user4.jpg";
import user5 from "../assets/profile-pictures/user5.jpg";
import user6 from "../assets/profile-pictures/user6.jpg";

export const navItems = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#" },
  { label: "Blogger", href: "#" },
  { label: "Register", href: "#" },
];

export const testimonials = [
  {
    user: "John Doe",
    company: "Stellar Solutions",
    image: user1,
    text: "I am extremely satisfied with the services provided. The team was responsive, professional, and delivered results beyond my expectations.",
  },
  {
    user: "Jane Smith",
    company: "Blue Horizon Technologies",
    image: user2,
    text: "I couldn't be happier with the outcome of our project. The team's creativity and problem-solving skills were instrumental in bringing our vision to life",
  },
  {
    user: "David Johnson",
    company: "Quantum Innovations",
    image: user3,
    text: "Working with this company was a pleasure. Their attention to detail and commitment to excellence are commendable. I would highly recommend them to anyone looking for top-notch service.",
  },
  {
    user: "Ronee Brown",
    company: "Fusion Dynamics",
    image: user4,
    text: "Working with the team at XYZ Company was a game-changer for our project. Their attention to detail and innovative solutions helped us achieve our goals faster than we thought possible. We are grateful for their expertise and professionalism!",
  },
  {
    user: "Michael Wilson",
    company: "Visionary Creations",
    image: user5,
    text: "I am amazed by the level of professionalism and dedication shown by the team. They were able to exceed our expectations and deliver outstanding results.",
  },
  {
    user: "Emily Davis",
    company: "Synergy Systems",
    image: user6,
    text: "The team went above and beyond to ensure our project was a success. Their expertise and dedication are unmatched. I look forward to working with them again in the future.",
  },
];

export const features = [
  {
    icon: <BotMessageSquare />,
    text: "Online Learning",
    description:
      "All courses are available online for flexible learning.",
  },
  {
    icon: <BatteryCharging />,
    text: "Comprehensive Materials",
    description:
      "Each course includes videos, resources, and exercises.",
  },
  {
    icon: <PlugZap />,
    text: "Certification",
    description:
      "All courses provide certification upon completion.",
  },
  {
    icon: <GlobeLock />,
    text: "Discounted Fees",
    description:
      "Some courses are available at discounted prices.",
  },
];

export const checklistItems = [
  {
    title: "Empower Your Learning Journey",
    description:
      "Unlock your potential with Way2Skills. Our courses are designed to help you build the skills you need to succeed in the modern world.",
  },
  {
    title: "Skill Development Made Easy",
    description:
      "Access high-quality educational resources and hands-on learning materials to boost your skills.",
  },
  {
    title: "Learn at Your Own Pace",
    description:
      "Take courses in your preferred format, and learn from anywhere with online classes.",
  },
  {
    title: "Stay Ahead of the Curve",
    description:
      "Stay updated with the latest trends and skills with our regularly updated course offerings.",
  },
  {
    title: "Achieve Your Goals with Certification",
    description:
      "Each course comes with certification to showcase your newly acquired skills and stand out in your career.",
  },
];


export const pricingOptions = [
  {
    "title": "Photoshop",
    "mode" : "online",
    "actual_price": "7000",
    "discount_price": "4000",
    "features": [
      "Course videos",
      "Resources",
      "Exercises",
      "Certification"
    ]
  },
  {
    "title": "Digital Marketing",
    "mode" : "online",
    "actual_price": "7000", 
    "discount_price" : "4000",
    "features": [
      "Course videos",
      "Resources",
      "Exercises",
      "Certification"
    ]
  },
  {
    "title": "C, C++ Programming",
    "mode" : "online",
    "actual_price": "7000", 
    "discount_price" : "4000",
    "features": [
      "Course videos",
      "Resources",
      "Exercises",
      "Certification"
    ]
  },
  {
    "title": "ReactJS",
    "mode" : "online",
    "actual_price": "25000", 
    "discount_price" : "15000",
    "features": [
      "Course videos",
      "Resources",
      "Exercises",
      "Certification"
    ]
  },
  {
    "title": "Core Java",
    "mode" : "online",
    "actual_price": "7000", 
    "discount_price" : "4000",
    "features": [
      "Course videos",
      "Resources",
      "Exercises",
      "Certification"
    ]
  },
  {
    "title": "MySQL",
    "mode" : "online",
    "actual_price": "5000", 
    "discount_price" : "3000",
    "features": [
      "Course videos",
      "Resources",
      "Exercises",
      "Certification"
    ]
  },
  {
    "title": "Python",
    "mode" : "online",
    "actual_price": "7000", 
    "discount_price" : "4000",
    "features": [
      "Course videos",
      "Resources",
      "Exercises",
      "Certification"
    ]
  },
  {
    "title": "Java Fullstack (J2EE)",
    "mode" : "online",
    "actual_price": "32000", 
    "discount_price" : "20000",
    "features": [
      "Course videos",
      "Resources",
      "Exercises",
      "Certification"
    ]
  },
];


export const resourcesLinks = [
  { href: "#", text: "Getting Started" },
  { href: "#", text: "Documentation" },
  { href: "#", text: "Tutorials" },
  { href: "#", text: "API Reference" },
  { href: "#", text: "Community Forums" },
];

export const platformLinks = [
  { href: "#", text: "Features" },
  { href: "#", text: "Supported Devices" },
  { href: "#", text: "System Requirements" },
  { href: "#", text: "Downloads" },
  { href: "#", text: "Release Notes" },
];

export const communityLinks = [
  { href: "#", text: "Events" },
  { href: "#", text: "Meetups" },
  { href: "#", text: "Conferences" },
  { href: "#", text: "Hackathons" },
  { href: "#", text: "Jobs" },
];
