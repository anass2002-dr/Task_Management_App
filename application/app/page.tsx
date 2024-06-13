"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
export default function Home() {
  const [taches, setTaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [tacheIdToDelete, setTacheIdToDelete] = useState(null);

  useEffect(() => {
    fetch("https://localhost:7019/api/Taches/GetTaches")
      .then((response) => response.json())
      .then((data) => {
        setTaches(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleDeleteClick = (id: any) => {
    setTacheIdToDelete(id);
    setShowModal(true);
  };

  const deleteTache = (idTacheDelete: any) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmed) return;

    fetch(`https://localhost:7019/api/Taches/DeleteTache?id=${idTacheDelete}`, {
      method: "DELETE", // Use 'DELETE' for deletion
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          console.log("Task deleted successfully");
          setTaches(
            taches.filter((tache: any) => tache.idTache !== idTacheDelete)
          );
        } else {
          console.error("Task deletion failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="my-3">
        <Link href="/Tache/AddTache" className="btn btn-success">
          Ajouter une Tache
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Titre</th>
            <th scope="col">Description</th>
            <th scope="col">Completed</th>
            <th scope="col">Due date</th>
            <th scope="col">Utilisateur</th>
            <th scope="col" className="text-center" colSpan={2}>
              Operation
            </th>
          </tr>
        </thead>
        <tbody>
          {taches.map((tache: any, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{tache.title}</td>
              <td>{tache.description}</td>
              <td className="text-center">
                {tache.completed ? (
                  <i className="bi bi-check-circle-fill text-success"></i>
                ) : (
                  <i className="bi bi-x-octagon text-danger"></i>
                )}
              </td>
              <td>{tache.dueDate}</td>
              <td>{tache.user?.name || "N/A"}</td>
              <td>
                <Link
                  href={`/Tache/updateTache/${tache.idTache}`}
                  className="btn btn-primary"
                >
                  Modifier
                </Link>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTache(tache.idTache)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
