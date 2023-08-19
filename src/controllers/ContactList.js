import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

function ContactList() {
  const [contacts, setContacts] = useState([]);

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
          <div
            className="contact-card"
            key={contact.id}
            onClick={() => (window.location.href = `/contacts/${contact.id}`)}
          >
            <img src={contact.photo} alt={contact.name} />
            <h2>{contact.name}</h2>
            <p>{contact.phone}</p>
            {/* <p>
              Email: <a href={"mailto:" + contact.email}>{contact.email}</a>
            </p> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContactList;
