import config from "../../config.json";
import "../styles/login.css"

export default function Login() {

  const login =  () => {
    window.location.href = `${config.apiUrl}/Accounts/Login`;
};

  return (
  <div  className='background'style={{ display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <h1 className='login-header'> Omniscio Fitness Tracker </h1>

      <button 
                onClick={login} 
                style={{
                    backgroundColor: '#4285F4', 
                    color: 'white', 
                    padding: '10px 20px', 
                    borderRadius: '4px', 
                    border: 'none', 
                    cursor: 'pointer'
                }}
            >
                Sign in with Google 🚀
      </button>

    <div>
      <h2 className='attribution'> Designed by Freepik </h2>
    </div>

  </ div>
  );
}
