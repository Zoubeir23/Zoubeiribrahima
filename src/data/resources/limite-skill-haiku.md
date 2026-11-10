## À quoi ça sert

Claude Code exécute chaque tâche sur le modèle de ta session. Sur Opus, retrouver un fichier, lire un journal ou renommer un import consomme ta limite au prix fort. Le skill `limite`, publié par Melvynx dans son dépôt `shared-skills`, envoie ce travail facile vers Haiku, beaucoup moins coûteux, et garde Opus pour la planification, le débogage et les changements sur plusieurs fichiers.

## 1. Installer le skill

Pour tous tes projets :

```bash
npx skills add Melvynx/shared-skills --skill limite -g -a claude-code
```

## 2. Le lancer

```text
/limite
```

Il installe deux sous-agents sur Haiku : `Explore` pour chercher et lire dans le code, `chores` pour les modifications mécaniques et les commandes. Il ajoute aussi à ton `CLAUDE.md` une note qui leur confie les tâches simples. Si un agent du même nom existe déjà, il te montre la différence et demande avant de le remplacer.

Pour ne l'installer que dans le projet courant :

```text
/limite --project
```

## 3. Redémarrer Claude Code

Ouvre ensuite la liste des agents :

```text
/agents
```

`Explore` et `chores` doivent afficher Haiku. Ta session reste sur ton modèle principal : seul le travail délégué passe sur Haiku.

## Bon à savoir

Le dépôt `Melvynx/shared-skills` ne précise pas de licence : utilise le skill comme proposé par son auteur, sans en redistribuer le contenu. Pour régler tes sous-agents toi-même, vois aussi la ressource sur les réglages des sous-agents.

Source : [github.com/Melvynx/shared-skills](https://github.com/Melvynx/shared-skills/tree/main/skills/limite)
