using Microsoft.EntityFrameworkCore;
using Task_Management_App.Models;

namespace Task_Management_App.Data
{
    public class DbContextTaches : DbContext
    {
        public DbContextTaches(DbContextOptions<DbContextTaches> options) : base(options) { }

        public DbSet<Utilisateur> Utilisateurs { get; set; }
        public DbSet<Tache> Taches { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Utilisateur>(entity =>
            {
                entity.HasKey(e => e.IdUser);
                entity.HasMany(e => e.Taches)
                      .WithOne(e => e.User)
                      .HasForeignKey(e => e.UserId)
                      .OnDelete(DeleteBehavior.NoAction);
            });

            modelBuilder.Entity<Tache>(entity =>
            {
                entity.HasKey(e => e.IdTache);
            });
        }
    }
}
