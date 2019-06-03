# starwars-client

Une application web qui consume l'api  [starwars-api
](https://github.com/benoitDD/starwars-api)

## Téléchargement

`https://github.com/benoitDD/starwars-client.git`

## Installation

A l'intérieur du projet qu'on vient de télécharger :

`npm install`

Pour le serveur, il faut créer un fichier **.env** avec ces informations :

```
PORT=5000
```

Pour le client, il faut créer un fichier **client/.env** avec ces informations :

```
#L'adresse de l'api
URI_API=http://localhost:9090/graphql

#L'adresse où chercher les images
URI_IMAGES=http://localhost:9090
```

Ensuite on peut packager le client :

`npm run build-prod`

Compiler le serveur :

`npm run compile`

Lancer le serveur :

`npm run start-prod`

Maintenant, l'application est consultable à [cette adresse](http://localhost:5000).