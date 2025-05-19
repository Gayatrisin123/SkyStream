import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { v4 as uuidv4 } from 'uuid';

const VideoRoom = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) {
            const newRoomID = uuidv4();
            navigate(`/videoroom/${newRoomID}`);
        }
    }, [id, navigate]);

    if (!id) {
        return null;
    }

    const roomID = id;

    const myMeeting = async (element) => {
        const appID = Number(import.meta.env.VITE_APP_ID);
        const serverSecret = import.meta.env.VITE_SERVER_SECRET;
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            roomID,
            Date.now().toString(),
            "UjjwalS"
        );

        const zp = ZegoUIKitPrebuilt.create(kitToken);

        // Start the call
        zp.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: 'Copy link',
                    url:
                        window.location.protocol + '//' +
                        window.location.host + `/videoroom/` + roomID,
                },
            ],
            turnOnMicrophoneWhenJoining: true,
            turnOnCameraWhenJoining: true,
            showMyCameraToggleButton: true,
            showMyMicrophoneToggleButton: true,
            showAudioVideoSettingsButton: true,
            showScreenSharingButton: true,
            showTextChat: true,
            showUserList: true,
            maxUsers: 50,
            layout: "Auto",
            showLayoutButton: true,
            scenario: {
                mode: "GroupCall",
                config: {
                    role: "Host",
                },
            },
        });
    };

    return (
        <div
            ref={(element) => {
                if (element) myMeeting(element);
            }}
            style={{ 
                width: '100vw', 
                height: '100vh', 
                backgroundColor: 'black', 
                overflow: 'hidden', 
                msOverflowY: 'auto', 
                msOverflowX: 'hidden', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                color: 'white', 
                position: 'relative',
                boxSizing: 'border-box',
                marginTop: '-4.6rem'
            }}
        >
        </div>
    );
};

export default VideoRoom;








// import React, { useEffect, useState, useRef } from 'react';
// import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

// const VideoRoom = () => {
//   const [meetingID, setMeetingID] = useState('');
//   const [isJoined, setIsJoined] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [micMuted, setMicMuted] = useState(false);
//   const [cameraMuted, setCameraMuted] = useState(false);

//   const zpRef = useRef(null);
//   const containerRef = useRef(null);

//   // Make sure these env variables are correctly set in your .env file
//   const appID = Number(import.meta.env.VITE_APP_ID);
//   const serverSecret = import.meta.env.VITE_SERVER_SECRET;

//   const generateToken = (meetingID) => {
//     console.log('AppID:', appID, 'ServerSecret:', serverSecret, 'MeetingID:', meetingID);
//     if (!appID || !serverSecret) {
//       console.error('appID or serverSecret is missing. Check your environment variables.');
//       alert('App configuration error. Please contact support.');
//       return null;
//     }
//     return ZegoUIKitPrebuilt.generateKitTokenForTest(
//       appID,
//       serverSecret,
//       meetingID,
//       new Date().getTime().toString(),
//       "User"
//     );
//   };

//   const joinMeeting = () => {
//     if (!meetingID.trim()) {
//       alert('Please enter a valid Meeting ID');
//       return;
//     }
//     setLoading(true);
//     setTimeout(() => {
//       setIsJoined(true);
//       setLoading(false);
//     }, 500);
//   };

//   useEffect(() => {
//     if (isJoined) {
//       const token = generateToken(meetingID);
//       if (!token) {
//         setIsJoined(false);
//         return;
//       }

//       const zp = ZegoUIKitPrebuilt.create(token);
//       zpRef.current = zp;

//       if (!containerRef.current) {
//         console.error('Container ref is null');
//         alert('Video container not found');
//         setIsJoined(false);
//         return;
//       }

//       zp.joinRoom({
//         container: containerRef.current,
//         scenario: {
//           mode: ZegoUIKitPrebuilt.VideoConference,
//         },
//         turnOnCameraWhenJoining: true,
//         turnOnMicrophoneWhenJoining: true,
//       })
//         .then(() => {
//           console.log('Joined room successfully');
//           setMicMuted(false);
//           setCameraMuted(false);
//         })
//         .catch((error) => {
//           console.error('Error joining room:', error);
//           alert('Failed to join the video room. Please try again.');
//           setIsJoined(false);
//         });

//       return () => {
//         zp.leaveRoom();
//         zpRef.current = null;
//         setMicMuted(false);
//         setCameraMuted(false);
//       };
//     }
//   }, [isJoined, meetingID]);

//   const createMeeting = () => {
//     const newMeetingID = Math.random().toString(36).substr(2, 8);
//     setMeetingID(newMeetingID);
//     joinMeeting();
//   };

//   const toggleMic = () => {
//     if (zpRef.current) {
//       if (micMuted) {
//         zpRef.current.turnOnMicrophone();
//       } else {
//         zpRef.current.turnOffMicrophone();
//       }
//       setMicMuted(!micMuted);
//     }
//   };

//   const toggleCamera = () => {
//     if (zpRef.current) {
//       if (cameraMuted) {
//         zpRef.current.turnOnCamera();
//       } else {
//         zpRef.current.turnOffCamera();
//       }
//       setCameraMuted(!cameraMuted);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
//       {!isJoined ? (
//         <div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-md">
//           <h2 className="text-xl font-bold mb-4 text-gray-700">Join or Create a Video Call</h2>
//           <div className="mb-4">
//             <button
//               onClick={createMeeting}
//               className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-500 transition mb-4"
//             >
//               Create Meeting
//             </button>
//             <input
//               type="text"
//               placeholder="Enter Meeting ID"
//               className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
//               value={meetingID}
//               onChange={(e) => setMeetingID(e.target.value)}
//             />
//             <button
//               onClick={joinMeeting}
//               className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-500 transition"
//               disabled={loading}
//             >
//               {loading ? 'Joining...' : 'Join Meeting'}
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div className="w-full max-w-5xl flex flex-col items-center space-y-4">
//           <div
//             ref={containerRef}
//             className="w-full h-[600px] bg-black rounded-lg shadow-lg"
//           />
//           <div className="flex space-x-4">
//             <button
//               onClick={toggleMic}
//               className={`px-4 py-2 rounded-lg text-white ${
//                 micMuted ? 'bg-red-600 hover:bg-red-500' : 'bg-green-600 hover:bg-green-500'
//               }`}
//             >
//               {micMuted ? 'Unmute Mic' : 'Mute Mic'}
//             </button>
//             <button
//               onClick={toggleCamera}
//               className={`px-4 py-2 rounded-lg text-white ${
//                 cameraMuted ? 'bg-red-600 hover:bg-red-500' : 'bg-green-600 hover:bg-green-500'
//               }`}
//             >
//               {cameraMuted ? 'Turn Camera On' : 'Turn Camera Off'}
//             </button>
//             <button
//               onClick={() => {
//                 if (zpRef.current) {
//                   zpRef.current.leaveRoom();
//                   zpRef.current = null;
//                 }
//                 setIsJoined(false);
//                 setMeetingID('');
//                 setMicMuted(false);
//                 setCameraMuted(false);
//               }}
//               className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-500 text-white"
//             >
//               Leave Meeting
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VideoRoom;
