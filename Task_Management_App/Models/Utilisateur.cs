using System.ComponentModel.DataAnnotations;

namespace Task_Management_App.Models
{
    public class Utilisateur
    {
        [Key]
        public int IdUser { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public ICollection<Tache> Taches { get; set; }
    }
}
