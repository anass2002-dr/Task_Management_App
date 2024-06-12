using Task_Management_App.Dtos;
using Task_Management_App.Models;

namespace Task_Management_App.Services.UtilisateurService
{
    public interface IUtilisateurService
    {
        List<UtilisateurDtos> GetUtilisateur();
        UtilisateurDtos CreateUtilisateur(UtilisateurDtos UtilisateurDtos);
        UtilisateurDtos UpdateUtilisateur(UtilisateurDtos Utilisateur);
        UtilisateurDtos GetUtilisateurById(int id);
        bool DeleteUtilisateur(int id);
    }
}
