## À quoi ça sert

Un skill est un petit fichier d'instructions que ton agent IA ne lit que quand il en a besoin. awesome-gamedev-agent-skills, créé par Abhishek Barali (licence Apache-2.0), en rassemble **79** pour faire des jeux vidéo, et y ajoute un **routeur** : tu décris ce que tu construis, et l'agent charge les deux ou trois skills qui conviennent avant d'écrire du code.

Pourquoi c'est utile : un agent qui connaît mal un moteur invente des fonctions qui n'existent pas ou mélange les versions. Ici, chaque skill est écrit à partir de la documentation officielle du moteur et calé sur une version précise (par exemple Godot 4.7, Unity 6.3 LTS, Unreal 5.8, Phaser 4.2, three.js r187, vérifiées par l'auteur le 11 novembre 2026).

## Ce que le routeur fait

Tu n'écris jamais le nom d'un skill. À chaque demande, le routeur :

1. **Détecte ton moteur** dans les fichiers du projet : un `project.godot` veut dire Godot, un `.uproject` veut dire Unreal. S'il ne peut pas deviner, il te demande.
2. **Lit ce que tu veux faire** : un concept (IA, shaders, sauvegarde), un genre (plateformer, roguelike) ou une étape (game jam, publication sur Steam).
3. **Charge seulement ce qui correspond** : d'abord les bases du moteur, puis le concept, puis le genre.

Quelques exemples du dépôt :

| Tu dis | Skills chargés |
|---|---|
| « ajoute un double saut à mon joueur Godot » | `godot-2d-movement` et `platformer` |
| « fais un inventaire pour mon RPG Unity » | `unity-scriptableobjects`, `rpg` et `save-systems` |
| « un puzzle 2D en Go avec Ebitengine » | `ebitengine-game` et `puzzle` |
| « publie mon jeu sur itch avec butler » | `itch-publish` |

## Ce qu'il couvre

12 moteurs : Godot, Unity, Unreal, Ebitengine, Phaser, PixiJS, three.js, Bevy, pygame, LÖVE, Defold et Roblox. Les 79 skills se répartissent ainsi :

| Catégorie | Nombre | Exemples |
|---|---:|---|
| Moteurs | 50 | Godot (16), Unity (9), Unreal (6), Roblox (8), web (6), Bevy, pygame, LÖVE, Defold |
| Disciplines | 15 | IA des ennemis, génération procédurale, dialogues, sauvegardes, sons, shaders, caméra |
| Genres | 9 | Plateformer, roguelike, RPG, jeu de cartes, tower defense, puzzle |
| Workflows | 5 | Game jam, prototype rapide, publication Steam, publication itch.io, documentation de jeu |

Il y a aussi un workflow de direction artistique pour les images du jeu : il fixe une cible visuelle, fabrique des familles d'éléments cohérents, normalise les fichiers et les vérifie dans le jeu.

## 1. Installer

Il faut Node.js 22.20 ou plus. La commande détecte l'agent que tu utilises (Claude Code, Cursor, Codex, Gemini CLI et d'autres) et installe le routeur avec les 79 skills au bon endroit :

```bash
npx skills add gamedev-skills/awesome-gamedev-agent-skills
```

Ajoute `--list` pour prévisualiser d'abord, `-g` pour installer pour tous tes projets, ou `-a claude-code` pour cibler Claude Code.

Le dépôt est aussi une place de plugins pour Claude Code, ce qui permet de passer par ses commandes :

```bash
claude plugin marketplace add gamedev-skills/awesome-gamedev-agent-skills
claude plugin install gamedev@awesome-gamedev-agent-skills
```

## 2. N'installer que ce qu'il te faut

Si tu travailles dans un seul moteur, installe le routeur et le lot de ton moteur plutôt que tout :

```bash
claude plugin install router@awesome-gamedev-agent-skills
claude plugin install godot@awesome-gamedev-agent-skills
```

Les lots existent pour `godot`, `unity`, `unreal`, `ebitengine`, `web-engines` et `other-engines`.

L'auteur donne une raison pratique : un agent affiche la description de chaque skill dans une limite de taille, et au-delà certaines descriptions sont tronquées, ce qui rend le bon skill plus difficile à choisir. Dans Claude Code, cette limite est de 1 % de la fenêtre de contexte. Tu peux la relever avec le réglage `skillListingBudgetFraction` (par exemple `0.02`) ou la variable d'environnement `SLASH_COMMAND_TOOL_CHAR_BUDGET`.

## 3. Lui parler

Une fois installé, décris ton besoin normalement :

```text
Ajoute un double saut à mon joueur. Dis-moi quel moteur et quels skills tu as
chargés avant de modifier le code.
```

```text
Fais-moi un prototype jetable de ce jeu pour tester une seule question : est-ce
que la mécanique principale est amusante ? Garde le tout minimal.
```

## Ce que l'auteur affirme, et ses limites

L'auteur indique que les exemples de code ont été exécutés ou compilés sur les vrais outils de 10 des 12 moteurs, et que sur 366 requêtes de test faites à l'aveugle, le bon skill s'est chargé dans 98,7 % des cas qui en demandaient un. Ce sont ses propres mesures : la méthode et les limites sont décrites dans le dossier `evals` du dépôt. Teste sur ton projet avant de lui faire confiance pour un gros chantier.

## Avant d'installer

- **Un skill est une consigne que ton agent suit.** Il peut inclure des scripts qui s'exécutent sur ta machine. Fais relire un skill avant de l'installer, comme pour n'importe quel code extérieur, avec la commande `--list` pour voir ce qui sera ajouté.
- **Les versions bougent vite.** Les moteurs sortent des versions plusieurs fois par an. Vérifie la date de la dernière vérification dans le fichier de support des versions du dépôt, et dis à ton agent quelle version tu utilises.
- **Les sponsors sont annoncés.** Le dépôt affiche des sponsors, et précise qu'ils n'ont aucun effet sur le choix des skills par le routeur.

Source : [github.com/gamedev-skills/awesome-gamedev-agent-skills](https://github.com/gamedev-skills/awesome-gamedev-agent-skills)
