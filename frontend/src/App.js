import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import StartGame from './components/StartGame';


import Dashboard from './components/Dashbord';
import Rules_admin from './components/Rules_admin';
import Cards_admin from './components/Cards_admin';
import Users_admin from './components/Users_admin';


import GameSetup from './components/GameSetup';
import PlayerChoseName from './components/PlayerChoseName';
import PlayerRoleReveal from './components/PlayerRoleReveal';
import GameStartInstructions from './components/GameInstructions';
import CaptainRoleReveal from './components/CaptainRoleReveal';
import CrewSelection from './components/CrewSelection';
import PlayerTurn from './components/PlayerTurn';
import PlayerCardChoice from './components/PlayerCardChoice';
import ActionCardSelection from './components/ActionCardSelection';
import { PlayerProvider } from './PlayerContext';


function App() {
  return (
    <PlayerProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/start-game" element={<StartGame />} />
          <Route path="/game-setup" element={<GameSetup />} />
          <Route path="/player-chose-name" element={<PlayerChoseName />} />
          <Route path="/player-role-reveal" element={<PlayerRoleReveal />} />
          <Route path="/game-instructions" element={<GameStartInstructions />} />
          <Route path="/captain-role-reveal" element={<CaptainRoleReveal />} />
          <Route path="/crew-selection" element={<CrewSelection />} />
          <Route path="/player-turn" element={<PlayerTurn />} />
          <Route path="/player-card-choice" element={<PlayerCardChoice />} />
          <Route path="/action-card-selection" element={<ActionCardSelection />} />
  

      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/rules_admin" element={<Rules_admin />} />
      <Route path="/cards_admin" element={<Cards_admin />} />
      <Route path="/users_admin" element={<Users_admin />} />
      </Routes>
      </Router>
    </PlayerProvider>
  );
}

export default App;
