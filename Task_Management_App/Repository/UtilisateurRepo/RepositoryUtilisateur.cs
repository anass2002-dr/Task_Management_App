using Microsoft.EntityFrameworkCore;
using System.Linq;
using Task_Management_App.Data;
using Task_Management_App.Dtos;
using Task_Management_App.Models;

namespace Task_Management_App.Repository.UtilisateurRepo
{
    public class RepositoryUtilisateur : IRepositoryUtilisateur
    {
        private readonly DbContextTaches _dbContextTaches;

        public RepositoryUtilisateur(DbContextTaches dbContextTaches)
        {
            _dbContextTaches = dbContextTaches;
        }
        public Utilisateur CreateUtilisateur(Utilisateur Utilisateur)
        {

            _dbContextTaches.Utilisateurs.Add(Utilisateur);
            _dbContextTaches.SaveChanges();
            return Utilisateur;
        }

        public bool DeleteUtilisateur(int id)
        {
            try
            {
                _dbContextTaches.Utilisateurs.Remove(GetUtilisateurById(id));
                _dbContextTaches.SaveChanges(true);
            }
            catch (Exception ex)
            {
                return false;
            }
            return true;
        }
       
        public List<Utilisateur> GetUtilisateur()
        {
            var listUtilisateur = _dbContextTaches.Utilisateurs.ToList();


            return listUtilisateur;
        }

        public Utilisateur GetUtilisateurById(int id)
        {
           var utilisateur =_dbContextTaches.Utilisateurs.FirstOrDefault(user => user.IdUser == id);
            return utilisateur;
        }

        public Utilisateur UpdateUtilisateur(Utilisateur Utilisateur)
        {
            var list=_dbContextTaches.Utilisateurs.Update(Utilisateur).Entity;
            _dbContextTaches.SaveChanges();

            return Utilisateur;
        }
    }
}
