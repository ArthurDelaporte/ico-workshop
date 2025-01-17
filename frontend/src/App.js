import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import StartGame from './components/StartGame';
import Dashboard from './components/Dashbord';
import RulesAdmin from './components/RulesAdmin';
import CardsAdmin from './components/CardsAdmin';
import UsersAdmin from './components/UsersAdmin';
import StatsAdmin from './components/StatsAdmin';
import BugsAdmin from './components/BugsAdmin';
import GameSetup from './components/GameSetup';
import PlayerChoseName from './components/PlayerChoseName';
import PlayerRoleReveal from './components/PlayerRoleReveal';
import GameStartInstructions from './components/GameInstructions';
import CaptainRoleReveal from './components/CaptainRoleReveal';
import CrewSelection from './components/CrewSelection';
import PlayerTurn from './components/PlayerTurn';
import PlayerCardChoice from './components/PlayerCardChoice';
import ActionCardSelection from './components/ActionCardSelection';
import CaptainRevealCards from './components/CaptainRevealCards';
import PlayerTurnNotification from './components/PlayerTurnNotification';
import RevealCards from './components/RevealCards';
import VotingRules from './components/VotingRules';
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
          <Route path="/rules-admin" element={<RulesAdmin />} />
          <Route path="/cards-admin" element={<CardsAdmin />} />
          <Route path="/users-admin" element={<UsersAdmin />} />
          <Route path="/captain-reveal-cards" element={<CaptainRevealCards />} />
          <Route path="/player-turn-notification" element={<PlayerTurnNotification />} />
          <Route path="/stats-admin" element={<StatsAdmin />} />
          <Route path="/bugs-admin" element={<BugsAdmin />} />
          <Route path="/reveal-cards" element={<RevealCards />} />
          <Route path="voting-rules" element={<VotingRules />} />
        </Routes>
      </Router>
    </PlayerProvider>
  );
}

export default App;
