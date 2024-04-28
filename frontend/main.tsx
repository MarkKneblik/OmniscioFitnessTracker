import React from 'react'; // Import React to use JSX
import ReactDOM from 'react-dom/client'; // Import ReactDOM for rendering
import App from './src/pages/App'; // Import your root component

// create a root in the 'root' div in index.html
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// render App component to the root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
