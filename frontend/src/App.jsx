import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/login";
import UpdateProfile from "./pages/update-profile";
import Maincomponent from "./pages/maincomponent"; // Import the Quiz component

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Login />} />
      <Route path="/updateprofile" element={<UpdateProfile />} />
      <Route path="/home" element={<Maincomponent />} /> {/* Add the Quiz route */}
    </Routes>
  );
}

export default App;
