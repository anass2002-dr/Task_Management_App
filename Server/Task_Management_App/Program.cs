using Microsoft.EntityFrameworkCore;
using Task_Management_App.Data;
using Task_Management_App.Repository.TachesRepo;
using Task_Management_App.Repository.UtilisateurRepo;
using Task_Management_App.Services.TachesService;
using Task_Management_App.Services.UtilisateurService;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure DbContext with SQL Server
builder.Services.AddDbContext<DbContextTaches>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"),
    b => b.MigrationsAssembly("Task_Management_App")));



builder.Services.AddScoped<IUtilisateurService, UtilisateurService>();
builder.Services.AddScoped<IRepositoryUtilisateur, RepositoryUtilisateur>();

builder.Services.AddScoped<ITacheService, TacheService>();
builder.Services.AddScoped<IRepositoryTache, RepositoryTache>();
var Myplociy = "Mypolicy";
builder.Services.AddCors(options => options.AddPolicy(name: Myplociy, policy =>
{
    policy.WithOrigins("http://localhost:3000").AllowAnyMethod().AllowAnyHeader();
}));


var app = builder.Build();
app.UseCors(Myplociy);
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
