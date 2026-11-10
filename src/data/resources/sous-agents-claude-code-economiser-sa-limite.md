## Le problème

Quand Claude Code délègue une tâche à un sous-agent (chercher un fichier, lire un journal, lancer des tests), ce sous-agent consomme ta limite d'utilisation comme le reste. Par défaut, trois réglages le rendent plus coûteux que nécessaire. La documentation officielle explique comment les ajuster.

## 1. Mesure ton point de départ

Avant de changer quoi que ce soit, tape cette commande dans Claude Code et note ce qu'elle affiche sur ta consommation :

```text
/usage
```

Tu compareras dans quelques jours.

## 2. Les trois réglages qui comptent

### Un agent Explore sur un modèle léger

L'agent intégré Explore, celui qui fouille ton code, tourne sur le modèle de ta conversation. Si tu crées toi-même un agent nommé `Explore` dans `~/.claude/agents`, il remplace celui d'origine et garde son propre modèle. Mets-le sur Haiku :

```yaml
model: haiku
```

### Ne pas recharger tous tes CLAUDE.md

Au démarrage, un sous-agent charge tes fichiers `CLAUDE.md`. Pour un agent qui trouve tout ce qu'il lui faut dans la consigne qu'on lui donne, ajoute ce champ dans son en-tête :

```yaml
omitClaudeMd: true
```

Ce champ demande Claude Code v2.1.271 ou une version plus récente.

### Un niveau d'effort adapté

Sans réglage, un sous-agent qui utilise le même modèle que ta conversation reprend ton niveau d'effort (`/effort`). Si tu travailles en effort élevé, il lit un simple journal en effort élevé. Pour les petites tâches :

```yaml
effort: low
```

## 3. Le prompt qui fait le travail à ta place

Ouvre Claude Code dans ton projet et colle ce prompt. Il propose un plan avant de modifier le moindre fichier.

```text
Appuie-toi sur la documentation officielle des sous-agents de Claude Code
(https://code.claude.com/docs/en/sub-agents) pour réduire ce que mes sous-agents
consomment sur ma limite. Ne modifie rien avant que je valide ton plan.

1. Prépare un agent Explore dans ~/.claude/agents qui remplace celui d'origine :
   model: haiku, effort: low, omitClaudeMd: true, outils limités à Read, Grep et Glob.
   Son rôle : lecture seule, trouver des fichiers, chercher dans le code, et ne me
   rendre que ses conclusions.
2. Passe en revue mes sous-agents, dans ~/.claude/agents et dans .claude/agents de
   ce projet (ignore cette étape s'il n'y en a pas). Pour chacun :
   - s'il peut travailler avec la seule consigne reçue, ajoute omitClaudeMd: true ;
   - s'il fait des tâches simples (chercher, lire des journaux, lancer des tests),
     propose effort: low et model: haiku quand Haiku suffit.
3. Présente le plan dans un tableau : nom de l'agent, réglages actuels,
   changements proposés, raison.
4. Rappelle-moi de noter le résultat de /usage avant d'appliquer, puis de le
   relancer dans deux jours pour comparer.
```

## 4. Relis le tableau avant de dire oui

Garde ton modèle principal pour les agents qui écrivent du code ou prennent des décisions. Passe sur Haiku, avec un effort bas, ceux qui cherchent, lisent ou lancent des commandes. Réponds « ok » quand le tableau te convient.

## 5. Compare

Deux jours plus tard, relance `/usage` et compare avec le chiffre de départ.

Source : [documentation officielle des sous-agents](https://code.claude.com/docs/en/sub-agents)
