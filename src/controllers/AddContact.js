import React, { useState } from "react";
import {
  addDoc,
  collection,
  getFirestore,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

function AddContact() {
  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    email: "",
    photo: "",
  });

  const [contacts, setContacts] = useState([]);
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
    photo: "",
  });

  const db = getFirestore();
  const storage = getStorage();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact({
      ...newContact,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handlePhotoChange = (e) => {
    const photoFile = e.target.files[0];
    if (photoFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewContact({
          ...newContact,
          photo: e.target.result,
        });
      };
      reader.readAsDataURL(photoFile);
    }
  };

  // const handlePhotoChange = async (e) => {
  //   const photoFile = e.target.files[0];
  //   if (photoFile) {
  //     const photoRef = ref(storage, `profile_photos/${photoFile.name}`);
  //     await uploadBytes(photoRef, photoFile);
  //     const photoURL = await getDownloadURL(photoRef);
  //     console.log("Photo URL:", photoURL);

  //     setNewContact({
  //       ...newContact,
  //       photo: photoURL,
  //     });
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newContact.name.length <= 5) {
      setErrors({ ...errors, name: "Name must be longer than 5 characters" });
      return;
    }

    if (!/^\d{9}$/.test(newContact.phone)) {
      setErrors({ ...errors, phone: "Phone must have 9 digits" });
      return;
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(newContact.email)) {
      setErrors({ ...errors, email: "Invalid email address" });
      return;
    }

    if (!newContact.photo) {
      setErrors({ ...errors, photo: "You must select a photo" });
      return;
    }

    try {
      const contactRef = await addDoc(collection(db, "contacts"), newContact);
      setContacts([...contacts, { id: contactRef.id, ...newContact }]);

      // Limpar os campos de entrada
      setNewContact({
        name: "",
        phone: "",
        email: "",
        photo: "",
      });
    } catch (error) {
      console.error("Error creating contact:", error);
    }
  };

  return (
    <div>
      <h1>Add New Contact</h1>
      <form onSubmit={handleSubmit}>
        <div className="photo-geral-container">
          <div className="photo-preview-container">
            <div className="photo-preview">
              {newContact.photo ? (
                <img src={newContact.photo} alt="Preview" />
              ) : (
                <img src="./profile_photos/nophoto.jpg" alt="No Photo" />
              )}
            </div>
            <label htmlFor="photo" className="btn_label">
              Change Photo
            </label>
            <input
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              onChange={handlePhotoChange}
            />
            {errors.photo && <div className="error">{errors.photo}</div>}
          </div>
        </div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={newContact.name}
          onChange={handleInputChange}
        />
        {errors.name && <div className="error">{errors.name}</div>}
        <label htmlFor="phone">Contact:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={newContact.phone}
          onChange={handleInputChange}
        />
        {errors.phone && <div className="error">{errors.phone}</div>}
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={newContact.email}
          onChange={handleInputChange}
        />
        {errors.email && <div className="error">{errors.email}</div>}
        <button type="submit">Add Contact</button>
      </form>
    </div>
  );
}

export default AddContact;
