import React, { useState, useEffect } from 'react';
import axios from 'axios';


const OnlineStatus = () => {
  const [onlineStatus, setOnlineStatus] = useState(true);
  // Function to handle DoubtAsker click
  const handleDoubtAsker = async () => {
    console.log("Hello");
    setOnlineStatus(false);
    try {
      await axios.get(`http://localhost:3001/user/status/false`);
    } catch (e) {
      console.error(e);
    }
  };

  // Function to handle DoubtSolver click
  const handleDoubtSolver = async () => {
    setOnlineStatus(true);
    try {
      await axios.get(`http://localhost:3001/user/status/true`);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div>
      <h1>Online Status</h1>
      <button onClick={handleDoubtAsker}>DoubtAsker{onlineStatus} {console.log(onlineStatus)}</button>
      <button onClick={handleDoubtSolver}>DoubtSolver {onlineStatus} {console.log(onlineStatus)}</button>
    </div>
  );
};


export default OnlineStatus;


