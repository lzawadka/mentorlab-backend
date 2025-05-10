# Utilisez une image Node.js comme base
FROM node:20-alpine

# Installer OpenSSL et d'autres dépendances nécessaires
RUN apk add --no-cache openssl

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le reste des fichiers de votre projet
COPY . .

# Générer le client Prisma
RUN npx prisma generate

# Exposer le port utilisé par votre application
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["sh", "-c", "npx prisma migrate dev && npm run start:dev && npx ts-node src/infrastructure/prisma/seed.ts"]
