// External Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

// Configuration
import config from "../../config.json";

// Styles
import "../styles/button.css";

export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${config.apiURL}/Accounts/Logout`,
        null,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        window.location.href = `${config.frontendURL}/`; // If response is OK, redirect to Login page
      }
    } catch (error: any) {
      console.error("Error logging out: ", error.message);
      if (error.response && error.response.status === 401) {
        window.location.href = `${config.frontendURL}/`; // If response is unauthorized, redirect to Login page
      }
    }
  };

  return (
    <div>
      <button onClick={handleLogout} className="button-base default-button">
        <FontAwesomeIcon
          icon={faSignOutAlt}
          className="logout-button-icon"
        ></FontAwesomeIcon>
        Logout
      </button>
    </div>
  );
}
