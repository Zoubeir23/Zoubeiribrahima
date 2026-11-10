## À quoi ça sert

Claude SEO transforme Claude Code en auditeur de référencement. Tu lui donnes l'adresse de ton site, il passe en revue la technique, le contenu, le sitemap, la visibilité dans les moteurs de recherche IA, et te rend une liste d'actions triées par priorité.

C'est un plugin libre (licence MIT) créé par Agrici Daniel, publié sur GitHub sous le nom `AgriciDaniel/claude-seo`. Il ne coûte rien : il te faut seulement Claude Code.

## 1. Installer le plugin

Ouvre Claude Code, puis ajoute la place de marché du plugin et installe-le :

```text
/plugin marketplace add AgriciDaniel/claude-seo
/plugin install claude-seo@agricidaniel-claude-seo
```

Prépare ensuite son environnement de travail :

```text
/seo setup
```

## 2. Lancer un premier audit

Remplace l'adresse par celle de ton site :

```text
/seo audit https://ton-site.com
```

L'audit prend plusieurs minutes. Le résultat est une liste d'actions classées : traite d'abord celles du haut, ce sont les plus rentables.

## 3. Les commandes à connaître

Une fois l'audit lu, zoome sur un sujet précis :

```text
/seo technical https://ton-site.com
/seo content https://ton-site.com
/seo sitemap generate
/seo local https://ton-site.com
/seo backlinks https://ton-site.com
/seo geo https://ton-site.com
/seo content-brief "ton sujet d'article"
/seo competitor-pages https://ton-site.com
```

- `technical` : exploration, indexation, vitesse.
- `content` : qualité et profondeur des textes.
- `sitemap generate` : produit un sitemap propre.
- `local` : référencement local (fiche d'établissement, cohérence des coordonnées).
- `backlinks` : les liens qui pointent vers ton site.
- `geo` : ta présence dans les réponses des moteurs IA.
- `content-brief` : un plan d'article avec ses mots-clés.
- `competitor-pages` : des pages de comparaison face à tes concurrents.

## Bon à savoir

Certaines extensions qui lisent des données en direct (outils de mots-clés, Search Console) demandent leurs propres clés d'accès. L'audit de base fonctionne sans.

Source : [github.com/AgriciDaniel/claude-seo](https://github.com/AgriciDaniel/claude-seo)
