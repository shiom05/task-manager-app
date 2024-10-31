import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav/Nav";
import Authentication from "./components/Authentication/Authentication";
import { UserProvider } from "./context/UserContext";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  useEffect(() => {
    localStorage.removeItem('token');
  },[])
  return (
    <>
      <UserProvider>
        <Nav></Nav>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Authentication />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;
