 # Configuration des variables d'environnement

Pour exécuter correctement ce projet, vous devez configurer vos propres variables d'environnement **_en créant un fichier .env_** à la racine du répertoire du projet. Ce fichier doit contenir les valeurs des variables suivantes :

## Exemple de contenu du fichier .env :
```
MONGO_DB_URI = "URL_de_votre_base_de_données_MongoDB"
TOKEN_SECRET_KEY = "Votre_clé_secrète_pour_les_jetons_JWT"
```
Assurez-vous de remplacer les valeurs par celles appropriées pour votre environnement. Voici ce que chaque variable signifie :

- `MONGO_DB_URI` : Cette variable doit contenir l'URL de votre base de données MongoDB. Vous pouvez obtenir cette URL à partir de votre fournisseur de services MongoDB ou de votre propre instance MongoDB.
- `TOKEN_SECRET_KEY` : Cette variable doit contenir une clé secrète utilisée pour signer les jetons JWT (JSON Web Tokens). Assurez-vous de choisir une clé robuste et sécurisée pour protéger vos jetons JWT.
