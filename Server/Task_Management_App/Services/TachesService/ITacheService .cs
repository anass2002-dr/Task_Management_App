using Task_Management_App.Dtos;
using Task_Management_App.Models;

namespace Task_Management_App.Services.TachesService
{
    public interface ITacheService
    {
        List<TacheDtos> GetTaches();
        TacheDtos CreateTache(TacheDtos TacheDtos);
        TacheDtos UpdateTache(TacheDtos TacheDtos);
        TacheDtos GetTacheById(int id);
        bool DeleteTache(int id);
    }
}
