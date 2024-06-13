"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

const UpdateTache = () => {
  const [formData, setFormData] = useState({
    idTache: 0,
    title: "",
    description: "",
    completed: false,
    dueDate: new Date(),
    userId: 0,
  });
  const [users, setUsers] = useState([]);
  const [alertVisible, setAlertVisible] = useState(false);
  const router = useRouter();

  const { TacheId } = useParams();

  useEffect(() => {
    // Fetch the task data by ID
    if (TacheId) {
      fetch(`https://localhost:7019/api/Taches/GetTacheById/${TacheId}`)
        .then((response) => response.json())
        .then((data: any) => {
          if (data) {
            const parsedDate = data.dueDate
              ? new Date(data.dueDate)
              : new Date();
            setFormData({
              idTache: data.idTache || 0,
              title: data.title || "",
              description: data.description || "",
              completed: data.completed || false,
              dueDate: parsedDate || "",
              userId: data.userId || 0,
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching task:", error);
        });
    }

    fetch("https://localhost:7019/api/Users/GetUsers")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [TacheId]);

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

    fetch(`https://localhost:7019/api/Taches/UpdateTache/`, {
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
    <div>
      {alertVisible && (
        <div className="alert alert-success" role="alert">
          Tache mis à jour avec succès
        </div>
      )}
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
              value={formData.dueDate.toISOString().split("T")[0]}
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

          <div className="form-group col-6 my-1 form-checkl">
            <input
              type="checkbox"
              className="form-check-input"
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

        <button type="submit" className="btn btn-primary my-2">
          Mettre à jour
        </button>
      </form>
    </div>
  );
};

export default UpdateTache;
