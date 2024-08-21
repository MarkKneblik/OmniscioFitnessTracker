import config from "../../config.json";

export default function MyAccount() {

    const logout =  () => {
        window.location.href = `${config.apiUrl}/Accounts/Logout`
    };

    return (
      <div>
        
        <button onClick={logout}> Sign out </button>

      </div>
    );
  }
  