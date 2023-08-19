import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./data/database";
import "./App.css";

import LandingPage from "./pages/LandingPage";
import AddContact from "./controllers/AddContact";
import ContactDetails from "./controllers/ContactDetails";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/add" element={<AddContact />} />
          <Route path="/contacts/:id" element={<ContactDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
