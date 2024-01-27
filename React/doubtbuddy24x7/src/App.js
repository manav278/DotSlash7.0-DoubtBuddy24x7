import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Techstack from './components/Techstack';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Authentication/Login';
import WatingScreen from './components/Doubtsolver/WatingScreen';
import RangeSliders from './components/RangeSliders';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/solver/wait" element={<WatingScreen/>}></Route>
        <Route path="/rangesliders" element={<RangeSliders/>}></Route>
          {/* <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
