import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

function EditContactDetails() {
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const [editedContact, setEditedContact] = useState({
    name: "",
    phone: "",
    email: "",
    photo: "",
  });

  const db = getFirestore();

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const contactDoc = doc(db, "contacts", id);
        const contactData = await getDoc(contactDoc);
        if (contactData.exists()) {
          setContact({ id: contactData.id, ...contactData.data() });
          setEditedContact({ id: contactData.id, ...contactData.data() });
        } else {
          console.error("Contact not found");
        }
      } catch (error) {
        console.error("Error fetching contact details:", error);
      }
    };

    fetchContactDetails();
  }, [db, id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedContact({
      ...editedContact,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const contactDocRef = doc(db, "contacts", id);
      await updateDoc(contactDocRef, editedContact);

      // Redirecionar de volta para a página de detalhes após a edição
      window.location = `/contacts/${id}`;
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  if (!contact) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Contact Details</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={editedContact.name}
          onChange={handleInputChange}
        />
        <label htmlFor="phone">Contact:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={editedContact.phone}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={editedContact.email}
          onChange={handleInputChange}
        />
        <button type="submit">Save Changes</button>
        <Link to={`/contacts/${id}`}>Cancel</Link>
      </form>
    </div>
  );
}

export default EditContactDetails;
