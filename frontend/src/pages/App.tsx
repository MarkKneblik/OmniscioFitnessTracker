import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from '../components/NavBar';
import MyTrends from './MyTrends';
import MyProgram from './MyProgram';
import Login from './Login';

export default function Home() {

    return (
        <Router>
        <NavBar />
          <Routes>

          <Route 
              path = '/'
              element = {<Login />}
            />

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

    );
}
