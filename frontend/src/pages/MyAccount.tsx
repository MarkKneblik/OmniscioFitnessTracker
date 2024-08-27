// External Libraries
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { motion } from "framer-motion";

// Internal Imports
import Menu from "../components/Menu";
import LogoutButton from "../components/LogoutButton";
import Header from "../components/Header";

// Styles
import "../styles/myaccount.css";

// Variants for animations
const menuAndLogoutVariants = {
  hidden: { opacity: 0, y: 20 }, // Start from below and hidden
  visible: { opacity: 1, y: 0 }, // End at original position
};

// Define the Framer Motion transition for the menu Cheeseburger and Logout button
const menuAndLogoutTransition = {
  delay: 0.5,
  duration: 1,
  ease: "easeInOut",
};

export default function MyAccount() {
  return (
    <SimpleBar style={{ height: "100vh", width: "100%" }}>
      <div>
        <Header title="My Account" icon="user"></Header>

        <motion.div
          variants={menuAndLogoutVariants} // Apply variants to the Menu component
          initial="hidden"
          animate="visible"
          transition={menuAndLogoutTransition}
        >
          <Menu />
        </motion.div>

        <motion.div
          className="actions-pane"
          variants={menuAndLogoutVariants} // Apply variants to the LogoutButton component
          initial="hidden"
          animate="visible"
          transition={menuAndLogoutTransition}
        >
          <LogoutButton />
        </motion.div>
      </div>
    </SimpleBar>
  );
}
