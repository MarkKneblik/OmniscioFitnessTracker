import { useState } from 'react';
import config from "../../config.json";
import "../styles/login.css";


export default function Login() {

  const [isHovered, setIsHovered] = useState(false); // Track whether login button is being hovered

  const handleLogin = () => {
    window.location.href = `${config.apiURL}/Accounts/Login`;
  };

  const buttonStyle = {
    backgroundColor: isHovered ? '#B87B6D' : '#CC9E8E', // Change background color on hover
    color: '#332727', 
    padding: '10px 20px', 
    borderRadius: '4px',
    border: `3px solid ${isHovered ? '#9AA6A2' : '#AFB9B5'}`, 
    cursor: 'pointer', 
    fontFamily: 'Inter, sans-serif', 
    fontSize: '16px', 
    transform: isHovered ? 'scale(1.05)' : 'scale(1)', // Slightly scale up on hover
    transition: 'background-color 0.3s ease, transform 0.2s ease', // Smooth transition on hover
  };

  return (
    <div className='background' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <h1 className='login-header'>Omniscio Fitness Tracker</h1>

      <button
        onClick={handleLogin}
        onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)} 
        style={buttonStyle}
      >
        Sign in with Google 🚀
      </button>

      <div>
        <h2 className='attribution'>Designed by Freepik</h2>
      </div>
    </div>
  );
}
