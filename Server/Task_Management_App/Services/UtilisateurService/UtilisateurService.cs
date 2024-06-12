using Task_Management_App.Dtos;
using Task_Management_App.Models;
using Task_Management_App.Repository.UtilisateurRepo;

namespace Task_Management_App.Services.UtilisateurService
{
    public class UtilisateurService : IUtilisateurService
    {
        private readonly IRepositoryUtilisateur _RepositoryUtilisateur;
        public UtilisateurService(IRepositoryUtilisateur _RepositoryUtilisateur)
        {
            this._RepositoryUtilisateur = _RepositoryUtilisateur;
        }
        public UtilisateurDtos CreateUtilisateur(UtilisateurDtos utilisateurDto)
        {
            var utilisateur = new Utilisateur
            {
                Name = utilisateurDto.Name,
                Username = utilisateurDto.Username,
                Email = utilisateurDto.Email
            };

            var createdUser = _RepositoryUtilisateur.CreateUtilisateur(utilisateur);

            return new UtilisateurDtos(createdUser);

        }

        public bool DeleteUtilisateur(int id)
        {
            return _RepositoryUtilisateur.DeleteUtilisateur(id);
        }

        public List<UtilisateurDtos> GetUtilisateur()
        {
            var listUtilisateur = _RepositoryUtilisateur.GetUtilisateur();
            List<UtilisateurDtos> li = new List<UtilisateurDtos>();
            foreach (var user in listUtilisateur)
            {
                li.Add(new UtilisateurDtos(user));
            }
            return li;
        }

        public UtilisateurDtos GetUtilisateurById(int id)
        {
            var user = _RepositoryUtilisateur.GetUtilisateurById(id);
            if (user != null)
            {
                //return new UtilisateurDtos(user.IdUser, user.Name, user.Username, user.Email);
                return new UtilisateurDtos(user);
            }
            else
            {
                return null;
            }
        }

        public UtilisateurDtos UpdateUtilisateur(UtilisateurDtos utilisateurDto)
        {
            var utilisateur = new Utilisateur
            {
                IdUser=utilisateurDto.IdUser,
                Name = utilisateurDto.Name,
                Username = utilisateurDto.Username,
                Email = utilisateurDto.Email
            };
            var user = _RepositoryUtilisateur.UpdateUtilisateur(utilisateur);
            if (user != null)
            {
                return new UtilisateurDtos(user);
            }
            else
            {
                return null;
            }

        }
    }
}
