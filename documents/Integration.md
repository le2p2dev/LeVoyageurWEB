# Document d'intégration

comment lancer leVoyageurWeb ?

## Lancement en local

Pour lancer en local, vous avez besoin au préalable de lancer l'[API](https://github.com/le2p2dev/LeVoyageurAPI) (suiver son document d'intégration pour plus d'information sur son lancement)

Une fois l'api lancée et son point d'entrée renseigné dans [listApi.js](../src/api/listApi.js)

![entryPoint](./assets/Capture%20d%E2%80%99%C3%A9cran%202022-06-23%20%C3%A0%2012.51.35.png)

Sous la racine du projet, il faut [installer les package npm](https://docs.npmjs.com/cli/v8/commands/npm-install) puis lancer l'appli via la commande renseigné dans [package.json](../package.json) (ici npm start) vous obtenez alors le résultat suivant dans la console

[Vidéo de lancement du script](./assets/Enregistrement%20de%20l%E2%80%99%C3%A9cran%202022-06-23%20%C3%A0%2012.57.00.mov)

l'application est disponible en local à l'adresse [suivante](http://localhost:3000/)

## Déploiement sur un serveur distant

l'application dispose d'une [github action](../.github/workflows/Zdeploy.yml) qui s'occupe d'envoyer sur le serveur de votre [runner](https://docs.github.com/en/actions/hosting-your-own-runners/about-self-hosted-runners), vous trouverez alors sur votre serveur une hiérarchie suivante :

![imageLS](./assets/Capture%20d%E2%80%99%C3%A9cran%202022-06-23%20%C3%A0%2013.58.45.png)

installer un serveur nginx et configurez le
site-available/default avec le entrypoint root comme suis :

![imageRoot](./assets/Capture%20d%E2%80%99%C3%A9cran%202022-06-23%20%C3%A0%2014.02.46.png)

une fois cette configuration effectuée, à chaque push sur la branche main le runner s'ocupera du déploiement sur le serveur distant

![imageRunner](./assets/Capture%20d%E2%80%99%C3%A9cran%202022-06-23%20%C3%A0%2014.48.13.png)
