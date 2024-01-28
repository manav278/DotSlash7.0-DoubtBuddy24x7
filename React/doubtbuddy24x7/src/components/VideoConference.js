import React, { useEffect, useState } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useLocation, useNavigate } from 'react-router';

function randomID(len) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(
  url = window.location.href
) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

export default function VideoConference() {


  const navigate = useNavigate();
  const location = useLocation();
  const buddy = location.state || {};
  const roomID = getUrlParams().get('roomID') || randomID(5);
  const userdata = localStorage.getItem("user");
  console.log("Hello" + buddy);
  let myMeeting = async (element) => {
    // generate Kit Token
    const appID = 1879789699;
    const serverSecret = "11783def339ec0a947d385ec85c35b4b";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, randomID(5), userdata);



    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    // start the call
    const meeturl = window.location.protocol + '//' + window.location.host + window.location.pathname + '?roomID=' + roomID;
    // setMeeturl(url);
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: 'Personal link',
          url: meeturl,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
      },
    });
    // setMeeturl(url);
    startmeeting();
    async function startmeeting() {
      try {
        const url = "http://localhost:3003/user/videoCall";
        let result = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            "meetlink": meeturl,
            "buddy": buddy.email
          })
        });
        result = await result.json()
        //
        if (result) {
          console.log(result);
        }


      } catch (e) {
        console.error(e);
      }
    }
  };
  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     // Navigate to the desired route
  //     history.push('/home');
  //   }, 5000); // Change the duration as needed (in milliseconds)

  //   // Cleanup function to clear the timeout if the component unmounts
  //   return () => clearTimeout(timeoutId);
  // }, [history]);

  const goforfeedback = ()=>{
    // navigate("/home");
  }
  const myInterval = setTimeout(goforfeedback, 50000);


  return (
    <>
      <div
        className="myCallContainer"
        ref={myMeeting}
        style={{ width: '100vw', height: '100vh' }}
      >
        
      </div>
    </>
  );
}