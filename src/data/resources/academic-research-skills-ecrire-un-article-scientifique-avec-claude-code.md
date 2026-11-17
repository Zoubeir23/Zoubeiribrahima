## À quoi ça sert

Academic Research Skills, créé par Cheng-I Wu, est un ensemble de skills pour Claude Code qui couvre toute la chaîne d'un travail scientifique : recherche, rédaction, relecture par pairs, révision et finalisation. Son principe est écrit noir sur blanc : **l'IA est ton copilote, pas le pilote.** Elle peut rédiger du texte, même un article entier, mais les décisions restent les tiennes, et le processus s'arrête à chaque étape pour que tu confirmes. Tu restes l'auteur, et tu réponds de chaque affirmation que tu soumets.

L'auteur précise aussi ce que l'outil n'est pas : il ne sert pas à cacher qu'on a utilisé une IA. Il aide à mieux écrire, et il contient même un mode qui génère la déclaration d'usage de l'IA demandée par certaines revues.

## Les cinq skills

| Skill | Ce qu'il fait |
|---|---|
| Deep Research | Une équipe de 13 agents : recherche complète, revue de littérature, revue systématique PRISMA, vérification de faits, mode de questions socratiques pour clarifier ta problématique |
| Academic Paper | 12 agents pour rédiger : plan, rédaction, résumé, révision, conversion des citations, LaTeX, déclaration d'usage de l'IA |
| Academic Paper Reviewer | 7 agents qui simulent une relecture par pairs, avec un « avocat du diable » |
| Academic Pipeline | Un chef d'orchestre en 10 étapes avec des points de contrôle et des vérifications d'intégrité |
| SR-Screener | Le tri des études pour les revues systématiques : deux relecteurs IA indépendants et un troisième qui tranche |

Les formats de citation gérés : APA 7.0 (par défaut), Chicago, MLA, IEEE et Vancouver. Les structures d'article : IMRaD, revue de littérature, analyse théorique, étude de cas, note de politique et article de conférence.

## 1. Installer

Il te faut une version récente de Claude Code et une clé d'API Anthropic, exportée dans la variable `ANTHROPIC_API_KEY` ou saisie au premier lancement de `claude`. Pandoc (pour le format Word) et tectonic (pour le PDF en APA 7.0) sont facultatifs : sans eux, la sortie en Markdown fonctionne. Dans Claude Code :

```text
/plugin marketplace add Imbad0202/academic-research-skills
/plugin install academic-research-skills
```

Sur claude.ai ou Claude Desktop (forfaits payants), ajoute le même dépôt dans **Customize, Plugins, Add, Add marketplace, Add from a repository**, puis installe `academic-research-skills`. Attention : dans une conversation simple de ces applications, les hooks et les agents du plugin ne s'exécutent pas. Le guide d'installation du dépôt détaille les différences selon le canal.

Pour vérifier que tout fonctionne, lance `/ars-plan` et décris un article sur lequel tu travailles : l'outil démarre un dialogue socratique pour construire la structure des chapitres. Pour un essai en une fois, tape `/ars-lit-review` suivi de ton sujet entre guillemets.

## 2. Lui parler

Tu n'as pas besoin de noms de commandes : décris ce que tu veux.

```text
Je veux écrire un article de recherche sur l'impact de l'IA sur l'assurance
qualité dans l'enseignement supérieur.
```

```text
Guide ma recherche sur l'IA dans l'évaluation des apprentissages. Pose-moi des
questions avant de proposer quoi que ce soit.
```

```text
J'ai un brouillon et voici les commentaires des relecteurs. Transforme-les en
feuille de route de révision.
```

```text
Relis cet article comme le ferait un comité de lecture et dis-moi où il est
faible.
```

Le mode socratique et le mode de planification détectent l'intention de ta demande plutôt que des mots précis : ils fonctionnent dans d'autres langues que l'anglais. L'activation générale des skills repose en revanche sur des mots-clés en anglais et en chinois traditionnel. Si un skill ne se déclenche pas bien en français, l'auteur conseille d'ajouter tes mots-clés dans la section correspondante de chaque fichier `SKILL.md`.

## 3. Les contrôles d'intégrité, et leurs limites

Le pipeline impose deux contrôles d'intégrité (avant la relecture et avant la finalisation). Ils vérifient l'existence des citations, la correspondance entre une affirmation et sa source, la méthodologie annoncée, la fidélité des figures et tableaux. Une option vérifie, source par source, que l'affirmation est vraiment soutenue.

L'auteur est franc sur ce que ces contrôles ne prouvent pas. Ils vérifient le texte et le processus déclaré. Ils n'établissent pas que les procédures ont réellement été faites, que les données sont authentiques, ni que les résultats se reproduisent : une fabrication décrite de façon cohérente peut passer. Certains contrôles sont par échantillon ou confiés à un modèle. Dans un exemple publié par le dépôt (une exécution de mars 2026 avec une version antérieure, donc pas la performance actuelle), 21 des 68 références finales posaient encore un problème après trois rounds de vérification.

Conclusion pratique : **vérifie toi-même chaque référence et chaque chiffre avant de soumettre.** Les modèles inventent des citations, et un outil qui les contrôle ne remplace pas ta relecture.

## 4. Coût et confidentialité

- **Coût.** Le dépôt estime un pipeline complet pour un article de 15 000 mots à environ 3 à 7 dollars américains, aux tarifs de septembre 2026, avant remises de cache. Chaque mode a son propre budget de jetons.
- **Ce qui quitte ton ordinateur.** Le dépôt a une page dédiée aux flux de données : résolveurs bibliographiques (pour vérifier les références), appels à un second modèle si tu l'actives et l'acceptes, vérification de mise à jour du plugin. Lis-la avant de t'en servir avec un texte non publié ou sensible.

## Licence : usage non commercial

Le projet est sous licence CC BY-NC 4.0 : tu peux le copier et l'adapter, avec attribution, mais **pas pour un usage commercial**. Si tu veux l'utiliser dans le cadre d'un service payant, d'une prestation facturée ou d'un produit, ce n'est pas autorisé par cette licence : contacte l'auteur. Quand tu le réutilises, l'attribution demandée est :

```text
Based on Academic Research Skills by Cheng-I Wu
https://github.com/Imbad0202/academic-research-skills
```

## Avant de t'en servir

- **Respecte les règles de ta revue ou de ton université** sur l'usage de l'IA, et déclare-le comme elles le demandent.
- **Les relectures simulées ne sont pas calibrées.** Les revues en direct portent l'état `NOT_CALIBRATED` dans la documentation : elles donnent un avis, pas une mesure fiable.
- **Le projet évolue très vite.** La version 3.24.3 date du 14 novembre 2026. Relis la page d'installation avant de mettre à jour.

Source : [github.com/Imbad0202/academic-research-skills](https://github.com/Imbad0202/academic-research-skills)
