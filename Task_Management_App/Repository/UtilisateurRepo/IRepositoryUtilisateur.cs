using Task_Management_App.Dtos;
using Task_Management_App.Models;

namespace Task_Management_App.Repository.UtilisateurRepo
{
    public interface IRepositoryUtilisateur
    {
        List<Utilisateur> GetUtilisateur();
        Utilisateur CreateUtilisateur(Utilisateur Utilisateur);
        Utilisateur UpdateUtilisateur(Utilisateur Utilisateur);
        Utilisateur GetUtilisateurById(int id);
        bool DeleteUtilisateur(int id);
    }
}
