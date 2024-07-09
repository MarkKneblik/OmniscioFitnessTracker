//import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from '../components/NavBar';
import MyTrends from './MyTrends';
import MyProgram from './MyProgram';


export default function App() {
  return (
      <Router>
      <NavBar />
        <Routes>

          <Route 
            path = '/MyTrends'
            element = {<MyTrends />}
          />

          <Route 
            path = '/MyProgram'
            element = {<MyProgram />}
          />
        </Routes>
      </Router>
    
  )
}
