import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import StartGame from './components/StartGame';


import Dashboard from './components/Dashbord';
import Rules_admin from './components/Rules_admin';
import Cards_admin from './components/Cards_admin';
import Users_admin from './components/Users_admin';


import Homepage from './components/Homepage'

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/start-game" element={<StartGame />} />


      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/rules_admin" element={<Rules_admin />} />
      <Route path="/cards_admin" element={<Cards_admin />} />
      <Route path="/users_admin" element={<Users_admin />} />
      </Routes>
    </Router>
  );
}

export default App;
