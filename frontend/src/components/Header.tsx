// External Libraries
import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faDumbbell,
  faChartLine,
  faRuler,
} from "@fortawesome/free-solid-svg-icons";

// Styles
import "../styles/header.css";

// Types
interface HeaderProps {
  title: string;
  icon: "user" | "dumbbell" | "chartline" | "ruler";
}

// Define variants for Framer Motion
const headerVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const Header: React.FC<HeaderProps> = ({ title, icon }) => {
  // Map icon string to actual FontAwesomeIcon
  const iconMap = {
    user: faUser,
    dumbbell: faDumbbell,
    chartline: faChartLine,
    ruler: faRuler,
  };

  const selectedIcon = iconMap[icon]; // Select appropriate icon

  return (
    <div className="header-wrapper">
      <motion.h1
        className="header"
        variants={headerVariant}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }}
      >
        <FontAwesomeIcon icon={selectedIcon} /> {title}
      </motion.h1>
    </div>
  );
};

export default Header;
