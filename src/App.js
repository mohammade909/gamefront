import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserGame from "./User/UserGame";
import UserDetail from "./User/UserDetail";
import UserMenu from "./User/UserMenu";
import StrategyManager from "./User/StrategyManager";
import ResultBoard from "./User/LeaderBoard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserMenu child={ <UserGame />} />} />
        <Route path="/user/detail" element={<UserMenu child={<UserDetail />}/>} />
        <Route path="/user/strategy" element={<UserMenu child={<StrategyManager />}/> }/>
        <Route path="/user/leaderbaord" element={<UserMenu child={<ResultBoard />}/> }/>
      </Routes>
    </Router>
  );
}

export default App;
