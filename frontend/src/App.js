import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import StartGame from './components/StartGame';
import Homepage from './components/Homepage'

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/start-game" element={<StartGame />} />
      </Routes>
    </Router>
  );
}

export default App;
