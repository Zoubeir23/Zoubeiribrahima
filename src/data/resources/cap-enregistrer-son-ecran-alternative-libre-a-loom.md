## À quoi ça sert

Parfois, montrer l'écran est plus rapide que d'écrire dix messages : une démonstration à un client, un bug à reproduire, un tutoriel, une explication de code, une revue de maquette. Cap, publié par Cap Software, est une alternative libre à Loom. Il enregistre ton écran, ta caméra et ton micro, puis te donne un lien à partager ou une vidéo à exporter. Il fonctionne sur macOS, Windows et Linux, avec un tableau de bord web pour retrouver, partager et gérer tes enregistrements.

Ce qu'il propose :

- **Deux modes d'enregistrement.** Le mode Instant envoie la vidéo pendant que tu enregistres : le lien de partage est prêt dès que tu arrêtes. Le mode Studio enregistre en local puis ouvre un éditeur (fonds, zooms, découpe, sous-titres, réglages d'export).
- **Du travail en équipe.** Commentaires, réactions, transcriptions, statistiques de visionnage et espaces d'équipe.
- **Cap AI.** Titres, résumés, chapitres cliquables, sous-titres et transcriptions générés automatiquement.
- **L'import depuis Loom.** Tu peux importer tes vidéos Loom existantes dans Cap.
- **Le contrôle de tes données.** Tu choisis où vivent tes vidéos (voir plus bas).

## 1. Commencer

1. Télécharge Cap sur cap.so/download (macOS, Windows ou Linux).
2. Connecte-toi ou crée un compte.
3. Choisis le mode Instant ou le mode Studio.
4. Enregistre ta première vidéo.
5. Partage le lien, exporte le fichier, ou garde-la en local.

La documentation complète est sur cap.so/docs.

## 2. Où vivent tes vidéos

Cap n'enferme pas ton flux de travail dans une boîte noire. Quatre possibilités :

- **Cap Cloud**, le service hébergé, pour l'expérience la plus rapide.
- **Ton propre stockage compatible S3** : AWS S3, Cloudflare R2, Backblaze B2, MinIO, Wasabi ou un autre.
- **Ton propre nom de domaine** pour les pages de partage.
- **L'auto-hébergement complet** : application web, API, base de données, serveur média et stockage d'objets, avec Docker Compose.

Les vidéos peuvent être partagées en public ou en privé, avec un mot de passe, sur ton domaine, ou rester hors de l'infrastructure hébergée.

## 3. L'héberger chez toi

Il te faut Docker avec Compose. Dans ton terminal :

```bash
git clone https://github.com/CapSoftware/Cap.git
cd Cap
docker compose up -d
```

Cap est alors disponible sur `http://localhost:3000`. Tant que l'envoi d'e-mails n'est pas configuré, les liens de connexion apparaissent dans les journaux du service :

```bash
docker compose logs cap-web
```

Pour brancher l'application de bureau sur ton serveur, indique son adresse dans **Settings, Cap Server URL**. Le dépôt propose aussi un déploiement sur Railway en un clic, et un fichier pour Coolify.

**Avant d'ouvrir le serveur sur Internet**, le dépôt demande de configurer les adresses publiques et de remplacer les secrets par défaut :

```bash
CAP_URL=https://cap.tondomaine.com
S3_PUBLIC_URL=https://s3.tondomaine.com
```

Le guide d'auto-hébergement détaille l'envoi d'e-mails, les fournisseurs d'IA, le SSL, le stockage, le durcissement pour la production et le dépannage. Pour une instance à un seul propriétaire derrière un proxy qui authentifie, une page dédiée explique l'authentification par proxy de confiance.

## 4. Comment je m'en servirais

Pour un freelance, Cap est utile surtout pour :

- Montrer à un client l'avancement d'un site, sans réunion.
- Documenter un bug avec des étapes visibles, plutôt que des captures d'écran.
- Enregistrer une démonstration de produit ou un tutoriel et le partager par un simple lien.

Ce sont mes idées d'usage, pas celles du dépôt. Teste d'abord avec une courte vidéo pour vérifier la qualité de la capture et du son.

## Précautions

- **Un enregistrement d'écran montre tout.** Les notifications, les onglets, les mots de passe saisis, les e-mails ouverts : ferme ce qui est privé avant d'enregistrer, et relis la vidéo avant de partager un lien public.
- **Choisis la visibilité du lien.** Public, privé ou protégé par mot de passe : réfléchis-y pour chaque vidéo qui contient des informations de clients.
- **Cap Cloud est un service hébergé avec des tarifs.** La page de prix est sur cap.so/pricing. L'application libre et l'auto-hébergement ne dépendent pas de ce service.
- **Licence.** L'essentiel du code est sous AGPL-3.0 : tu peux l'héberger, l'utiliser et le modifier, mais si tu proposes une version modifiée comme service en ligne, tu dois en publier le code. Les familles de modules `cap-camera` et `scap` sont sous licence MIT, et les composants tiers gardent leur licence d'origine.
- **Le projet évolue vite.** La dernière version (0.6.3) date du 11 novembre 2026. Relis la documentation avant de mettre à jour une instance.

Source : [github.com/CapSoftware/Cap](https://github.com/CapSoftware/Cap)
