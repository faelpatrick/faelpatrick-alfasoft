import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";

function ContactDetails() {
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const db = getFirestore();

  useEffect(() => {
    // Função para buscar os detalhes do contato no Firebase Firestore
    const fetchContactDetails = async () => {
      try {
        const contactDoc = doc(db, "contacts", id);
        const contactData = await getDoc(contactDoc);
        if (contactData.exists()) {
          setContact({ id: contactData.id, ...contactData.data() });
        } else {
          // O contato não foi encontrado, você pode lidar com isso de acordo com sua lógica
          console.error("Contact not found");
        }
      } catch (error) {
        console.error("Error fetching contact details:", error);
      }
    };

    // Chama a função para buscar os detalhes do contato quando o componente monta
    fetchContactDetails();
  }, [db, id]);

  if (!contact) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Contact Details</h1>
      <div className="contact-detail">
        <div className="contact-details-left">
          <img src={contact.photo} alt={contact.name} />
        </div>
        <div className="contact-details-rigth">
          <h2>{contact.name}</h2>
          <p>Contato: {contact.phone}</p>
          <p>
            Email: <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </p>
          <div className="contact-details-btns">
            <Link to="/" className="btn-back">
              <b> Back to Contacts</b>
            </Link>
            <Link to={`/contacts/${contact.id}/dell`} className="btn-dell">
              <b> Deletar</b>
            </Link>
            <Link to={`/contacts/${contact.id}/edit`} className="btn-edit">
              <b> editar</b>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactDetails;
