import axios from 'axios';
import config from "../../config.json";
import '../styles/button.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


export default function LogoutButton() {

  const handleLogout = async () => {
    try {
        const response = await axios.post(`${config.apiURL}/Accounts/Logout`, null, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });

        if (response.status === 200) {
          console.log("Response: ", response)
          window.location.href = `${config.frontendURL}/` // If response is OK, redirect to Login page
        }
    }
    catch(error:any)
    {
        console.error("Error logging out: ", error.message)
    }
  } 


  return (
    <div>
      <button onClick={handleLogout} className='button-base default-button'> 
        <FontAwesomeIcon icon={faSignOutAlt} className='logout-button-icon' ></FontAwesomeIcon>
         Logout 
      </button>
    </div>
  );
};
