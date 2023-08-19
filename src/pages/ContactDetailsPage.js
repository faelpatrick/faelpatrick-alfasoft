import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";

function ContactDetails() {
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const db = getFirestore();

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const contactDoc = doc(db, "contacts", id);
        const contactData = await getDoc(contactDoc);
        if (contactData.exists()) {
          setContact({ id: contactData.id, ...contactData.data() });
        } else {
          console.error("Contact not found");
        }
      } catch (error) {
        console.error("Error fetching contact details:", error);
      }
    };

    fetchContactDetails();
  }, [db, id]);

  if (!contact) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Contact Details</h1>
      <div className="contact-card details">
        <img src={contact.photo} alt={contact.name} />
        <h2>{contact.name}</h2>
        <p>Contato: {contact.phone}</p>
        <p>
          Email: <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </p>
      </div>
    </div>
  );
}

export default ContactDetails;
