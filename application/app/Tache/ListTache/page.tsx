"use client";

import { useEffect, useState } from 'react';
import Link from "next/link";

export default function ListUtilisateur() {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with your actual API endpoint
    fetch("https://localhost:7019/api/Users/GetUsers")
      .then((response) => response.json())
      .then((data) => {
        setUtilisateurs(data);
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
  const deleteUser = (idUserToDelete:any) => {
    fetch(`https://localhost:7019/api/Users/DeleteUser?id=${idUserToDelete}`, {
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
        setUtilisateurs(utilisateurs.filter((user:any) => user.idUser !== idUserToDelete));
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
            <th scope="col">Nom Utilisateur</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col" className='text-center' colSpan={2}>Operation</th>
          </tr>
        </thead>
        <tbody>
          {utilisateurs.map((utilisateur:any, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{utilisateur.nom}</td>
              <td>{utilisateur.username}</td>
              <td>{utilisateur.email}</td>
              <td><Link href={`/Utilisateur/updateUser/${utilisateur.idUser}`} className='btn btn-primary'>Update</Link></td>
              <td><button className="btn btn-danger" onClick={() => deleteUser(utilisateur.idUser)}>
                    Delete
                  </button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
