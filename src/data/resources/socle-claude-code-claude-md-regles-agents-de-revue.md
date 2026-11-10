## À quoi ça sert

Claude Code est un excellent exécutant, mais il repart de zéro à chaque session. Trois éléments lui donnent de la mémoire et de la rigueur :

- un fichier **`CLAUDE.md`** qu'il relit au début de chaque session : tes règles de travail ;
- des **règles** découpées par thème et par langage, chargées au bon moment ;
- des **agents de revue**, des relecteurs spécialisés qu'il appelle après avoir écrit du code.

C'est le socle de ma propre configuration, publié dans le kit sous licence MIT. Tu peux le prendre tel quel ou t'en servir comme point de départ.

## D'où vient chaque pièce

- Le modèle de `CLAUDE.md` est de moi.
- Les 18 agents et les règles de codage sont adaptés du projet ECC d'Affaan Mustafa (licence MIT, [github.com/affaan-m/ECC](https://github.com/affaan-m/ECC)). Je les ai modifiés pour mon usage, et le fichier `NOTICE.md` du kit conserve l'attribution.

## 1. Récupérer le kit

```bash
git clone https://github.com/Zoubeir23/claude-code-kit.git
cd claude-code-kit
```

## 2. Installer le CLAUDE.md

Si tu n'as pas encore de `~/.claude/CLAUDE.md`, copie le modèle :

```bash
mkdir -p ~/.claude
cp config/CLAUDE.md ~/.claude/CLAUDE.md
```

Si tu en as déjà un, ne l'écrase pas : copie le modèle sous un autre nom, puis reprends ce qui t'intéresse.

```bash
cp config/CLAUDE.md ~/.claude/CLAUDE.modele.md
```

Le modèle contient six blocs :

1. **Workflow Git.** Toujours revenir sur `main`, récupérer les derniers commits, puis créer une branche par tâche. Jamais de code directement sur une branche existante.
2. **Commits.** Un changement logique par commit, fait au fil du travail et non en bloc à la fin.
3. **Avant de coder.** Lire le code existant, repérer les conventions, planifier toute tâche de trois étapes ou plus.
4. **Vérification avant de finir.** Le code tourne, les logs sont propres, les cas limites sont gérés.
5. **Correction de bugs.** Reproduire, lire les logs, trouver la cause racine, corriger à la source.
6. **Renvoi vers les règles détaillées.**

Un `CLAUDE.md` court est plus respecté qu'un long. Ajoute une règle seulement quand Claude a commis l'erreur que cette règle évite.

## 3. Installer les règles

```bash
mkdir -p ~/.claude/rules
cp -R config/rules/* ~/.claude/rules/
```

Le dossier contient `common/` (10 fichiers) et un dossier par langage : `cpp`, `csharp`, `golang`, `java`, `kotlin`, `perl`, `php`, `python`, `rust`, `swift`, `typescript`.

Les règles communes :

| Fichier | Ce qu'il impose |
|---|---|
| `coding-style.md` | Ne pas modifier les objets en place, petits fichiers, erreurs gérées explicitement, entrées validées, noms complets sans abréviation |
| `testing.md` | 80 % de couverture minimum, tests unitaires, d'intégration et E2E, test écrit avant le code |
| `security.md` | Liste de contrôle avant chaque commit : aucun secret dans le code, entrées validées, requêtes paramétrées |
| `code-review.md` | Quand relire, liste de contrôle, niveaux de gravité |
| `git-workflow.md` | Format des messages de commit, déroulé d'une pull request |
| `development-workflow.md` | Recherche, plan, tests, relecture, commit : l'ordre du travail |
| `agents.md` | Quel agent appeler dans quel cas, et lancer en parallèle ce qui est indépendant |
| `performance.md`, `patterns.md`, `hooks.md` | Choix du modèle, gestion du contexte, motifs de conception courants |

Chaque règle de langage commence par un en-tête `paths` (par exemple `**/*.py` pour Python). Elle n'est donc chargée que lorsque Claude travaille sur un fichier de ce type, ce qui évite d'encombrer son contexte.

### Les règles qui sont mes préférences

Certaines règles reflètent mes choix, pas des vérités universelles. Relis-les avant de les garder :

- **Noms sans abréviation**, dans `coding-style.md` et dans chaque règle de langage.
- **Jusqu'à 30 commits atomiques par tâche** quand sa taille le permet, dans `git-workflow.md`. C'est un choix de méthode de travail, à retirer si tu ne le partages pas.
- **Message de commit** : `rules/common/git-workflow.md` utilise `<type>: <description>`. Le modèle de `CLAUDE.md` mentionne mon format personnel `<code>-titre-court`. Choisis-en un et supprime l'autre.

## 4. Installer les agents de revue

```bash
mkdir -p ~/.claude/agents
cp review/agents/*.md ~/.claude/agents/
```

Les 18 agents :

| Rôle | Agents |
|---|---|
| Préparer | `planner` (plan d'une fonctionnalité complexe), `architect` (décision d'architecture) |
| Écrire avec des tests | `tdd-guide` |
| Relire | `code-reviewer`, `security-reviewer`, `database-reviewer` |
| Relire par langage | `typescript-reviewer`, `python-reviewer`, `go-reviewer`, `rust-reviewer`, `java-reviewer`, `kotlin-reviewer`, `cpp-reviewer`, `flutter-reviewer` |
| Réparer et nettoyer | `build-error-resolver`, `refactor-cleaner` |
| Tester et documenter | `e2e-runner`, `doc-updater` |

Redémarre Claude Code pour qu'il les charge.

## 5. Comment ils s'enchaînent

Les règles `agents.md`, `code-review.md` et `performance.md` fixent le déroulé :

1. Une fonctionnalité complexe : `planner` d'abord.
2. Une fonctionnalité ou un correctif : `tdd-guide`, avec le test avant le code.
3. Le code vient d'être écrit : `code-reviewer`, puis le relecteur du langage.
4. Le code touche à l'authentification, à des entrées utilisateur, à des paiements ou à des requêtes SQL : `security-reviewer`, avant le commit.
5. Le build casse : `build-error-resolver`.

Un relecteur classe ses constats en quatre niveaux, et la règle dit quoi faire de chacun :

| Niveau | Sens | Action |
|---|---|---|
| CRITICAL | Faille de sécurité ou risque de perte de données | Bloquer, corriger avant de fusionner |
| HIGH | Bug ou problème de qualité important | Avertir, corriger de préférence |
| MEDIUM | Problème de maintenabilité | Information |
| LOW | Style ou suggestion | Optionnel |

## 6. Essayer

Dans un projet, après une modification :

```text
Utilise code-reviewer sur mes changements, puis le relecteur du langage du projet. Résume les constats par gravité.
```

```text
Utilise security-reviewer sur ce que j'ai changé dans l'authentification.
```

```text
Utilise planner pour découper cette fonctionnalité en étapes, avec les risques, avant que j'écrive du code.
```

## 7. Adapter sans tout casser

- **Retire ce que tu n'utilises pas.** Si tu ne programmes qu'en TypeScript et Python, supprime les autres dossiers de langage de `~/.claude/rules/`.
- **Un agent est un fichier Markdown.** Ouvre-le, lis son en-tête (nom, description, outils autorisés) et modifie-le. Sa description dit à Claude quand l'appeler.
- **Teste après chaque changement.** Fais une petite modification dans un projet jetable, demande une relecture, et vérifie que l'agent répond comme prévu avant de t'y fier.

Source : [github.com/Zoubeir23/claude-code-kit](https://github.com/Zoubeir23/claude-code-kit), dossiers `config` et `review`.
