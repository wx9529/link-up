import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from './pages/Dashboard';
import OnBoarding from './pages/OnBoarding';
import Individual from "./pages/Individual";
import React from "react";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/onboarding" element={<OnBoarding />} />
          <Route path="/individual" element={<Individual />} />
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;