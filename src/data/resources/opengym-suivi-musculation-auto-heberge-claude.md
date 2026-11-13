## À quoi ça sert

La plupart des applications de musculation gardent tes données sur leurs serveurs, poussent un abonnement ou disparaissent avec l'entreprise. openGym, créé par Duarte Santos (licence AGPL-3.0), fait l'inverse : tu l'héberges toi-même, tes données restent dans un dossier que tu contrôles, et il n'y a ni abonnement, ni publicité, ni suivi.

Ce qu'il fait :

- Planifier tes séances sur une bibliothèque de plus de 5 600 exercices avec des démos animées, et suivre ta progression (charges, records, 1RM estimé).
- Voir sur une silhouette quels muscles tu as travaillés et lesquels tu as négligés.
- Importer ton historique depuis Strong, Hevy ou FitNotes.
- Fonctionner sur iPhone et iPad (avec une application Apple Watch), sur Android (fichier APK) et dans le navigateur, en 20 langues.

Pourquoi il a sa place ici : il propose un serveur MCP, qui permet à Claude de répondre à des questions sur ton entraînement et de noter une séance que tu lui décris. Et son auteur dit clairement qu'il le développe avec Claude Code, avec un fichier `CLAUDE.md` dans le dépôt.

## 1. L'essayer sans rien installer

Une démo dans le navigateur, avec de fausses données, est disponible sur opengym.ch/demo. C'est la vraie application. Tu peux aussi installer l'application sur ton téléphone : elle fonctionne seule, sans serveur ni compte.

## 2. L'héberger chez toi

Il te faut Docker avec Compose. Dans ton terminal :

```bash
git clone https://github.com/DuarteSantos8/openGym
cd openGym
cp .env.example .env
docker compose pull
docker compose up -d
```

Ouvre `http://localhost:8080`, touche **Create profile**, et c'est prêt. Les animations des exercices sont déjà dans l'image, rien d'autre à télécharger.

Pour l'utiliser depuis ton téléphone avec les clés d'accès (Face ID, empreinte), il faut du HTTPS sur un nom de domaine. Dans le fichier `.env`, deux variables sont à adapter : `RP_ID` (le nom de domaine) et `ORIGIN` (l'adresse complète). Le guide d'auto-hébergement du dépôt explique Cloudflare Tunnel, Caddy, Traefik et nginx. Sauvegarder le dossier `./data` suffit pour tout sauvegarder.

## 3. Brancher Claude à tes données

Le serveur MCP tourne en local, lancé par ton client (Claude Desktop, Cursor et d'autres). Il lit directement le dossier `./data` de ton serveur et n'ajoute aucun conteneur. Il ne voit ni tes clés d'accès ni tes secrets de session.

Installe-le :

```bash
cd mcp
npm install
```

Puis déclare-le dans le fichier de configuration de Claude Desktop (sur Mac : `~/Library/Application Support/Claude/claude_desktop_config.json`). Remplace les chemins par les tiens :

```json
{
  "mcpServers": {
    "opengym": {
      "command": "node",
      "args": ["/chemin/absolu/vers/openGym/mcp/src/index.js"],
      "env": {
        "OPENGYM_DATA": "/chemin/absolu/vers/openGym/data"
      }
    }
  }
}
```

Si ton serveur a plusieurs profils, ajoute aussi `OPENGYM_UID` avec l'identifiant du profil, que tu trouves dans `./data/db.json`. Avec un seul profil, il est détecté tout seul. Redémarre le client : les outils openGym apparaissent.

Dix outils lisent tes données : routines, plan de la semaine, séances, poids, 1RM estimé, équilibre musculaire, programmes. Pose ensuite tes questions normalement :

```text
Quel est mon 1RM estimé au développé couché, et comment évolue-t-il ?
```

```text
Quels muscles ai-je négligés ce mois-ci ?
```

```text
Qu'est-ce que je vais vraiment faire à ma prochaine séance Push ? Utilise
preview_session plutôt que de lire seulement la routine.
```

La différence compte : la routine contient ce qui est prévu, `preview_session` montre ce que l'application affichera réellement après sa règle de progression et ton historique.

## 4. Lui dicter une séance

Un onzième outil, `log_workout`, écrit dans ton historique. Il est désactivé tant que tu ne l'as pas associé à ton serveur. Dans l'application : **Settings, Account, Pair the mobile app** donne un code à usage unique valable cinq minutes. Transforme-le en jeton :

```bash
node mcp/scripts/pair.mjs https://gym.example.com ABCD-1234
```

Ajoute ensuite `OPENGYM_URL` et `OPENGYM_TOKEN` dans le bloc `env` de la configuration ci-dessus. Tu peux alors dire :

```text
Note ma séance du jour : curl haltères 12 kg, trois séries de 12 sauf la dernière
à 10, puis gainage 3 fois 60 secondes.
```

L'outil rapproche les noms d'exercices de la bibliothèque, te montre ce qu'il a retenu, et ne choisit pas entre deux exercices proches : il te pose la question.

Deux précautions :

- Le jeton est une connexion complète à ton profil, pas une clé réservée aux séances. Il est écrit en clair dans le fichier de configuration : traite-le comme un mot de passe. Pour le révoquer, utilise « Sign out everywhere » dans les réglages.
- `OPENGYM_URL` doit être en `https://` (le `http://` n'est accepté que vers `localhost`).

## 5. S'en inspirer pour tes propres projets

Le dépôt montre une façon de travailler avec Claude Code : un `CLAUDE.md` qui donne le contexte, la logique d'entraînement écrite en fonctions pures avec des tests à côté, et des tests lancés à chaque proposition de modification. Tu peux demander à Claude de t'en faire le résumé :

```text
Lis le CLAUDE.md et le dossier de tests du dépôt openGym. Résume-moi comment le
projet organise le contexte donné à Claude Code et comment les tests protègent la
logique. Dis-moi ce que je peux reprendre pour mon propre projet.
```

## À savoir avant de l'utiliser

- **Licence AGPL-3.0.** Tu peux l'héberger, l'utiliser, le modifier et le partager. Si tu fais tourner une version modifiée comme un service accessible en réseau, tu dois en publier le code sous la même licence.
- **Les images d'exercices ne sont pas sous cette licence.** Les photos et animations appartiennent à Aliaksandr Makatserchyk (Gym visual) et ne sont autorisées que dans openGym. Un fork non commercial peut les garder sans modification et avec la mention. Pour tout autre usage, il faut ta propre licence auprès de gymvisual.com.
- **Le serveur MCP est facultatif et local.** Il ne fait pas partie de l'image Docker.
- **Le projet évolue vite.** Une version sort environ toutes les une à deux semaines : relis le guide d'auto-hébergement du dépôt avant de mettre à jour.

Source : [github.com/DuarteSantos8/openGym](https://github.com/DuarteSantos8/openGym)
