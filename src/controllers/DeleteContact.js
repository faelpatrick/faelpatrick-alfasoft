import React, { useState, useEffect } from "react";
import { getFirestore, doc, getDoc, deleteDoc } from "firebase/firestore";

function DeleteContact(id) {
  const [contact, setContact] = useState(null);
  const db = getFirestore();

  useEffect(() => {
    // Função para buscar o contato a ser excluído no Firebase Firestore
    const fetchContact = async () => {
      try {
        const contactDoc = doc(db, "contacts", id);
        const contactData = await getDoc(contactDoc);
        if (contactData.exists()) {
          setContact({ id: contactData.id, ...contactData.data() });
        } else {
          console.error("Contact not found");
        }
      } catch (error) {
        console.error("Error fetching contact:", error);
      }
    };

    fetchContact();
  }, [db, id]);

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "contacts", id));
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <div>
      <h1>Delete Contact</h1>
      <div className="contact-card">
        <img src={contact?.photo} alt={contact?.name} />
        <h2>{contact?.name}</h2>
        <p>Contato: {contact?.phone}</p>
        <p>
          Email: <a href={`mailto:${contact?.email}`}>{contact?.email}</a>
        </p>
      </div>
    </div>
  );
}

export default DeleteContact;
