## À quoi ça sert

Une application construite vite avec l'IA fonctionne, mais rame souvent : images lourdes, requêtes en double, tout chargé d'un coup. Ce prompt fait passer à Claude Code une liste de contrôle de performance sur ton projet. Il dit ce qui manque, classe les corrections de la plus rentable à la moins rentable, et ne touche à rien sans ton accord.

## Le prompt

Ouvre ton projet à la racine dans Claude Code et colle :

```text
Tu es spécialiste de la performance web. Vérifie ce projet point par point avec
la liste ci-dessous.

Pour chaque point :
- dis s'il est en place, absent, ou sans objet ici, avec le fichier concerné ;
- s'il est absent, explique en une phrase ce que l'utilisateur perd.

Classe ensuite les points absents du plus rentable au moins rentable, puis
attends ma validation. Corrige seulement ceux que je valide, un par un, et
vérifie que l'application fonctionne après chaque correction.

Affichage
1. Squelettes de chargement plutôt que des indicateurs qui tournent.
2. Rendu côté serveur ou à la construction : la page arrive déjà remplie.
3. Mise à jour optimiste de l'écran, annulée si le serveur refuse.
4. Réponses d'IA affichées au fil de l'eau (streaming).
5. Longues listes virtualisées : seules les lignes visibles sont rendues.
6. Pas de rendus inutiles : état placé au bon endroit, mémoïsation si besoin.

Fichiers et réseau
7. Images en WebP ou AVIF, à la bonne taille pour chaque écran.
8. Images hors de l'écran chargées seulement quand on s'en approche.
9. JavaScript découpé par page.
10. Dépendances inutiles retirées.
11. Scripts tiers (mesure d'audience, chat, pixels) chargés après la page.
12. Polices hébergées sur le site, en WOFF2, deux graisses au plus.
13. Compression Brotli ou gzip sur le HTML, le JS, le CSS et le JSON.
14. Fichiers statiques servis par un CDN, avec un cache navigateur long sur les
    fichiers versionnés.

Données et serveur
15. Un seul appel par donnée, partagé entre les composants.
16. Recherche et autocomplétion qui attendent la fin de la frappe (debounce).
17. Résultats paginés, jamais une table entière.
18. Requêtes indépendantes lancées en parallèle.
19. Pas de requêtes N+1 : une requête pour la liste, pas une par ligne.
20. Index sur les colonnes filtrées et triées souvent.
21. Seulement les colonnes utiles, jamais SELECT *.
22. Connexions à la base réutilisées (pool).
23. Cache pour les données lues souvent et modifiées rarement.
24. Délai maximal sur chaque appel à une API externe.
25. Tâches lentes (e-mails, exports, IA) envoyées en arrière-plan.
26. Serveur et base de données dans la même région.
27. Plusieurs instances derrière un répartiteur quand une seule ne suffit plus.

Mesure
28. Traces côté serveur pour repérer les requêtes lentes.
29. Suivi des Core Web Vitals des vrais visiteurs.
30. Tests sur téléphone lent et réseau 3G simulés dans le navigateur.
```

## Par où commencer

Si tu n'en fais que cinq, prends celles qui se voient le plus : les images en WebP ou AVIF (7), le chargement différé des images (8), le streaming des réponses d'IA (4), les index (20) et les requêtes N+1 (19).

## À adapter

Tous les points ne valent pas pour tous les projets : un site statique n'a pas de base de données, un petit projet n'a pas besoin de répartiteur. Le prompt demande justement de marquer « sans objet » ce qui ne s'applique pas.
