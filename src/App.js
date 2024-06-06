import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Bot from "./components/ChatBot/Bot";
import Ocr from "./components/Ocr/Ocr";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bot" element={<Bot />} />
        <Route path="/ocr" element={<Ocr />} />
      </Routes>
    </Router>
  );
};

export default App;
