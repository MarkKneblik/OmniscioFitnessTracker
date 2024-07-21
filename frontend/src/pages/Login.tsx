import { useEffect, useState } from 'react';
import config from "../../config.json";
import "../styles/login.css"

export default function Login() {

  useEffect(() => {
    // Load Google Identity Services script
    const script = document.createElement('script');
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    document.body.appendChild(script);

    return () => {
        // Clean up script if component is unmounted
        document.body.removeChild(script);
    };
  }, []); // Run upon mounting of component


  return (
  <div  className='background'style={{ display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <h1 className='header'> Omniscio Fitness Tracker </h1>

    <script src="https://accounts.google.com/gsi/client" async></script>
    
    <div id="g_id_onload"
        data-client_id={config.clientID}
        data-auto_prompt="false">
    </div>

    <div className='g_id_signin'
        data-size="large"
        data-login_uri = "https://localhost:5256/MyProgram"
        data-theme="filled_blue"
        data-text="sign_in_with"
        data-shape="pill"
        data-width="200"
        data-logo_alignment="left">
    </div>

    <div>
      <h2 className='attribution'> Designed by Freepik </h2>
    </div>

  </ div>
  );
}
