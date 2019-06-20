# starwars-client

Une application web qui consume l'api  [starwars-api
](https://github.com/benoitDD/starwars-api)

Une instance de l'application est mise sur [aws](http://starwars-client.n4jdk2npmn.us-east-2.elasticbeanstalk.com/)

## Téléchargement

`git clone https://github.com/benoitDD/starwars-client.git`

## Installation

A l'intérieur du projet qu'on vient de télécharger :

`npm install`

Pour le **serveur**, il faut créer un fichier **server/.env** avec ces informations :

```
#Le port sur lequel le serveur démarrera
PORT=5000

#Le chemin des fichiers i18n
DIRECTORY_LOCALES_I18N=i18n/locales/{{lng}}/{{ns}}.json
```

Pour le **client**, on peut modifier le fichier **client/.env** :

```
#L'adresse de l'api
URI_API=http://localhost:9090/graphql

#L'adresse où chercher les images
URI_IMAGES=http://localhost:9090

#Le chemin des fichiers i18n
URI_I18N=/i18n/locales/{{lng}}/{{ns}}.json
```

Ensuite on peut packager le client :

`npm run build-prod`

Compiler le serveur :

`npm run compile-prod`

Lancer le serveur :

`npm run start-prod`

Maintenant, l'application est consultable à [cette adresse](http://localhost:5000).