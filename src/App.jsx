import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, } from "react-router-dom";
import Layout from "./components/common/Layout.jsx";
import Header from "./components/common/Header.jsx";
import Home from "./pages/Home.jsx";
import ChatRoom from "./pages/ChatRoom.jsx";
import About from "./pages/About.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import Help from "./pages/HelpCenter.jsx";
import Host from "./components/ScreenSharing/HostRoom.jsx";
import Join from "./components/ScreenSharing/JoinRoom.jsx";
import CreateChatRoom from "./components/ChatRoom/CreateRoom/CreateChatRoom.jsx";
import ScreenShare from "./components/ScreenSharing/MainSection/MainHome.jsx";
import VideoRoom from "./components/VideoRoom/VideoRoom.jsx";
import FireSharing from "./components/FileSharing/MainSection/MainScreen.jsx";
import SendFile from "./components/FileSharing/SendingFile/SendFile.jsx";
import ReceiveFile from "./components/FileSharing/ReceiveFile/ReceiveFile.jsx";
import JoinChatRoom from "./components/ChatRoom/JoinRoom/JoinChatRoom.jsx";
import RoomAuth from "./components/ChatRoom/AuthChecking/Auth.jsx";
import Error404 from "./components/common/Error404.jsx";
import "./App.scss";

function App() {
  return (
    <Router>
      <Header />
      <>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            {/* Route - ChatRoom */}
            <Route path="/chatroom" element={<ChatRoom />} />
              <Route path="/joinroom" element={<JoinChatRoom />} />
              <Route path="/createroom" element={<CreateChatRoom />} />
              <Route path="/roomauth" element={<RoomAuth />} />
            {/* Route - ScreenSharing */}
            <Route path="/sharescreen" element={<ScreenShare />} />
              <Route path="/sharescreen/host" element={<Host />} />
              <Route path="/sharescreen/join" element={<Join />} />
            {/* Route - VideRoom */}
            <Route path="/videoroom" element={<VideoRoom />} />
              <Route path="/videoroom/:id" element={<VideoRoom />} />
            {/* Route - FileSharing */}
            <Route path="/fileshare" element={<FireSharing />} />
              <Route path="/fileshare/sendfile" element={<SendFile />} />
              <Route path="/fileshare/receivefile" element={<ReceiveFile />} />
            {/* Route - Common Routes */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/help-center" element={<Help />} />
            {/* Route - Error Route Handling */}
            <Route path="/error404" element={<Error404 />} />
            <Route path="*" element={<Navigate to="/error404" />} />
          </Route>
        </Routes>
      </>
    </Router>
  );
}

export default App;