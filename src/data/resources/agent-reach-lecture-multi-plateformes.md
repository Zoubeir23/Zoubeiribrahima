## À quoi ça sert

Agent Reach, publié par Panniantong sous licence MIT, donne à ton agent (Claude Code, Codex) une seule commande pour chercher et lire du contenu sur 14 plateformes : GitHub, le web, YouTube, Reddit, X, LinkedIn, Instagram, Facebook, ainsi que plusieurs plateformes chinoises. Les fonctions listées sont des recherches et des lectures.

## 1. Ce que ton agent peut faire

- **GitHub** : chercher des dépôts, lire un README, lire une issue ou une pull request avec ses commentaires. Sans connexion.
- **Le web** : chercher et lire une page en texte propre. Sans connexion.
- **YouTube** : informations, recherche, sous-titres.
- **Reddit** : chercher des fils, lire un message et ses commentaires. Connexion requise.
- **X** : chercher des messages, lire un fil. Connexion requise, canal expérimental.
- **LinkedIn** : chercher et lire des offres d'emploi. Les offres publiques sont lisibles sans connexion.
- **Instagram et Facebook** : profils et publications. Connexion requise, canaux expérimentaux qui peuvent cesser de fonctionner.

## 2. L'installer

Colle cette phrase dans Claude Code ou Codex :

```text
Installe Agent Reach en suivant https://raw.githubusercontent.com/Panniantong/Agent-Reach/main/docs/install.md
```

L'agent installe les outils nécessaires et te montre ce qui fonctionne déjà. S'il dit ne pas pouvoir lancer de commande, autorise l'exécution de commandes dans ses réglages, puis redemande.

**Attention** : le paquet PyPI nommé `agent-reach` n'est pas ce projet. N'installe que depuis le lien GitHub ci-dessus.

## 3. Ajouter une plateforme

GitHub et le web fonctionnent tout de suite. Pour le reste, demande-le simplement :

```text
Ajoute Reddit à Agent Reach.
```

## 4. Les plateformes qui demandent une connexion

Pour ces plateformes, Agent Reach utilise son propre navigateur. La première fois, il reprend ta session Chrome pour ce site uniquement ; ton navigateur reste tel quel et il ne lit pas tes mots de passe.

Utilise un compte secondaire. Une plateforme peut restreindre un compte utilisé par un agent, et les conditions d'utilisation de plusieurs d'entre elles interdisent la lecture automatisée. À toi de vérifier celles des plateformes que tu actives.

## 5. L'utiliser au quotidien

```text
Lis l'issue https://github.com/... en entier et résume les solutions proposées.
```

```text
Cherche sur Reddit ce que les développeurs pensent de Claude Code et résume les dix fils les plus utiles.
```

Pour l'entretien, une phrase suffit : « Montre l'état d'Agent Reach », « Mets à jour Agent Reach », « Retire Instagram d'Agent Reach ».

Source : [github.com/Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach)
