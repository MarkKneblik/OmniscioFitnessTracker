import { useEffect, useState } from 'react';
import '../styles/myprogram.css' //import navbar styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Font Awesome component
import axios from 'axios';
import config from "../../config.json";

export default function Home() {

    return (
       <div>
      <header>
        <h1>My Simple React Home Page</h1>
      </header>
      <main>
        <p>Welcome to my simple React home page! This is a basic example of a React project.</p>
        <img src="https://via.placeholder.com/300" alt="Placeholder" />
      </main>
    </div>

    );
}
