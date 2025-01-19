# ICO Workshop

## Description
Un projet collaboratif pour développer un jeu interactif intégrant un système de back-office et un front-end immersif, avec une base de données robuste. Ce projet a été conçu avec un design attrayant en accord avec les maquettes fournies.

---

## Mapping des contributeurs

| Pseudo      | Nom et Prénom       | Responsabilités                                                                 |
|-------------|---------------------|--------------------------------------------------------------------------------|
| **Richard** | LAM Richard         | Front du jeu, intégration des maquettes.                                       |
| **Arthur**  | DELAPORTE Arthur    | Backend du jeu (en local), backend pour l'inscription/connexion, BDD, route admin protégée, hébergement du front et du back. |
| **Haithem** | HAMMAMI Haithem     | Front et backend du back-office, cahier des charges complets.                  |

---

## Fonctionnalités

### Jeu
- Frontend immersif avec intégration complète des maquettes **(Richard)**.
- Backend permettant le jeu en local avec des API REST **(Arthur)**.

### Authentification
- Système de connexion/inscription utilisant un email et un mot de passe **(Arthur)**.
- Gestion des rôles et des statuts de bannissement **(Arthur)**.

### Back-office
- Interface back-office pour la gestion des données et utilisateurs **(Haithem)**.
- API backend pour le back-office **(Haithem)**.

### Sécurité
- Routes protégées pour les administrateurs **(Arthur)**.

### Base de données
- Conception et gestion de la base de données avec Prisma **(Arthur)**.

### Documentation
- Cahier des charges complet décrivant toutes les exigences et fonctionnalités **(Haithem)**.

---

## Procédure de lancement

### Prérequis
- Node.js installé sur votre machine.
- Un gestionnaire de packages comme `npm`.

### Variables d'environnement
Créez un fichier `.env` à la racine de votre projet backend avec les informations suivantes :

```env
DATABASE_URL="postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE_NAME?pgbouncer=true"
CLIENT_URL="http://localhost:3000/"
SUPABASE_URL="https://YOUR_SUPABASE_URL.supabase.co"
SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
PORT=1234
```

## Lancer le frontend

Naviguez dans le dossier frontend :

```bash
cd frontend
```

Installez les dépendances avec :
```bash
npm install
```

Démarrez le frontend avec 
```bash
npm start
```

Le frontend sera accessible à l'adresse : http://localhost:3000.


## Lancer le backend

Naviguez dans le dossier backend :

```bash
cd backend
```

Installez les dépendances avec 
```bash
npm install
```

Démarrez le backend avec :
```bash
npm start
```


## Dépendances
### Frontend
Liste des dépendances principales :

- React : Bibliothèque pour le frontend.
- React Router DOM : Gestion des routes.
- TailwindCSS : Framework CSS.
- Chart.js et React Chart.js : Visualisation des données.
- Axios : Gestion des requêtes HTTP.


### Backend
Liste des dépendances principales :

- Express : Framework backend.
- Prisma : ORM pour gérer la base de données.
- Supabase : Plateforme backend as a service.
- dotenv : Gestion des variables d'environnement.
- Cors : Gestion des politiques de partage des ressources.
- Nodemon : Pour un rechargement automatique du serveur lors des modifications de code.

### Liens utiles
API de ICO : https://ico-workshop.onrender.com/

Application ICO accessible en ligne : https://ico-game.vercel.app/
