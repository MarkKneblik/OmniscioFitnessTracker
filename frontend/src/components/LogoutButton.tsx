import axios from 'axios';
import config from "../../config.json";
import '../styles/logoutbutton.css';


export default function LogoutButton() {

  const handleClick = async () => {
    try {
        const response = await axios.post(`${config.apiUrl}/Accounts/Logout`, null, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });

        if (response.status === 200) {
            console.log('Logged out successfully');
        }
    }
    catch(error:any)
    {
        console.error("Error logging out: ", error.message)
    }
  } 


  return (
    <div>
        <button onClick={handleClick} className='logout-button'> Logout </button>
    </div>
  );
};
