# Ressources (page /ressources)

Bibliothèque publique de guides pour Claude Code. Les titres et résumés sont visibles et indexés ; le texte d'un guide s'affiche après un prénom et un e-mail. Le formulaire est redemandé à chaque visite : l'accès n'est pas mémorisé.

Ne pas confondre avec les pages `/lead-magnet/<identifiant>` (voir `lead-magnet.md`), partagées par lien seulement, sans inscription et jamais indexées.

## Comment fonctionne l'inscription

1. Le navigateur vérifie le prénom et l'e-mail : format, fautes de frappe courantes (`gmial.com`), adresses temporaires (`yopmail.com`...).
2. La fonction `api/resources/subscribe.ts` (Vercel) refait ces contrôles, vérifie que le domaine de l'adresse reçoit des e-mails (enregistrements MX), puis enregistre le contact dans Resend, une seule fois : elle lit d'abord la liste et n'écrit que si le contact est absent.
3. Le guide s'affiche tant que le visiteur reste sur la page. L'accès n'est jamais mémorisé : s'il quitte la page puis revient, ou recharge, le formulaire est redemandé, et chaque guide se débloque séparément.
4. Pour ne pas renvoyer à Resend un e-mail déjà enregistré, le navigateur retient seulement une empreinte SHA-256 (jamais l'adresse, clé `registeredResourceEmails`, 50 maximum) : si le visiteur retape le même e-mail, le guide s'ouvre sans appel au serveur.

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

## Guides issus du kit public

Quatre guides décrivent le dépôt [Zoubeir23/claude-code-kit](https://github.com/Zoubeir23/claude-code-kit) : `brancher-google-search-console-a-claude-code`, `equipe-seo-32-agents-claude-code`, `orchestrer-claude-code-et-antigravity` et `socle-claude-code-claude-md-regles-agents-de-revue`.

Quand un fichier du kit change (nombre d'agents, commandes d'installation, chemins), mets le guide correspondant à jour dans le même temps. Les chiffres cités (32 agents SEO, 18 agents de revue, 11 langages, 21 outils du serveur Search Console en version 0.4.2) sont à revérifier à chaque évolution.

Les agents de revue et les règles de codage viennent d'ECC (MIT, Affaan Mustafa) : l'attribution reste dans `NOTICE.md` du kit et dans le guide.
