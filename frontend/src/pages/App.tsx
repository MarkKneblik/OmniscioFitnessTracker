import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyTrends from './MyTrends';
import MyProgram from './MyProgram';
import Login from './Login';
import MyAccount from './MyAccount';
import '../styles/app.css';


export default function App() {

    return (
        <Router>
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

            <Route 
              path = '/MyAccount'
              element = {<MyAccount />}
            />


          </Routes>
        </Router>

    );
}
