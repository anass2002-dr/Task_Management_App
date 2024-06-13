using Task_Management_App.Dtos;
using Task_Management_App.Models;
using Task_Management_App.Repository.TachesRepo;
using System.Text.Json.Serialization;

namespace Task_Management_App.Services.TachesService
{
    public class TacheService : ITacheService
    {
        private readonly IRepositoryTache _RepositoryTache;
        public TacheService(IRepositoryTache RepositoryTache)
        {
            this._RepositoryTache = RepositoryTache;
        }
        public TacheDtos CreateTache(TacheDtos tacheDto)
        {
        
        var tache = new Tache
            {
                Title = tacheDto.Title,
            Description = tacheDto.Description,
            Completed = tacheDto.Completed,
            DueDate = tacheDto.DueDate,
            UserId = tacheDto.UserId,
        };

            var createdUser = _RepositoryTache.CreateTache(tache);

            return new TacheDtos(createdUser);

        }

        public bool DeleteTache(int id)
        {
            return _RepositoryTache.DeleteTache(id);
        }

        public List<Tache> GetTaches()
        {
            var listTache = _RepositoryTache.getTaches();
            //List<Tache> li = new List<Tache>();
            //foreach (var user in listTache)
            //{
            //    li.Add(user);
            //}
            return listTache;
        }

        public TacheDtos GetTacheById(int id)
        {
            var user = _RepositoryTache.GetTacheById(id);
            if (user != null)
            {
                //return new TacheDtos(user.IdUser, user.Name, user.Username, user.Email);
                return new TacheDtos(user);
            }
            else
            {
                return null;
            }
        }

        public TacheDtos UpdateTache(TacheDtos tacheDto)
        {
            var tache = new Tache
            {
                IdTache=tacheDto.IdTache,
                Title = tacheDto.Title,
                Description = tacheDto.Description,
                Completed = tacheDto.Completed,
                DueDate = tacheDto.DueDate,
                UserId = tacheDto.UserId,
            };
            var user = _RepositoryTache.UpdateTache(tache);
            if (user != null)
            {
                return new TacheDtos(user);
            }
            else
            {
                return null;
            }

        }

        public bool DeleteTacheByUserId(int id)
        {
            return _RepositoryTache.DeleteTacheByUserId(id);
        }
    }
}
