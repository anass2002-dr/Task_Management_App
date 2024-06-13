using Task_Management_App.Dtos;
using Task_Management_App.Models;

namespace Task_Management_App.Repository.TachesRepo
{
    public interface IRepositoryTache
    {
        List<Tache> getTaches();
        Tache CreateTache(Tache Tache);
        Tache UpdateTache(Tache Tache);
        Tache GetTacheById(int id);
        bool DeleteTache(int id);
        bool DeleteTacheByUserId(int id);
    }
}
