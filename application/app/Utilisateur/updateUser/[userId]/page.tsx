"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
const UpdateUser = () => {
  const [formData, setFormData] = useState({
    IdUser: "",
    Name: "",
    Username: "",
    Email: "",
  });
  const [alertVisible, setAlertVisible] = useState(false);
  const router = useRouter();

  const { userId } = useParams();

  useEffect(() => {
    if (userId) {
      fetch(`https://localhost:7019/api/Users/GetUserById/${userId}`)
        .then((response) => response.json())
        .then((data: any) => {
          if (data) {
            setFormData({
              IdUser: data.idUser || "",
              Name: data.name || "",
              Username: data.username || "",
              Email: data.email || "",
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    }
  }, [userId]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(formData);

    fetch(`https://localhost:7019/api/Users/UpdateUser/`, {
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
    <div>
      {alertVisible && (
        <div className="alert alert-success" role="alert">
          Utilisateur mis à jour avec succès
        </div>
      )}
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
        <button type="submit" className="btn btn-primary">
          Mettre à jour
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
