import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";

function Auth() {
  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-blue-400"></div>
      <div className="w-1/2 bg-gray-600">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default Auth;