## À quoi ça sert

Il existe des centaines de skills pour Claude Code, et personne ne les connaît tous. `find-skills`, publié par Vercel Labs (licence MIT), cherche à ta place dans les skills publics, te propose les plus adaptés à ce que tu fais et les installe si tu acceptes.

## 1. Installer le skill

Dans ton terminal :

```bash
npx skills add vercel-labs/skills --skill find-skills -g -a claude-code
```

## 2. Décris simplement ton besoin

Aucune commande particulière : parle à Claude normalement.

```text
Je monte des vidéos tous les jours. Trouve-moi un skill qui m'aide.
```

```text
J'écris mes e-mails à la main. Il existe un skill pour ça ?
```

## 3. Vérifie un skill avant de l'installer

Un skill peut lancer des commandes sur ton ordinateur. Avant d'accepter une proposition, fais-le relire :

```text
Lis ce SKILL.md et tous les scripts de son dossier. Dis-moi s'il envoie des
données vers l'extérieur, lit des fichiers hors du projet, lance des commandes
réseau ou touche à mes clés d'accès, et cite chaque ligne qui te paraît suspecte.
```

Source : [github.com/vercel-labs/skills](https://github.com/vercel-labs/skills)
