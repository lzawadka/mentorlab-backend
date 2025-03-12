# Sinea - Backend Application

## Description

Sinea (anciennement MentorLab) est une application backend construite avec **TypeScript** et **NestJS**, utilisant **Prisma** comme ORM pour la gestion de la base de données PostgreSQL. Le projet est conteneurisé avec **Docker** pour simplifier le déploiement et l'exécution. L'application suit une architecture modulaire claire, répartie en fonctionnalités distinctes.

---

## Prérequis

- [Node.js](https://nodejs.org/) (version recommandée dans le projet)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- Prisma CLI (installé automatiquement avec les dépendances du projet)

---

## Installation et lancement du projet

### Étapes pour démarrer

1. **Cloner le projet**
   ```bash
   git clone <url-du-repo>
   cd sinea-back
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement**
   - Modifier le fichier `.env` avec vos configurations. Voici un exemple minimal :
     ```env
     DATABASE_URL=postgresql://user:password@localhost:5432/sinea
     PORT=3000
     JWT_SECRET=your_secret_key
     ```

4. **Lancer les conteneurs**
   - Construire et démarrer les conteneurs Docker :
     ```bash
     docker-compose up --build
     ```
   - Ce script démarre les services suivants :
     - **Backend** : L'application NestJS.
     - **PostgreSQL** : Base de données relationnelle.

5. **Appliquer les migrations Prisma**
   ```bash
   npx prisma migrate dev
   ```

---

### Accès au projet

- **API Backend** : [http://localhost:3000/api](http://localhost:3000/api)
- **Base de données PostgreSQL** :
  - Hôte : `localhost`
  - Port : `5432`
  - Utilisateur/Mot de passe : Selon votre fichier `.env`

---

## Commandes utiles

### Gestion des conteneurs Docker

- **Démarrer les conteneurs :**
  ```bash
  docker-compose up
  ```
- **Reconstruction des conteneurs :**
  ```bash
  docker-compose up --build
  ```
- **Arrêter les conteneurs :**
  ```bash
  docker-compose down
  ```
- **Arrêter les conteneurs et supprimer les volumes :**
  ```bash
  docker-compose down --volumes
  ```

### Gestion de la base de données avec Prisma

- **Générer le client Prisma :**
  ```bash
  npx prisma generate
  ```
- **Appliquer les migrations :**
  ```bash
  npx prisma migrate dev
  ```
- **Inspecter la base de données :**
  ```bash
  npx prisma studio
  ```

- **Création des mocks :**
  ```bash
  npx ts-node src/infrastructure/prisma/seed.ts
  ```
  - Mot de passe générique pour tout les users : Password123@
  -Script disponible dans : 
  ```
  script/generate.mock
  ```

---

## Arborescence des fichiers

```
sinea/
├── prisma/
│   ├── migrations/        # Historique des migrations Prisma
│   ├── schema.prisma      # Schéma de la base de données
│   └── wait-for-postgres.sh # Script d'attente pour Postgres dans Docker
├── src/
│   ├── application/       # Dossiers par fonctionnalité (contrôleurs, services, DTO)
│   │   ├── auth/          # Gestion de l'authentification
│   │   ├── campaign/      # Gestion des campagnes
│   │   ├── category/      # Gestion des catégories
│   │   ├── client/        # Gestion des clients
│   │   ├── participant/   # Gestion des participants
│   │   ├── team/          # Gestion des équipes
│   │   └── user/          # Gestion des utilisateurs
│   ├── domain/            # Entités et logique métier
│   │   ├── entities/      # Modèles d'entités du domaine
│   │   └── enums/         # Enumérations pour les valeurs constantes
│   ├── infrastructure/    # Repositories et logique d'accès aux données
│   ├── shared/            # Modules partagés (décorateurs, guards, constantes)
│   ├── main.ts            # Point d'entrée de l'application
├── docker-compose.yml     # Configuration Docker Compose
├── Dockerfile             # Configuration Docker de l'application
├── .env                   # Exemple de fichier d'environnement
├── package.json           # Fichier des dépendances du projet
├── README.md              # Documentation du projet
```

---

## Licence

Ce projet est sous licence MIT. Consultez le fichier [LICENSE](./LICENSE) pour plus de détails.

---