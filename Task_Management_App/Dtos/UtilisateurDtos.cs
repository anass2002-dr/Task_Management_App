using Task_Management_App.Models;

namespace Task_Management_App.Dtos
{
    public class UtilisateurDtos
    {
        public int IdUser { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public UtilisateurDtos(Utilisateur utilisateur)
        {
            this.IdUser = utilisateur.IdUser;
            this.Email = utilisateur.Email;
            this.Username = utilisateur.Username;
            this.Name = utilisateur.Name;
        }
        public UtilisateurDtos()
        {
            
        }
    }
}
