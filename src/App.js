import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from './pages/Dashborad';
import OnBoarding from './pages/OnBoarding';
import React from "react";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/onboarding" element={<OnBoarding />} />
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
