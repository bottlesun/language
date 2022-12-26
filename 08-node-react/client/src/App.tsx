import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';
import LandingPage from "./components/views/landingPage";
import LoginPage from "./components/views/loginPage";
import Register from "./components/views/register";

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </Router>
  );
}

export default App;
