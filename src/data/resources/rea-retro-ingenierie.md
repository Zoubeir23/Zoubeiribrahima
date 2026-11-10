## À quoi ça sert

REA (Reverse Engineer Anything), publié par morluto sous licence MIT, est un serveur MCP de rétro-ingénierie. Tu vois une fonctionnalité qui te plaît dans une application : tu demandes à ton agent comment elle est construite, et REA va chercher les preuves dans l'application elle-même (binaires, code JavaScript, comportement à l'exécution) pour que tu écrives ta propre version.

## 1. Installer REA

Avec Node.js et npm installés :

```bash
npx rea-agents setup
```

Choisis Claude Code dans la liste, puis redémarre Claude Code.

## 2. Analyser une application

Donne à ton agent l'application à étudier et la fonctionnalité qui t'intéresse :

```text
Avec REA, explique-moi comment cette application construit la fonctionnalité
de recherche instantanée, preuves à l'appui, pour que je code ma propre version.
```

L'analyse statique d'une application JavaScript ne demande aucun outil supplémentaire. L'analyse de binaires natifs peut s'appuyer sur un outil déjà installé (Hopper, Ghidra, IDA).

## Dans les règles

Étudie une application pour comprendre et t'inspirer, puis écris ton propre code. Les conditions d'utilisation de certains logiciels interdisent la rétro-ingénierie, et le code d'autrui reste protégé : vérifie avant d'analyser un produit commercial.

Source : [github.com/morluto/rea](https://github.com/morluto/rea)
