import React from "react"; // Import React to use JSX
import ReactDOM from "react-dom/client"; // Import ReactDOM for rendering
import App from "./src/pages/App"; // Import your root component
import { GoogleOAuthProvider } from "@react-oauth/google";
import config from "./config.json";

// create a root in the 'root' div in index.html
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const clientID = `${config.clientID}`;

// render App component to the root
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientID}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
