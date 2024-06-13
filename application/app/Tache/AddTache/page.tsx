"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const TacheForm = () => {
  const [formData, setFormData] = useState({
    idTache: 0,
    title: "",
    description: "",
    completed: false,
    dueDate: "",
    userId: 0,
  });

  const [users, setUsers] = useState([]);
  const [alertVisible, setAlertVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("https://localhost:7019/api/Users/GetUsers")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

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
        <div className="row">
          <div className="form-group col-6 my-3">
            <input
              type="text"
              className="form-control  my-2"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter le titre de tache"
            />
          </div>
          <div className="form-group col-6 my-3">
            <input
              type="text"
              className="form-control  my-2"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter le description de tache"
            />
          </div>
          <div className="form-group col-6 my-3">
            <label htmlFor="">Date de Tache</label>
            <input
              type="date"
              className="form-control my-2"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              placeholder="Enter le date de tache"
            />
          </div>
          <div className="form-group col-6 my-3">
            <label htmlFor="userId">Utilisateur</label>
            <select
              className="form-control my-2"
              id="userId"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
            >
              <option value="">Select User</option>
              {users.map((user: any) => (
                <option key={user.idUser} value={user.idUser}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group col-6 my-3 form-checkl">
            <input
              type="checkbox"
              className="form-check-input m-2"
              checked={formData.completed}
              id="completed"
              name="completed"
              onChange={handleChange}
            />
            <label className="form-check-label " htmlFor="completed">
              complete
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
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

export default TacheForm;
