"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const UserForm = () => {
  const [formData, setFormData] = useState({
    IdUser: 0,
    Name: "",
    Username: "",
    Email: "",
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const [alertVisible, setAlertVisible] = useState(false);
  const router = useRouter();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(formData);

    fetch("https://localhost:7019/api/Users/AddUser", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setAlertVisible(true);

        setTimeout(() => {
          setAlertVisible(false);
          router.push("/Utilisateur/ListUtilisateur");
        }, 1000);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group m-3">
          <input
            type="text"
            className="form-control"
            id="Name"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            placeholder="Enter le nom de utilisateur"
          />
        </div>
        <div className="form-group m-3">
          <input
            type="text"
            className="form-control"
            id="Username"
            name="Username"
            value={formData.Username}
            onChange={handleChange}
            placeholder="Enter le username"
          />
        </div>
        <div className="form-group m-3">
          <input
            type="email"
            className="form-control"
            id="Email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            placeholder="Enter l'email"
          />
        </div>
        <button type="submit" className="btn btn-primary m-3">
          Ajouter
        </button>
      </form>
      {alertVisible && (
        <div className="alert alert-success" role="alert">
          Utilisateur ajouté avec succès
        </div>
      )}
    </>
  );
};

export default UserForm;
