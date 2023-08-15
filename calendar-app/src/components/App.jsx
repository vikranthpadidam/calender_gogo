
// import React, { useState, useEffect } from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SignUpButton from './SignupButton';
import EventForm from './EventForm/EventForm';

function App() {
  // const [message, setMessage] = useState("");

  // useEffect(() => {
  //   fetch("http://localhost:8000/message")
  //     .then((res) => res.json())
  //     .then((data) => setMessage(data.message));
  // }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signupButton" element={<SignUpButton />}></Route>
        <Route path="/events" element={<EventForm />}></Route>
      </Routes>
    </BrowserRouter>
    // <div className="App">
    //   <h1>{message}</h1>
    // </div>
  );
}

export default App