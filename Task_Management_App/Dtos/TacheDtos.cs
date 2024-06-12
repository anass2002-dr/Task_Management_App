using Task_Management_App.Models;

namespace Task_Management_App.Dtos
{
    public class TacheDtos
    {
        public int IdTache { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool Completed { get; set; }
        public DateTime DueDate { get; set; }
        public int UserId { get; set; }

        public TacheDtos(Tache tache)
        {
            this.IdTache = tache.IdTache;
            this.DueDate = tache.DueDate;
            this.Title = tache.Title;
            this.Description = tache.Description;
            this.Completed = tache.Completed;
            this.UserId = tache.UserId;
        }
        public TacheDtos() { }
    }
}
