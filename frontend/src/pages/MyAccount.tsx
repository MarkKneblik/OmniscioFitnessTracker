import config from "../../config.json";
import Menu from '../components/Menu'; 
export default function MyAccount() {

    const logout =  () => {
        window.location.href = `${config.apiUrl}/Accounts/Logout`
    };

    return (

        <div>

          <Menu></Menu>
        
        </div>

    );
  }
  