# Ressources (page /ressources)

Bibliothèque publique de guides pour Claude Code. Les titres et résumés sont visibles et indexés ; le texte d'un guide s'affiche après un prénom et un e-mail. Une seule inscription débloque toutes les ressources, sur ce navigateur.

Ne pas confondre avec les pages `/lead-magnet/<identifiant>` (voir `lead-magnet.md`), partagées par lien seulement, sans inscription et jamais indexées.

## Comment fonctionne l'inscription

1. Le navigateur vérifie le prénom et l'e-mail : format, fautes de frappe courantes (`gmial.com`), adresses temporaires (`yopmail.com`...).
2. La fonction `api/resources/subscribe.ts` (Vercel) refait ces contrôles, vérifie que le domaine de l'adresse reçoit des e-mails (enregistrements MX), puis enregistre le contact dans Resend.
3. Le navigateur mémorise le déblocage (`localStorage`) et affiche le guide.

Limites assumées :

- Le contrôle prouve que l'adresse peut exister, pas qu'elle appartient à la personne : aucun e-mail de confirmation n'est envoyé (choix du propriétaire).
- Le texte des guides est dans le code JavaScript du site : quelqu'un de technique peut le lire sans s'inscrire. Il n'est pas dans le HTML pré-rendu.
- Si le DNS ne répond pas, l'inscription est acceptée plutôt que de bloquer un vrai visiteur.

En local (`npm run dev`), toutes les ressources sont ouvertes sans formulaire, pour les relire. La fonction serveur ne tourne pas avec `npm run dev`.

## Configuration

- `RESEND_API_KEY` : dans `.env.local` en local, dans les variables d'environnement du projet Vercel en production (type Sensitive). Voir `.env.example`.
- Les inscrits se consultent dans Resend, rubrique Contacts.

## Ajouter une ressource

1. Écris le texte dans `src/data/resources/<identifiant>.md`. Chaque commande et chaque prompt va dans un bloc de code (trois accents graves) : la page ajoute un bouton « Copier ».
2. Ajoute l'entrée dans `src/data/resourceGuides.ts` (titre, résumé, catégorie, auteur de l'outil, licence, source en `https`).
3. Ajoute l'adresse `https://zoubeir.me/ressources/<identifiant>` dans `public/sitemap.xml` et la ligne correspondante dans `public/llms.txt`.

Les tests vérifient que chaque ressource a son texte, une source en `https`, ses commandes dans des blocs de code, et qu'elle figure dans le sitemap et `llms.txt`.

## Règles de contenu

- Reformuler, jamais copier une page d'origine. Citer l'auteur, la licence et la source de chaque outil.
- Vérifier chaque commande et chaque chiffre à la source (README du dépôt, documentation officielle) avant de publier. Retirer ce qui ne se vérifie pas.
- Un dépôt sans licence (`Melvynx/shared-skills`) : renvoyer vers lui, ne pas reproduire son contenu.
