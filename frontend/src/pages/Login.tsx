import { useEffect, useState } from 'react';
import config from "../../config.json";
import "../styles/login.css"
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

export default function Login() {



  const login = useGoogleLogin({
    onSuccess: async codeResponse => 
    {console.log(codeResponse)

      try 
      {
        await axios.post(`${config.apiUrl}/Auth/Auth`, codeResponse, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      } 
      catch (error: any) 
      {
        console.error("Error posting data:", error.message);
      }
    }
    
    ,
    onError: () => {
      console.log('Login Failed')},
    flow: 'auth-code',
    redirect_uri: `${config.apiUrl}/Auth/Auth`
  });

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
