## À quoi ça sert

Claude Code a une limite d'usage. Quand elle approche, ou quand tu veux un second avis venu d'un autre modèle, tu peux déléguer une partie du travail à Antigravity CLI (`agy`), qui utilise un modèle Gemini avec son propre quota. Claude Code reste le chef d'orchestre : il écrit et conçoit, `agy` relit, exécute ou travaille en parallèle.

J'ai construit ce système pour mon usage et je le publie dans le kit public, sous licence MIT. Il se compose de trois pièces :

- un **skill** `orchestrator`, qui dit à Claude Code quand et comment déléguer ;
- un **runner** (`antigravity-runner`), qui lance `agy` et rend un résultat JSON propre ;
- une **synchronisation**, qui copie ta configuration Claude Code (règles, agents, skills, serveurs MCP) vers Antigravity.

## Ce qu'il te faut avant

- Claude Code, avec un fichier `~/.claude/CLAUDE.md` (la synchronisation le lit).
- [Bun](https://bun.sh), pour lancer les scripts.
- Antigravity CLI installé et connecté. Vérifie que cette commande répond :

```bash
agy --version
```

Je l'utilise avec Bun 1.4.3 et `agy` 1.5.2, sur macOS. J'ai aussi rejoué les étapes d'installation de ce guide dans un dossier personnel vierge, sans appel réel à `agy`. Le hook de validation de commandes et le son de fin sont des options : ils ne s'installent que si leurs fichiers existent.

## 1. Récupérer le kit

```bash
git clone https://github.com/Zoubeir23/claude-code-kit.git
cd claude-code-kit/orchestrator
```

## 2. Installer

```bash
mkdir -p ~/.claude/bin ~/.claude/scripts ~/.claude/skills
cp bin/antigravity-runner ~/.claude/bin/ && chmod +x ~/.claude/bin/antigravity-runner
cp -R scripts/mesh scripts/antigravity-sync ~/.claude/scripts/
cp -R skills/orchestrator ~/.claude/skills/
```

Vérifie que le runner répond :

```bash
~/.claude/bin/antigravity-runner
```

Il doit afficher un JSON avec `"status": "invalid_arguments"` et le mode d'emploi. C'est normal : tu ne lui as rien demandé.

## 3. Synchroniser ta configuration vers Antigravity

```bash
bun ~/.claude/scripts/antigravity-sync/src/cli.ts
```

Redémarre ensuite `agy`. Avant de lancer la commande, sache ce qu'elle écrit :

| Source dans `~/.claude` | Destination dans `~/.gemini` |
|---|---|
| `CLAUDE.md` et `rules/common/` | `GEMINI.md` |
| `agents/` | `config/agents/` |
| `skills/` et `commands/` | `config/skills/` |
| Serveurs MCP de `~/.claude.json` | `config/mcp_config.json` |
| Permissions de Claude Code | `antigravity-cli/settings.json` |

**Point de vigilance.** Les serveurs MCP sont copiés avec leurs variables d'environnement, donc avec les clés d'API qu'elles contiennent. Le fichier est créé en mode 600. Ne le versionne jamais, et ne partage jamais le dossier `~/.gemini`.

Autre limite : Antigravity abandonne les skills quand la taille totale de leurs descriptions dépasse son budget. La synchronisation raccourcit les descriptions à 100 caractères pour en garder le plus possible.

## 4. Les trois modes

`agy` ne voit pas ta conversation. Chaque appel doit donc se suffire à lui-même : objectif, fichiers concernés, critères de réussite, commandes de vérification.

| Mode | Lit le dossier | Écrit dans le dossier | Quand |
|---|---|---|---|
| `review` | oui | **non** | Un autre modèle relit du code que Claude vient d'écrire |
| `execute` | oui | oui, dans le dossier courant seulement | Un build, une migration ou un long pipeline libèrent ton contexte |
| `worker` | oui | oui, dans le dossier courant seulement | Jusqu'à 6 sous-tâches indépendantes lancées en parallèle |

Exemples d'appels :

```bash
~/.claude/bin/antigravity-runner --mode review --prompt "Relis le diff de src/auth et cherche les failles de sécurité"
```

```bash
~/.claude/bin/antigravity-runner --mode execute --prompt-file plan.md --timeout 900
```

```bash
~/.claude/bin/antigravity-runner --mode worker --tasks-file tasks.json
```

Le fichier `tasks.json` est une liste de textes, un par sous-tâche :

```json
["Écris les tests de la fonction A", "Mets à jour la documentation de l'API"]
```

Chaque appel coûte environ 30 000 tokens d'entrée côté `agy`. Regroupe plutôt que de multiplier les appels.

## 5. Lire le résultat

Le runner écrit un JSON sur la sortie standard. Le champ `status` prend l'une de ces valeurs :

| `status` | Sens |
|---|---|
| `success` | Lis `response`, puis fais valider |
| `error` | Lis `errorMessage` et `deniedActions` |
| `timeout` | Découpe la tâche et relance en `worker` |
| `recursion_blocked` | Tu es déjà dans un appel orchestré : arrête |
| `not_found` | `agy` n'est pas installé |
| `invalid_arguments` | Mauvais arguments |

Le runner corrige un défaut d'`agy` : en mode non interactif, `agy` annonce un succès même quand une permission a été refusée. Le runner transforme alors le résultat en `error`.

Chaque appel est journalisé dans `~/.claude/mesh/logs/` (200 derniers appels, secrets masqués, droits 600).

## 6. Le protocole de relais

Quand tu demandes l'orchestration, Claude suit quatre étapes :

1. **Cadrer.** Il reformule l'objectif en une phrase avec 2 à 5 critères de réussite vérifiables.
2. **Concevoir et écrire.** Un sous-agent producteur (planner, tdd-guide, un agent de langage) rédige le code et liste les fichiers modifiés.
3. **Exécuter.** Claude écrit un prompt autonome et le confie à `agy` en mode `execute` ou `worker`.
4. **Valider.** Un sous-agent relecteur contrôle le `git diff` réel, pas seulement ce qu'`agy` raconte. Verdict : APPROVE, WARNING ou BLOCK. Sur un blocage critique ou important, Claude corrige et relance, au plus deux fois.

Pour un second avis d'un autre modèle, le mode `review` s'ajoute au relecteur Claude. Si les deux verdicts divergent, Claude te présente les deux sans trancher à ta place.

## 7. Déclencher l'orchestration

Le skill ne s'active jamais seul. Demande-le explicitement :

```text
Orchestre cette tâche : implémente la pagination de l'API, fais exécuter les tests par agy, puis relis le résultat.
```

```text
Fais relire par agy le code que tu viens d'écrire.
```

```text
Mon quota Claude est presque épuisé : délègue la migration à agy.
```

## 8. Garde-fous

- **Pas de récursion.** Un appel dans un appel est refusé (`recursion_blocked`), et le skill n'est jamais copié vers `agy`.
- **Pas de commit ni de push.** Les règles Git de ton `CLAUDE.md` restent prioritaires.
- **Aucun secret dans un prompt.** Les journaux sont masqués, mais le prompt part chez le fournisseur du modèle.
- **Permissions.** `agy` n'exécute que les commandes d'une liste autorisée, définie dans `antigravity-sync/src/lib/sync_permissions.ts`. N'utilise jamais `--dangerously-skip-permissions`.
- **Une commande refusée.** Si un appel échoue avec « headless mode cannot prompt », la commande n'est pas dans la liste. Ajoute-la toi-même après l'avoir relue.

Source : [github.com/Zoubeir23/claude-code-kit](https://github.com/Zoubeir23/claude-code-kit), dossier `orchestrator`.
