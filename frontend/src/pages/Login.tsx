import { useEffect, useState } from 'react';
import config from "../../config.json";
import "../styles/login.css"
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

export default function Login() {

  const login = async () => 
  {
      try 
      {
        await axios.get(`${config.apiUrl}/Accounts/Login`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      } 
      catch (error: any) 
      {
        console.error("Error upon GET request:", error.message);
      }
    };

  return (
  <div  className='background'style={{ display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <h1 className='header'> Omniscio Fitness Tracker </h1>

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
