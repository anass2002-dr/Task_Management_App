using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Task_Management_App.Dtos;
using Task_Management_App.Models;
using Task_Management_App.Services.UtilisateurService;

namespace Task_Management_App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : Controller
    {
        private readonly IUtilisateurService _utilisateurService;

        public UsersController(IUtilisateurService utilisateurService)
        {
            _utilisateurService = utilisateurService;
        }

        [HttpGet("GetUsers")]
        public ActionResult<List<UtilisateurDtos>> GetUsers()
        {
            var users = _utilisateurService.GetUtilisateur();

            return Ok(users);
        }
        [HttpGet("GetUserById/{id}")]
        public ActionResult<UtilisateurDtos> GetUserById(int id)
        {
            var users = _utilisateurService.GetUtilisateurById(id);

            return Ok(users);
        }

        [HttpPut("AddUser")]
        public ActionResult<UtilisateurDtos> AddUser(UtilisateurDtos UtilisateurDtos)
        {
            var createdUserDto = _utilisateurService.CreateUtilisateur(UtilisateurDtos);
            return Ok(createdUserDto);
        }


        [HttpPut("UpdateUser")]
        public ActionResult<UtilisateurDtos> UpdateUser(UtilisateurDtos UtilisateurDtos)
        {
            var users =_utilisateurService.UpdateUtilisateur(UtilisateurDtos);
            return Ok(users);
        }

        [HttpDelete("DeleteUser")]
        public ActionResult<UtilisateurDtos> DeleteUser(int id)
        {
            var users = _utilisateurService.DeleteUtilisateur(id);
            return Ok(users);
        }

    }
}
