import React, { useState } from "react";
import { Peer } from "peerjs";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const App = () => {
  const [isSender, setIsSender] = useState(null);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      {isSender === null ? (
        <div className="flex space-x-4">
          <Button onClick={() => setIsSender(true)} className="bg-blue-500 hover:bg-blue-600">
            I am Sender
          </Button>
          <Button onClick={() => setIsSender(false)} className="bg-green-500 hover:bg-green-600">
            I am Receiver
          </Button>
        </div>
      ) : isSender ? (
        <Sender />
      ) : (
        <Receiver />
      )}
    </div>
  );
};

const Sender = () => {
  const [peer, setPeer] = useState(null);
  const [conn, setConn] = useState(null);
  const [file, setFile] = useState(null);
  const [peerId, setPeerId] = useState("");

  const initializePeer = () => {
    const newPeer = new Peer();
    newPeer.on("open", (id) => {
      setPeerId(id);
    });

    newPeer.on("connection", (connection) => {
      setConn(connection);
      connection.on("data", (data) => {
        if (data === "READY_FOR_FILE" && file) {
          connection.send({
            name: file.name,
            size: file.size,
            type: file.type,
            content: file,
          });
        }
      });
    });

    setPeer(newPeer);
  };

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <Card className="w-full max-w-md bg-gray-800">
      <CardHeader>
        <CardTitle>Sender</CardTitle>
      </CardHeader>
      <CardContent>
        {!peer ? (
          <Button onClick={initializePeer} className="w-full bg-blue-500 hover:bg-blue-600">
            Initialize Sender
          </Button>
        ) : (
          <div>
            <Input
              type="file"
              onChange={handleFileUpload}
              className="mb-4 w-full text-white bg-gray-700"
            />
            <p className="text-green-400 mb-4">Share this code with the receiver: {peerId}</p>
            {conn && <p className="text-blue-400">Receiver connected!</p>}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const Receiver = () => {
  const [peer, setPeer] = useState(null);
  const [file, setFile] = useState(null);
  const [connectionId, setConnectionId] = useState("");
  const [conn, setConn] = useState(null);

  const initializePeer = () => {
    const newPeer = new Peer();
    setPeer(newPeer);
  };

  const connectToSender = () => {
    if (!peer) return;
    const connection = peer.connect(connectionId);
    setConn(connection);

    connection.on("open", () => {
      connection.send("READY_FOR_FILE");
    });

    connection.on("data", (data) => {
      const blob = new Blob([data.content], { type: data.type });
      const url = URL.createObjectURL(blob);
      setFile({ name: data.name, url });
    });
  };

  return (
    <Card className="w-full max-w-md bg-gray-800">
      <CardHeader>
        <CardTitle>Receiver</CardTitle>
      </CardHeader>
      <CardContent>
        {!peer ? (
          <Button onClick={initializePeer} className="w-full bg-green-500 hover:bg-green-600">
            Initialize Receiver
          </Button>
        ) : (
          <div>
            <Input
              type="text"
              placeholder="Enter Sender Code"
              value={connectionId}
              onChange={(e) => setConnectionId(e.target.value)}
              className="mb-4 w-full text-white bg-gray-700"
            />
            <Button
              onClick={connectToSender}
              className="w-full bg-green-500 hover:bg-green-600 mb-4"
            >
              Connect
            </Button>
            {file && (
              <div className="text-white">
                <p>File Received: {file.name}</p>
                <a
                  href={file.url}
                  download={file.name}
                  className="text-blue-400 hover:underline"
                >
                  Download File
                </a>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default App;




// import React, { useEffect, useRef } from "react";
// import { motion } from "framer-motion";

// const ChatRoom = () => {
//   const imgRef = useRef(null);

//   const textVariant = (delay) => ({
//     hidden: { y: -50, opacity: 0 },
//     show: {
//       y: 0,
//       opacity: 1,
//       transition: { type: "spring", duration: 1.5, delay: delay },
//     },
//   });

//   const adjustOpacity = () => {
//     if (imgRef.current) {
//       const distanceFromTop = window.scrollY;
//       const startDistance = window.innerWidth < 798 ? 240 : 350;
//       const maxDistance = 500;

//       if (distanceFromTop > startDistance) {
//         const adjustedDistance = distanceFromTop - startDistance;
//         const opacity = Math.max(
//           0,
//           Math.min(1, 1 - adjustedDistance / (maxDistance - startDistance))
//         );
//         imgRef.current.style.opacity = opacity;

//         if (opacity === 0) imgRef.current.style.zIndex = "-1";
//         else imgRef.current.style.display = "2";
//       } else {
//         imgRef.current.style.opacity = 1;
//       }
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", adjustOpacity);
//     return () => window.removeEventListener("scroll", adjustOpacity);
//   }, []);

//   const marqueeContainerStyle = {
//     position: "relative",
//     overflow: "hidden",
//     whiteSpace: "nowrap",
//     width: "100%",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   };

//   const marqueeTextStyle = {
//     display: "inline-block",
//     fontSize: "200px",
//     fontFamily: "'Times New Roman', Times, serif",
//     color: "white",
//     animation: "marquee 18s linear infinite",
//     padding: "0 10px",
//   };

//   const containerStyle = {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "baseline",
//     position: "fixed",
//     width: "100vw",
//     marginTop: "-3rem",
//     margin: 0,
//     padding: 0,
//     zIndex: 2,
//     overflow: "hidden",
//   };

//   return (
//     <div style={{ height: "20vh", margin: 0, padding: 0 }}>
//       <div style={{ position: "relative", zIndex: 2 }}></div>
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//         }}
//       >
//         <div style={containerStyle}>
//           <motion.div
//             variants={textVariant(0.5)}
//             initial="hidden"
//             animate="show"
//           >
//             <div style={marqueeContainerStyle}>
//               <div style={marqueeTextStyle}>Comming Soon....{"  "} </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Adding the marquee keyframes animation inline
// const styleSheet = document.styleSheets[0];
// styleSheet.insertRule(
//   `
//   @keyframes marquee {
//     0% {
//       transform: translateX(100%);
//     }
//     100% {
//       transform: translateX(-100%);
//     }
//   }
// `,
//   styleSheet.cssRules.length
// );

// export default ChatRoom;
