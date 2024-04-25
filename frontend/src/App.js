import { Routes, Route, Navigate } from "react-router-dom";

//pages
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import Chats from "./pages/Chats";
import Settings from "./pages/Settings";
import Browse from "./pages/Browse";
//components
import Topnav from "./components/Topnav";
import Layout from "./components/Layout";

function App() {
  return (
    <>
      <Topnav />
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/browse" element={<Browse />} />
      </Routes>
    </>
  );
}

export default App;
