using Microsoft.VisualBasic;
using Task_Management_App.Data;
using Task_Management_App.Dtos;
using Task_Management_App.Models;

namespace Task_Management_App.Repository.TachesRepo
{
    public class RepositoryTache : IRepositoryTache
    {
        private readonly DbContextTaches _dbContextTaches;

        public RepositoryTache(DbContextTaches dbContextTaches)
        {
            _dbContextTaches = dbContextTaches;
        }
        public Tache CreateTache(Tache Tache)
        {

            _dbContextTaches.Taches.Add(Tache);
            _dbContextTaches.SaveChanges();
            return Tache;
        }

        public bool DeleteTache(int id)
        {
            try
            {
                _dbContextTaches.Taches.Remove(GetTacheById(id));
                _dbContextTaches.SaveChanges(true);
            }
            catch (Exception ex)
            {
                return false;
            }
            return true;
        }

        public List<Tache> getTaches()
        {
            var listUtilisateur = (from t in _dbContextTaches.Taches
                                   join u in _dbContextTaches.Utilisateurs
                                   on t.UserId equals u.IdUser
                                   select new Tache
                                   {
                                       IdTache = t.IdTache,
                                       Title = t.Title,
                                       Description = t.Description,
                                       Completed = t.Completed,
                                       DueDate = t.DueDate,
                                       UserId = t.UserId,
                                       User = u // or u.Username, depending on what you want
                                   }).ToList();
            return listUtilisateur;
        }

        public Tache GetTacheById(int id)
        {
            var utilisateur = _dbContextTaches.Taches.FirstOrDefault(user => user.IdTache == id);
            return utilisateur;
        }

        public Tache UpdateTache(Tache Tache)
        {
            var list = _dbContextTaches.Taches.Update(Tache).Entity;
            _dbContextTaches.SaveChanges();

            return Tache;
        }

        public bool DeleteTacheByUserId(int id)
        {
            try
            {
                _dbContextTaches.Taches.Remove(_dbContextTaches.Taches.FirstOrDefault(user => user.UserId == id));
                _dbContextTaches.SaveChanges(true);
            }
            catch (Exception ex)
            {
                return false;
            }
            return true;
        }
        
    }
}
