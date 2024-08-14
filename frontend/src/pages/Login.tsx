import { useEffect, useState } from 'react';
import config from "../../config.json";
import "../styles/login.css"
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

export default function Login() {

  return (
  <div  className='background'style={{ display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <h1 className='header'> Omniscio Fitness Tracker </h1>

    <GoogleLogin
            onSuccess={async (credentialResponse) => {
              console.log(credentialResponse);

              try {
                await axios.post(`${config.apiUrl}/Auth/Auth`, credentialResponse, {
                  headers: {
                    "Content-Type": "application/json",
                  },
                });
              } catch (error: any) {
                console.error("Error posting data:", error.message);
              }
            }}

            onError={() => {
              console.log('Login Failed');
            }}
        />

    <div>
      <h2 className='attribution'> Designed by Freepik </h2>
    </div>

  </ div>
  );
}
