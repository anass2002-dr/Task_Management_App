using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Serialization;
using Task_Management_App.Dtos;
using Task_Management_App.Models;
using Task_Management_App.Services.TachesService;

namespace Task_Management_App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TachesController : Controller
    {
        private readonly ITacheService _tacheService;

        public TachesController(ITacheService tacheService)
        {
            _tacheService = tacheService;
        }
        [HttpGet("GetTaches")]
        public ActionResult<List<TacheDtos>> GetTaches()
        {
            var users = _tacheService.GetTaches();

            return Ok(users);
        }
        [HttpGet("GetTacheById/{id}")]
        public ActionResult<TacheDtos> GetTacheById(int id)
        {
            var users = _tacheService.GetTacheById(id);

            return Ok(users);
        }

        [HttpPut("AddTache")]
        public ActionResult<TacheDtos> AddTache(TacheDtos TacheDtos)
        {
            var createdTacheDto = _tacheService.CreateTache(TacheDtos);
            return Ok(createdTacheDto);
        }


        [HttpPut("UpdateTache")]
        public ActionResult<TacheDtos> UpdateTache(TacheDtos TacheDtos)
        {
            var users = _tacheService.UpdateTache(TacheDtos);
            return Ok(users);
        }

        [HttpDelete("DeleteTache")]
        public ActionResult<TacheDtos> DeleteTache(int id)
        {
            var users = _tacheService.DeleteTache(id);
            return Ok(users);
        }

    }
}
