import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import MembersPage from './components/pages/MembersPage';
import MemberPage from './components/pages/MemberPage'
import Home from "./components/pages/Home";
import Navbar from "./components/UI/Navbar";

function App() {
  return (
    <Router>
      <div className="App">
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/members' element={<MembersPage />} />
        <Route exact path='/members/:id' element={<MemberPage />}/>
      </Routes>
      </div>
    </Router>
  );
}

export default App;
