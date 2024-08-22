import config from "../../config.json";
import Menu from '../components/Menu'; 
import LogoutButton from "../components/LogoutButton";
import '../styles/myaccount.css';

export default function MyAccount() {


    return (

        <div>
          
          <Menu></Menu>

          <div className="actions-pane">

            <LogoutButton></LogoutButton>

          </div>
          
        
        </div>

    );
  }
  