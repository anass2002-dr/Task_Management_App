"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const UserForm = () => {
  const [formData, setFormData] = useState({
    idTache: 0,
    title: "",
    description: "",
    completed: false,
    dueDate: "",
    userId: 0,
  });
  const [utilisateurs, setUtilisateurs] = useState([]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const [alertVisible, setAlertVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Replace with your actual API endpoint
    fetch("https://localhost:7019/api/Taches/GetTaches")
      .then((response) => response.json())
      .then((data) => {
        setUtilisateurs(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(formData);

    fetch("https://localhost:7019/api/Taches/AddTache", {
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
          router.push("/Tache/ListTache");
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
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter le titre de tache"
          />
        </div>
        <div className="form-group m-3">
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter le description de tache"
          />
        </div>
        <div className="form-group m-3">
          <input
            type="date"
            className="form-control"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            placeholder="Enter le date de tache"
          />
        </div>

        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            checked={formData.completed} // Use checked attribute to determine if checkbox should be checked
            id="completed"
            onChange={handleChange} // Add onChange event handler to update formData.completed
          />
          <label className="form-check-label" htmlFor="completed">
            complete
          </label>
        </div>
        <button type="submit" className="btn btn-primary m-3">
          Ajouter
        </button>
      </form>
      {alertVisible && (
        <div className="alert alert-success" role="alert">
          Tache ajouté avec succès
        </div>
      )}
    </>
  );
};

export default UserForm;
