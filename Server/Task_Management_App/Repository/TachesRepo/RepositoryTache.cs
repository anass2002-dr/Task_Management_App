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
            var listTache = _dbContextTaches.Taches.ToList();


            return listTache;
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
    }
}
