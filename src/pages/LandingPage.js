import React from "react";
import { Link } from "react-router-dom";
import ContactList from "../controllers/ContactList";

function LandingPage() {
  return (
    <div>
      <h1>ContAct</h1>
      <Link to="/add">Adicionar Contato</Link>
      <ContactList />
    </div>
  );
}

export default LandingPage;
