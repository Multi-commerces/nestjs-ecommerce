git remote set-url origin git@github.com:Multi-commerces/backend-ecommerce.git

# Initialisation de espace de travail (backend)

npm init

# Installation "express" et "mongoose"

npm install express mongoose

# Lancer mogodb 
docker run --name mongodb -p 27017:27017 -v /data:/data/db -d mongo
vérifier execution : docker ps -f name=mongodb
execution : docker start mongodb
stop : docker stop mongodb

Lorsque vous installez les packages express et mongoose en utilisant la commande npm install, vous installez deux dépendances importantes pour créer un serveur web RESTful avec une base de données NoSQL MongoDB :

express est un framework web pour Node.js qui facilite la création d'applications web avec Node.js. Il permet notamment de créer facilement des routes pour votre API RESTful.

mongoose est une bibliothèque qui permet de modéliser des données pour MongoDB et de les utiliser dans des applications Node.js. Elle facilite notamment l'interaction avec la base de données MongoDB en fournissant une API simple et expressive pour la manipulation de données.

Lorsque vous installez mongoose avec npm, cela ne signifie pas que vous installez automatiquement MongoDB. Vous devez installer MongoDB séparément sur votre système pour pouvoir l'utiliser avec mongoose. Cela peut être fait en téléchargeant et en installant MongoDB à partir de leur site officiel.

En résumé, si vous voulez utiliser mongoose pour interagir avec une base de données MongoDB, vous devez installer MongoDB séparément sur votre système.

# Voici les étapes à suivre pour installer MongoDB sur Docker :

Installez Docker sur votre machine, si ce n'est pas déjà fait.

## Dans votre terminal, tapez la commande suivante pour télécharger l'image MongoDB :

docker pull mongo

## Créez un conteneur en utilisant l'image téléchargée, avec la commande suivante :

docker run --name mongodb -p 27017:27017 -v /data:/data/db -d mongo
 ou
docker run -d -p 27017:27017 --name mongodb mongo:latest (préférence)

exec :
docker exec -it mongodb bash

logs :
docker logs mongodb --follow

nest new nest-todo-api
nest generate module todos
nest generate controller todos
nest generate service todos


spécifie le nom du conteneur que vous voulez créer (dans cet exemple, nous l'avons appelé "mongodb")
-p associe le port du conteneur MongoDB (27017) au port de votre machine hôte (également 27017)
-v spécifie un volume partagé entre votre machine hôte et le conteneur MongoDB,

dans cet exemple, nous avons utilisé "/data" comme dossier partagé
-d spécifie que le conteneur doit être exécuté en arrière-plan

Vous pouvez ensuite utiliser un client MongoDB pour vous connecter à votre conteneur MongoDB,
ou utiliser l'API de votre application Node.js pour interagir avec votre base de données MongoDB.

# Client mongoDB
installation : sudo apt install mongodb-clients

Pour vous connecter à votre serveur MongoDB en utilisant le client shell, vous pouvez taper la commande suivante dans votre terminal : 
> mongo

Cela devrait ouvrir le client shell MongoDB. À partir de là, vous pouvez exécuter des commandes pour interagir avec votre base de données. Par exemple, pour afficher les bases de données disponibles sur votre serveur, vous pouvez taper la commande suivante : 
> show dbs

Cela devrait afficher une liste des bases de données disponibles.
Pour quitter le client shell MongoDB, vous pouvez taper la commande suivante : exit

Si le conteneur est en cours d'exécution, vous pouvez vérifier s'il écoute sur localhost en tapant 
> docker container inspect mongodb | grep IPAddress. 

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
