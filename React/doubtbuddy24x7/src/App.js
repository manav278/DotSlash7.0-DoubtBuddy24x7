import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Techstack from './components/Techstack';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Authentication/Login';
import WatingScreen from './components/Doubtsolver/WatingScreen';
import RangeSliders from './components/RangeSliders';
import VideoConference from './components/VideoConference';
import VideoConferenceSolver from './components/Doubtsolver/VideoConferenceSolver';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/solver/wait" element={<WatingScreen/>}></Route>
        <Route path="/doubt/ask" element={<Techstack/>}></Route>
        <Route path="/rangesliders" element={<RangeSliders/>}></Route>
        <Route path="/start-meeting" element={<VideoConference/>}></Route>
        <Route path="/start-meeting-solver" element={<VideoConferenceSolver/>}></Route>
        <Route path="/userprofile" element={<UserProfile/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
