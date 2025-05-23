import React, { useState, useEffect, useRef } from "react";
import { useLocation } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import logo from "../../assets/SkyShare-Logo.png";
import { useNavigate } from 'react-router-dom';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isHelpMenuOpen, setIsHelpMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const userMenuRef = useRef(null);
  const helpMenuRef = useRef(null);

  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const [user] = useAuthState(auth);

  const location = useLocation();
  const isChatRoute = ['/chatroom', '/createroom', '/joinroom'].includes(location.pathname);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen((prev) => !prev);
  };

  const toggleHelpMenu = () => {
    setIsHelpMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target)
      ) {
        setIsUserMenuOpen(false);
      }
      if (
        helpMenuRef.current &&
        !helpMenuRef.current.contains(event.target)
      ) {
        setIsHelpMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const currentPath = window.location.pathname;

  const navigate = useNavigate();
  const signin = () => {
    navigate('/roomauth');
  };

  return (
    <div className="flex justify-between items-center p-5 sticky top-0 bg-black z-50">
      <a href="/" style={{ textDecoration: "none" }}>
        <div className="flex items-center ml-4">
          <img src={logo} alt="SkyShare-Logo" className="w-8 h-auto" />
          <h1 style={{ fontFamily: 'Exo, sans-serif' }} className="text-lg md:text-xl font-semibold text-white ml-2">
            SkyStream<span className="text-blue-500">.</span>
          </h1>
        </div>
      </a>

      {/* Desktop Menu */}
      <div className="hidden md:flex justify-center items-center gap-7 flex-1 mr-14">
        {[
          { name: "Home", path: "/" },
          { name: "ChatRoom", path: "/chatroom" },
          { name: "ScreenShare", path: "/sharescreen" },
          { name: "VideoRoom", path: "/videoroom" },
          { name: "FileSharing", path: "/fileshare" },
        ].map((link) => (
          <a
            key={link.path}
            href={link.path}
            className={`text-sm font-semibold ${
              currentPath === link.path
                ? "text-white"
                : "text-gray-400 hover:text-white"
            } transition`}
          >
            {link.name}
          </a>
        ))}

        {/* Help Menu */}
        <div ref={helpMenuRef} className="relative">
          <button
            className="text-sm font-semibold flex text-gray-400 hover:text-white transition focus:outline-none"
            onClick={toggleHelpMenu}
          >
            Help
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="22"
              fill="currentColor"
              className="bi bi-chevron-down ml-2"
              viewBox="0 0 14 14"
            >
              <path
                fillRule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
              />
            </svg>
          </button>
          {isHelpMenuOpen && (
            <div className="absolute top-10 left-0 bg-black/60 backdrop-blur-lg shadow-xl rounded-2xl z-50 p-4 w-40 border border-gray-700">
              <ul className="list-none space-y-2">
                <li>
                  <a
                    href="/about"
                    className="block text-white text-base hover:text-cyan-400 transition"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="block text-white text-base hover:text-cyan-400 transition"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="/help-center"
                    className="block text-white text-base hover:text-cyan-400 transition"
                  >
                    Help Center
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Desktop User Menu */}
      <div ref={userMenuRef} className="relative hidden md:inline-block">
        <div className="flex flex-row justify-between items-center space-x-4">
          {isChatRoute ? (
            user ? (
              <button 
                className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition"
                onClick={() => signOut(auth)}
                >
                Sign Out
              </button>
            ) : (
              <button 
                className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition"
                onClick={() => signin()}
                >
                Sign In
              </button>
            )
          ) : null}
          <button
            className="text-gray-400 hover:text-blue-400 text-2xl cursor-pointer flex items-center focus:outline-none"
            onClick={toggleUserMenu}
          >
            <i className="bi bi-person-fill transition-transform transform hover:scale-110"></i>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-down"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
              />
            </svg>
          </button>
        </div>
        {isUserMenuOpen && (
          <div className="absolute top-12 right-0 bg-black/60 backdrop-blur-lg shadow-xl rounded-2xl z-50 p-4 w-48 border border-gray-700">
            <ul className="list-none space-y-2">
              <li>
                <a
                  href="/contact"
                  className="block text-white text-base hover:text-blue-500 transition"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/help-center"
                  className="block text-white text-base hover:text-blue-500 transition"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="/privacypolicy"
                  className="block text-white text-base hover:text-blue-500 transition"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/termsandconditons"
                  className="block text-white text-base hover:text-blue-500 transition"
                >
                  Terms & Condition
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      <div ref={mobileMenuRef} className="relative md:hidden">
        <button
          className="text-gray-400 text-2xl cursor-pointer focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <i className="bi bi-list"></i>
        </button>
        {isMobileMenuOpen && (
          <div className="absolute top-12 right-0 bg-white shadow-lg rounded-lg z-50 p-4 w-56">
          <ul className="list-none space-y-3">
            {[{ name: "Home", path: "/" },
              { name: "ChatRoom", path: "/chatroom" },
              { name: "ScreenShare", path: "/sharescreen" },
              { name: "VideoRoom", path: "/videoroom" },
              { name: "FileSharing", path: "/fileshare" },
              { name: "About", path: "/about" },
              { name: "Contact Us", path: "/contact" },
              { name: "Help Center", path: "/help-center" },
            ].map((link) => (
              <li key={link.path}>
                <a
                  href={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block text-base ${currentPath === link.path ? "text-blue-500" : "text-black hover:text-blue-500"} transition`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        
          {isMobileMenuOpen && isChatRoute ? (
            user ? (
              <button
                className="px-6 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition mt-4 w-full sm:w-auto text-center"
                onClick={() => {
                  signOut(auth);
                  setIsMobileMenuOpen(false);
                }}
              >
                Sign Out
              </button>
            ) : (
              <button
                className="px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition mt-4 w-full sm:w-auto text-center"
                onClick={() => {
                  signin();
                  setIsMobileMenuOpen(false);
                }}
              >
                Sign In
              </button>
            )
          ) : null}
        </div>
        )}
      </div>
    </div>
  );
}

export default Header;