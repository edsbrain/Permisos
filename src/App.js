import { useState, useEffect } from "react";
import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import Persons from "./components/Persons";
import Register from "./components/Register";
import Main from "./components/Main";
import CreateExp from "./components/CreateExp";
import CreateServ from "./components/CreateServ";
import CreateMot from "./components/CreateMot";

function App() {
  

  return (
    <div className="App">
      

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/createPerson" element={<Register />} />
        <Route path="/createExp/:id" element={<CreateExp/>} />
        <Route path="/createServ" element={<CreateServ/>} />
        <Route path="/createMotiv" element={<CreateMot/>} />
      </Routes>
    </div>
  );
}

export default App;
