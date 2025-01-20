import { BookOpenCheck } from "lucide-react";
import { LibraryBig } from "lucide-react";
import { BadgeCheck } from "lucide-react";
import { BadgePercent } from "lucide-react";

import user1 from "../assets/profile-pictures/user1.jpg";
import user2 from "../assets/profile-pictures/user2.jpg";
import user3 from "../assets/profile-pictures/user3.jpg";
import user4 from "../assets/profile-pictures/user4.jpg";
import user5 from "../assets/profile-pictures/user5.jpg";
import user6 from "../assets/profile-pictures/user6.jpg";

export const navItems = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#aboutus" },
  { label: "Blogger", href: "#" },
  // { label: "Register", href: "#" },
];

export const testimonials = [
  {
    user: "Sachinn P",
    company: "Software developer",
    image: "user1",
    text: "I am extremely satisfied with the services provided. The team was responsive, professional, and delivered results beyond my expectations.",
  },
  {
    user: "Pradeep",
    company: "Blue Horizon Technologies",
    image: "user2",
    text: "I couldn't be happier with the outcome of our project. The team's creativity and problem-solving skills were instrumental in bringing our vision to life.",
  },
  {
    user: "Logeshwaran V",
    company: "AdaptX Tech",
    image: "user3",
    text: "The level of detail and attention the team provided was remarkable. Highly recommend their services.",
  },
];

export const features = [
  {
    icon: <BookOpenCheck/>,
    text: "Online Learning",
    description:
      "All courses are available online for flexible learning.",
  },
  {
    icon: <LibraryBig />,
    text: "Comprehensive Materials",
    description:
      "Each course includes videos, resources, and exercises.",
  },
  {
    icon: <BadgeCheck />,
    text: "Certification",
    description:
      "All courses provide certification upon completion.",
  },
  {
    icon: <BadgePercent />,
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
