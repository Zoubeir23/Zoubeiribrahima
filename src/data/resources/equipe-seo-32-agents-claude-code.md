## À quoi ça sert

Un audit SEO complet, ce sont des dizaines de tâches différentes : vérifier l'indexation, trouver des requêtes, écrire une page, poser des liens internes, mesurer. Plutôt que de tout demander à une seule conversation, j'ai découpé le travail en 32 agents spécialisés, chacun avec une mission, ses sources de données et ses garde-fous. Un directeur choisit la prochaine action et la confie au bon agent.

Les agents sont de simples fichiers Markdown dans `~/.claude/agents/`. Tu peux tous les lire, les modifier et les adapter à ton métier. Ils sont publiés sous licence MIT dans le kit public.

## Comment ils travaillent

- **Les chiffres viennent de Search Console, pas de la mémoire du modèle.** Les agents d'audit et de reporting lisent tes données par le serveur MCP du guide précédent. Aucun chiffre sans source.
- **Ils ne publient, ne suppriment et n'envoient rien sans ton accord.** C'est un garde-fou écrit dans chaque agent.
- **Ils laissent des fichiers.** Le directeur écrit un backlog et un plan sur 90 jours dans un dossier `seo/` de ton projet, que tu relis et que tu corriges.

Limite honnête : il n'y a aucun outil payant derrière. Pour la concurrence et les mots-clés, les agents s'appuient sur tes vraies requêtes Search Console et sur la lecture de pages web. Ils n'ont pas de volumes de recherche mensuels.

## Les 8 pôles

Chaque pôle compte 4 agents.

| Pôle | Agents |
|---|---|
| Stratégie et audit | `seo-directeur`, `seo-audit-global`, `seo-concurrents`, `seo-priorisation` |
| Recherche de mots-clés | `seo-clusters`, `seo-intention`, `seo-longue-traine`, `seo-mots-cles-business` |
| Rédaction d'articles | `seo-brief`, `seo-redacteur`, `seo-relecteur-eeat`, `seo-mise-a-jour` |
| Optimisation on-page | `seo-structure-hn`, `seo-title-meta`, `seo-donnees-structurees`, `seo-images-ux` |
| Maillage interne | `seo-cartographe`, `seo-silos`, `seo-ancres`, `seo-cannibalisation` |
| Technique et indexation | `seo-crawl`, `seo-indexation`, `seo-performance`, `seo-crawlers-ia` |
| Netlinking | `seo-profil-liens`, `seo-opportunites-liens`, `seo-outreach`, `seo-relations-presse` |
| Analyse et croissance | `seo-reporting`, `seo-quick-wins`, `seo-chute-trafic`, `seo-geo-visibilite` |

## 1. Installer

Il te faut d'abord le serveur MCP Search Console du guide précédent. Ensuite, copie les agents :

```bash
git clone https://github.com/Zoubeir23/claude-code-kit.git
mkdir -p ~/.claude/agents
cp claude-code-kit/seo/agents/seo-*.md ~/.claude/agents/
ls ~/.claude/agents/seo-*.md | wc -l
```

La dernière commande doit afficher 32. Pour réserver les agents à un seul projet, copie-les plutôt dans le dossier `.claude/agents/` à la racine de ce projet.

Redémarre Claude Code pour qu'il les charge.

## 2. Lancer le directeur

Place-toi à la racine de ton site et lance :

```text
Utilise seo-directeur pour faire le point sur mon site et me proposer les 3 actions de la semaine.
```

Au premier lancement, il cherche un fichier `seo/CONTEXTE.md` (ton site, ton offre, ta cible, ta zone). S'il n'existe pas, il te pose 4 questions et le crée. Tous les agents le relisent ensuite : plus il est précis, meilleurs sont les résultats.

Le directeur lit ensuite `seo/backlog.md` et `seo/plan-90-jours.md`. S'ils manquent, il lance d'abord `seo-audit-global` puis `seo-priorisation` pour les produire. Il choisit au maximum 3 actions par semaine, classées par impact puis par effort, et les délègue.

## 3. Le rythme que je suis

D'après les descriptions de chaque agent :

| Quand | Agents |
|---|---|
| Chaque lundi | `seo-reporting`, `seo-priorisation` |
| Chaque semaine | `seo-indexation`, `seo-quick-wins` |
| Chaque mois | `seo-audit-global`, `seo-crawl`, `seo-performance`, `seo-cannibalisation`, `seo-mise-a-jour`, `seo-title-meta`, `seo-opportunites-liens`, `seo-geo-visibilite` |
| Chaque trimestre | `seo-cartographe`, `seo-profil-liens`, `seo-relations-presse` |
| Avant chaque article | `seo-brief`, puis `seo-redacteur`, puis `seo-relecteur-eeat` |
| Après une baisse de plus de 15 % | `seo-chute-trafic` |

## 4. Des demandes prêtes à copier

```text
Utilise seo-indexation pour vérifier quelles pages de mon sitemap sont indexées, et donne la correction de chacune qui ne l'est pas.
```

```text
Utilise seo-quick-wins pour trouver les requêtes en position 4 à 15 avec des impressions, et classe-les par gain possible.
```

```text
Utilise seo-brief pour préparer le brief d'un article sur [ton sujet] : plan, angle, questions à couvrir, liens internes à poser.
```

```text
Utilise seo-cannibalisation pour détecter les pages qui se battent sur la même requête, et dis-moi si je dois fusionner, rediriger ou différencier.
```

```text
Utilise seo-crawlers-ia pour vérifier que les robots de ChatGPT, Claude, Perplexity et Gemini peuvent lire mon site sans JavaScript.
```

## 5. Le fichier de style

L'agent `seo-redacteur` écrit dans le ton défini par `seo/STYLE.md`. S'il n'existe pas, il te demande 3 textes de référence et le crée. Donne-lui des textes que tu as écrits toi-même : c'est ce qui évite le ton générique d'un texte produit par l'IA.

## 6. Garde la main

Les agents proposent, tu valides. Relis chaque brief, chaque réécriture de title et chaque liste de liens avant de toucher à ton site. Un agent peut se tromper sur le contexte de ton métier, surtout si `seo/CONTEXTE.md` est vague.

Source : [github.com/Zoubeir23/claude-code-kit](https://github.com/Zoubeir23/claude-code-kit), dossier `seo/agents`.
