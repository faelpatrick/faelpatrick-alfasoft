import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { Link } from "react-router-dom";
import Modal from "./Modal";

import DeleteContact from "./DeleteContact";

function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const db = getFirestore();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "contacts"));
        const contactsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setContacts(contactsData);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, [db]);

  return (
    <div>
      <h1>Contact List</h1>
      <div className="contact-list">
        {contacts.map((contact) => (
          <div className="contact-card" key={contact.id}>
            <img src={contact.photo} alt={contact.name} />
            <h2>{contact.name}</h2>
            <p>Contato: {contact.phone}</p>
            <p>
              Email: <a href={"mailto:" + contact.email}>{contact.email}</a>
            </p>
            <Link to={`/contacts/${contact.id}`}>Detalhes</Link>

            <button
              className="delete-button"
              onClick={() => setShowModal(true)}
            >
              <i className="fas fa-trash-alt">X</i>
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <Modal>
          <p>Tem certeza de que deseja excluir este contato?</p>
          <button onClick={() => setShowModal(false)}>Cancelar</button>
          <button onClick={DeleteContact}>Confirmar</button>
        </Modal>
      )}
    </div>
  );
}

export default ContactList;
