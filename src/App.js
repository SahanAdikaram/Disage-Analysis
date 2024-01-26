// src/App.js
import React, { useEffect, useState } from "react";

import conditions from "./data/conditions.json";
import {
  Routes,
  Route,
  Link,
  Redirect,
  Switch,
  useNavigate,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import data from "./data";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </>
  );
}

export default App;
