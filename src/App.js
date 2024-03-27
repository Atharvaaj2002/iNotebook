import About from "./Components/About";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./Context/notes/NoteState";
import  Alert from "./Components/Alert";
import  Signup from "./Components/Signup";
import  Login from "./Components/Login";
import React, { useState } from 'react';
function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}

  return (
    <>
    <NoteState>
      <Router>
        <Navbar />
        <Alert alert={alert}/>
        <div className="container">
        <Routes>
          <Route exact path="/" element={<Home showAlert={showAlert} />}></Route>
          <Route  exact path="/about" element={<About showAlert={showAlert}/>}></Route>
          <Route  exact path="/Login" element={<Login showAlert={showAlert}/>}></Route>
          <Route  exact path="/Signup" element={<Signup showAlert={showAlert}/>}></Route>
        </Routes>
        </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;