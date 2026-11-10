## À quoi ça sert

`security-audit` est un skill publié par Cloudflare (licence MIT) qui transforme ton agent en auditeur de sécurité. Il ne se contente pas de lister des soupçons : chaque faille trouvée est revue par un agent distinct chargé de la confirmer ou de l'écarter.

## 1. Installer le skill

Pour tous tes projets :

```bash
npx skills add https://github.com/cloudflare/security-audit-skill --skill security-audit --global
```

## 2. Lancer un audit complet

Ouvre Claude Code à la racine du projet à auditer et demande :

```text
Fais un audit de sécurité complet de ce projet.
```

Le skill enchaîne plusieurs phases :

- **Repérage** : il cartographie l'application, ses points d'entrée et ses zones sensibles.
- **Recherche** : des agents séparés examinent chaque zone (authentification, base de données, API, injection de prompt...).
- **Validation** : chaque piste passe par une vérification indépendante.
- **Rapport** : un `REPORT.md` qui sépare les failles confirmées, celles à vérifier et celles écartées.

Sans indication contraire, les rapports sont écrits dans `~/security-audit-skill/<nom-du-projet>/`, en dehors de ton code.

## 3. Cibler une partie du code

```text
Cherche les failles de sécurité dans ./src/api.
```

## Relance-le

D'après Cloudflare, lors de leurs essais, un seul passage a trouvé environ la moitié des failles découvertes au total en plusieurs passages. Chaque nouveau passage couvre ce que le précédent a laissé.

Sans bac à sable isolé, le skill n'exécute pas le code de ton projet : une faille qu'il ne peut pas démontrer reste dans la catégorie « à vérifier ».

Source : [github.com/cloudflare/security-audit-skill](https://github.com/cloudflare/security-audit-skill)
