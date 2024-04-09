import user1 from "../assets/user4.jpg";
import React from 'react';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import SecurityIcon from '@mui/icons-material/Security'; // Alternative to ShieldHalf
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt'; // Alternative to PlugZap
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';

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
      image: user1,
      text: "I couldn't be happier with the outcome of our project. The team's creativity and problem-solving skills were instrumental in bringing our vision to life",
    },
    {
      user: "David Johnson",
      company: "Quantum Innovations",
      image: user1,
      text: "Working with this company was a pleasure. Their attention to detail and commitment to excellence are commendable. I would highly recommend them to anyone looking for top-notch service.",
    },
    {
      user: "Ronee Brown",
      company: "Fusion Dynamics",
      image: user1,
      text: "Working with the team at XYZ Company was a game-changer for our project. Their attention to detail and innovative solutions helped us achieve our goals faster than we thought possible. We are grateful for their expertise and professionalism!",
    },
    {
      user: "Michael Wilson",
      company: "Visionary Creations",
      image: user1,
      text: "I am amazed by the level of professionalism and dedication shown by the team. They were able to exceed our expectations and deliver outstanding results.",
    },
    {
      user: "Emily Davis",
      company: "Synergy Systems",
      image: user1,
      text: "The team went above and beyond to ensure our project was a success. Their expertise and dedication are unmatched. I look forward to working with them again in the future.",
    },
  ];
  

export const features = [
  {
    icon: <BatteryChargingFullIcon />,
    text: "Peer Mentorship",
    description:
      "Easily connect with Vandy students and alumn to land your dream job.",
  },
  {
    icon: <FingerprintIcon />,
    text: "Multi-Platform Compatibility",
    description:
      "Find and schedule 1:1 chats with mentors",
  },
  {
    icon: <SecurityIcon />,
    text: "Become a Mentor",
    description:
      "Develop your managerial skills by finding mentees to guide through recruitment",
  },
  {
    icon: <ElectricBoltIcon />,
    text: "Real-Time Feedback",
    description:
      "Preview your VR application in real-time as you make changes, allowing for quick iterations and adjustments.",
  },
  {
    icon: <PublicIcon />,
    text: "Mock Interviews",
    description:
      "Work together with your team in real-time on VR projects, enabling seamless collaboration and idea sharing.",
  },
  {
    icon: <LockIcon />,
    text: "Interview Prep Resources",
    description:
      "Learn how to lead a 1:1 conversation through our resource page",
  },
];