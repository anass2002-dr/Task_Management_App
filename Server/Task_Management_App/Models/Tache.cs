using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Task_Management_App.Models
{
    public class Tache
    {
        [Key]
        public int IdTache { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public bool Completed { get; set; }
        public DateTime DueDate { get; set; }
        [JsonIgnore]
        public int UserId { get; set; }
        public Utilisateur User { get; set; }
    }
}
