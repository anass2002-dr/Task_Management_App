"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ListUtilisateur() {
  const [Tache, setTache] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with your actual API endpoint
    fetch("https://localhost:7019/api/Taches/GetTaches")
      .then((response) => response.json())
      .then((data) => {
        setTache(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  const deleteTache = (idTacheDelete: any) => {
    fetch(`https://localhost:7019/api/Users/DeleteTache?id=${idTacheDelete}`, {
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
          console.log("User deleted successfully");
          setTache(
            Tache.filter((Tache: any) => Tache.idUser !== idTacheDelete)
          );
        } else {
          console.error("User deletion failed");
          // Handle deletion failure (e.g., display an error message)
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle network errors or other exceptions
      });
  };
  return (
    <div>
      <div className="my-3">
        <Link href="/Utilisateur/AddUser" className="btn btn-success">
          Ajouter Utilisateur
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
            <th scope="col">ref utilisateur</th>
            <th scope="col" className="text-center" colSpan={2}>
              Operation
            </th>
          </tr>
        </thead>
        <tbody>
          {Tache.map((tache: any, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{tache.title}</td>
              <td>{tache.description}</td>
              <td>{tache.completed}</td>
              <td>{tache.dueDate}</td>
              <td>{tache.userId}</td>
              <td>
                <Link
                  href={`/tache/updateTache/${tache.idTache}`}
                  className="btn btn-primary"
                >
                  Update
                </Link>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTache(tache.idUser)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
