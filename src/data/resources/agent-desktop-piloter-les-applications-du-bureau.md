## À quoi ça sert

Certaines tâches ne se font que dans une application de bureau : un logiciel sans API, un menu à cliquer, un formulaire à remplir dans une fenêtre. agent-desktop, publié par Vercel Labs (licence Apache-2.0), donne à ton agent IA la capacité de voir et de manipuler ces applications sur Mac, Windows et Linux.

Sa particularité : il n'utilise ni captures d'écran ni reconnaissance de pixels. Il lit l'**arbre d'accessibilité** de l'application, c'est-à-dire la description structurée que le système donne aux lecteurs d'écran, et la renvoie en JSON. Chaque élément sur lequel l'agent peut agir reçoit une référence. L'agent clique ou écrit sur une référence, relit l'interface pour vérifier le résultat, et recommence. La boucle vit dans ton agent : agent-desktop n'a pas de modèle d'IA à l'intérieur. Il s'utilise en ligne de commande ou comme bibliothèque C.

## 1. Installer

```bash
npm install -g agent-desktop
agent-desktop status
agent-desktop permissions --guide
```

`status` indique ta plateforme, les autorisations et ce qui est pris en charge. Sur Mac, `permissions --guide` te guide pour accorder l'autorisation **Accessibilité** à l'outil : sans elle, il ne peut rien lire. Homebrew fonctionne aussi sur Mac et Linux (`brew install agent-desktop`).

Les systèmes pris en charge :

| Système | Version minimale | API utilisée |
|---|---|---|
| macOS | 13, Intel ou Apple Silicon | AX API |
| Windows | 10 (1809), x64 ou ARM64 | UI Automation |
| Linux | Ubuntu 24.04, X11 ou Wayland | AT-SPI |

## 2. Premier essai

Observe le Finder, agis sur un élément, puis observe de nouveau pour vérifier :

```bash
agent-desktop snapshot --app Finder -i
agent-desktop click @s8f3k2p9:e8
agent-desktop snapshot --app Finder -i
```

La référence `@s8f3k2p9:e8` vient de la première observation : remplace-la par une de celles que ta commande affiche. Chaque commande renvoie une enveloppe JSON. Trois règles à retenir :

- **Une référence appartient à son observation.** Une référence nue comme `@e8` est refusée. Si l'interface a changé, l'action renvoie `STALE_REF` ou `AMBIGUOUS_TARGET` : refais une observation et utilise ses références.
- **Plusieurs fenêtres ouvertes** donnent `AMBIGUOUS_TARGET`. La réponse liste les fenêtres candidates, et tu en choisis une avec `--window-id`.
- **Sans écran à déplacer.** Par défaut, les actions passent par l'API d'accessibilité sans bouger le pointeur ni prendre le focus. L'option `--headed` autorise la saisie physique.

Sur PowerShell, mets chaque référence entre guillemets simples, car `@` y a un autre sens.

## 3. Brancher ton agent

**Avec le skill.** L'outil embarque des guides qui correspondent à sa version, et un skill pour ton agent :

```bash
agent-desktop skills get desktop
agent-desktop skills get platform
npx skills add https://github.com/vercel-labs/agent-desktop --skill agent-desktop
```

Le premier explique la boucle, les références, la vérification et les règles de nouvel essai. Le deuxième décrit ce qui change selon ton système. Tu peux aussi ajouter ceci à ton fichier `AGENTS.md` :

```markdown
Utilise `agent-desktop` pour voir et manipuler les applications du bureau. Avant la
première utilisation, lance `agent-desktop skills get desktop` et
`agent-desktop skills get platform`, et suis-les.
```

**Avec MCP.** La commande `agent-desktop mcp` expose chaque commande comme un outil MCP, par exemple `desktop_snapshot` ou `desktop_click`. Pour Claude Code :

```bash
claude mcp add --scope user agent-desktop -- agent-desktop mcp
```

Ou, dans un fichier de configuration MCP :

```json
{ "mcpServers": { "agent-desktop": { "command": "agent-desktop", "args": ["mcp"] } } }
```

L'outil a 61 noms de commandes, dont 57 sont opérationnelles. Elles se rangent en groupes : observer (`snapshot`, `find`, `screenshot`), agir sur une référence (`click`, `type`, `select`, `scroll`), clavier et souris, applications et fenêtres, notifications, presse-papiers, attente, sessions et bacs à sable. La liste complète est dans la documentation.

## 4. Donner ses consignes à l'agent

Un agent qui contrôle ton bureau peut faire beaucoup de choses, y compris des choses qu'on ne rattrape pas. Dis-lui dès le début ce qu'il a le droit de faire :

```text
Utilise agent-desktop pour ranger mon dossier Téléchargements dans le Finder.
Avant chaque action qui supprime, déplace ou envoie quelque chose, décris-la et
attends ma confirmation. Ne touche à aucune autre application.
```

```text
Lis l'écran de l'application "Notes" avec agent-desktop et résume son contenu.
Ne modifie rien.
```

## Précautions

- **Les données privées traversent l'outil.** Les observations, le presse-papiers, les captures d'écran, la sortie des commandes et les fichiers de débogage peuvent contenir du contenu privé de ton bureau. Ne les mets ni dans des journaux publics ni dans des envois publics.
- **Les secrets.** Les commandes `type`, `set-value` et `clipboard-set` acceptent `--stdin` pour recevoir un texte par un tube, ce qui le garde hors des arguments du processus. Lance les étapes qui contiennent un secret dans des commandes séparées, car le texte d'un lot JSON apparaît dans les arguments.
- **Commence petit.** Mon conseil, pas celui du dépôt : essaie d'abord sur un compte de test ou une machine virtuelle, avec une application sans danger, avant de lui laisser ton vrai bureau. Une commande `sandbox` existe : lis sa documentation.
- **Rejoue seulement ce qui est sûr.** Ne relance une commande échouée que si `error.disposition.retry` vaut `safe`.
- **L'outil évolue vite.** La dernière version, la 1.3.0, date du 12 novembre 2026. Vérifie `agent-desktop --help` et la documentation avant de t'appuyer sur un détail de ce guide.

Source : [github.com/vercel-labs/agent-desktop](https://github.com/vercel-labs/agent-desktop)
