# Task App Management
## Description
Cette application de gestion de tâches (Test de compétences en développement “FullStack”)  est construite avec Next.js pour le frontend et .NET pour le backend. Elle permet aux utilisateurs d'ajouter,
de modifier et de supprimer des tâches et des utilisateurs.
## Structure du Projet
Le projet est structuré en deux parties principales : le frontend et le backend.
Task_app_management/
│
├── application/ # Frontend (Next.js + TypeScript)
│ ├── app/
│ │ ├── layout/
│ │ │ └── Navbar.tsx
│ │ ├── Tache/
│ │ │ ├── AddTache.tsx
│ │ │ ├── ListTache.tsx
│ │ │ └── UpdateTache.tsx
│ │ ├── Utilisateur/
│ │ │ ├── AddUtilisateur.tsx
│ │ │ ├── ListUtilisateur.tsx
│ │ │ └── UpdateUtilisateur.tsx
│ │ ├── styles/
│ │ │ └── globals.css
│ │ └── index.tsx
│ ├── public/
│ └── package.json
│
└── server/ # Backend (ASP.NET Core)
├── Controllers/
├── Models/
│ ├── Tache.cs
│ └── Utilisateur.cs
├── DTOs/
│ ├── TacheDtos.cs
│ └── UtilisateurDtos.cs
├── Migrations/
├── Repository/
├── Services/
├── Program.cs
├── appsettings.json
└── Task_app_management.csproj


## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- [Node.js](https://nodejs.org/) (v14 ou supérieur)
- [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
- [Visual Studio](https://visualstudio.microsoft.com/) ou [Visual Studio Code](https://code.visualstudio.com/)
- [.NET SDK](https://dotnet.microsoft.com/download)

## Configuration
### Backend
1. Ouvrez le fichier `appsettings.json` dans le dossier `server` et modifiez la chaîne de connexion :
```json
"ConnectionStrings": {
  "defaultConnection": "Data Source=DESKTOP-VSPM59C\\ANASS;Initial Catalog=Task_Management_App;Integrated Security=True;Trusted_Connection=True;TrustServerCertificate=True"
}


2. Configurez CORS dans Program.cs pour permettre les requêtes du frontend :
builder.Services.AddCors(options => options.AddPolicy(name: "MyPolicy", policy =>
{
    policy.WithOrigins("http://localhost:3000").AllowAnyMethod().AllowAnyHeader();
}));
Frontend
1. Clonez ce dépôt :
git clone https://github.com/anass2002-dr/Task_Management_App.git
cd Task_Management_App/application

2. Installez les dépendances du projet :

npm install
# ou si vous utilisez Yarn
yarn install

3. Créez un fichier .env.local à la racine de votre projet pour les variables d'environnement. Ajoutez les variables suivantes :
NEXT_PUBLIC_API_BASE_URL=https://localhost:7019/api

## Démarrage du Projet
Backend:
1. Ouvrez le dossier server dans Visual Studio ou Visual Studio Code.
2. Exécutez les migrations pour configurer la base de données :
dotnet ef migrations add InitialCreate
dotnet ef database update
3- Démarrez le serveur backend :
dotnet run

Frontend :
1. Dans un nouveau terminal, accédez au dossier application :
cd application
2. Démarrez le serveur de développement :
npm run dev
# ou si vous utilisez Yarn
yarn dev

Ouvrez http://localhost:3000 pour voir votre application dans le navigateur.

Utilisation
Ajouter une Tâche
Pour ajouter une tâche, cliquez sur le bouton "Ajouter une Tache" dans la page de liste des tâches. Remplissez le formulaire et soumettez-le.

Modifier une Tâche
Pour modifier une tâche existante, cliquez sur le bouton "Modifier" à côté de la tâche que vous souhaitez modifier. Apportez les modifications nécessaires et soumettez le formulaire.

Supprimer une Tâche
Pour supprimer une tâche, cliquez sur le bouton "Supprimer" à côté de la tâche que vous souhaitez supprimer. Une confirmation vous sera demandée avant la suppression.
