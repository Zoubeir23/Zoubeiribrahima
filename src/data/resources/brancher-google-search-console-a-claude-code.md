## À quoi ça sert

Google Search Console sait tout sur ton site : les requêtes qui t'amènent des visiteurs, les pages indexées, celles qui ne le sont pas et pourquoi. Mais ses écrans sont lents à parcourir. Avec un serveur MCP, Claude Code lit ces données directement et répond en langage normal : « quelles pages ne sont pas indexées ? », « quelles requêtes perdent des clics ? ».

Le serveur utilisé ici s'appelle `mcp-search-console`. Il est publié par Amin Foroutan sous licence MIT et fonctionne avec une clé Google que tu gardes sur ta machine. Ce guide raconte l'installation telle que je l'ai faite pour mon propre site, avec les pièges rencontrés.

## Ce qu'il te faut avant

- Un site déjà ajouté dans Google Search Console, dont tu es propriétaire.
- Claude Code installé.
- Un terminal. Python n'est pas à installer à la main : `uv` s'en charge.

## 1. Installer uv

`uv` fournit la commande `uvx`, qui télécharge et lance le serveur sans rien configurer d'autre. Dans ton terminal :

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

```bash
source $HOME/.local/bin/env
```

```bash
echo 'source $HOME/.local/bin/env' >> ~/.zshrc
```

Vérifie que ça répond :

```bash
uv --version
```

Note aussi le chemin complet de `uvx`, il peut servir en cas d'erreur plus bas :

```bash
which uvx
```

## 2. Choisir comment te connecter à Google

Le serveur accepte deux méthodes. Elles passent toutes les deux par un projet Google Cloud.

**OAuth, avec ton propre compte Google.** C'est la méthode que recommande l'auteur. À la première utilisation, une fenêtre de navigateur s'ouvre pour que tu te connectes, puis le jeton est enregistré.

**Compte de service, pour l'automatisation.** C'est celle que j'utilise : aucune fenêtre de navigateur, donc rien à refaire quand une session expire. Le reste du guide suit cette voie.

### Créer la clé du compte de service

1. Ouvre la [console Google Cloud](https://console.cloud.google.com/), crée un projet ou choisis-en un.
2. Active l'[API Search Console](https://console.cloud.google.com/apis/library/searchconsole.googleapis.com).
3. Dans [Identifiants](https://console.cloud.google.com/apis/credentials), clique sur Créer des identifiants, puis Compte de service.
4. Ouvre le compte créé, onglet Clés, Ajouter une clé, Créer une clé, JSON. Un fichier est téléchargé.

### Donner accès à ton site

Le compte de service a une adresse du type `nom@projet.iam.gserviceaccount.com`. Dans Google Search Console, va dans Paramètres, Utilisateurs et autorisations, Ajouter un utilisateur, colle cette adresse. Le README du serveur demande l'accès **Complet**. Mon installation utilise le rôle Propriétaire et fonctionne aussi.

Après l'ajout, attends quelques minutes : la prise en compte n'est pas immédiate.

## 3. Ranger la clé au bon endroit

Cette clé donne accès à tes données Search Console. Garde-la hors de tes projets, avec des droits restreints :

```bash
mkdir -p ~/.claude/mcp-gsc
mv ~/Downloads/ton-fichier-de-cle.json ~/.claude/mcp-gsc/service_account.json
chmod 600 ~/.claude/mcp-gsc/service_account.json
```

Si ton dossier `~/.claude` est un dépôt Git, vérifie que la clé est ignorée avant de commiter quoi que ce soit :

```bash
git -C ~/.claude check-ignore -q mcp-gsc/service_account.json && echo "ignorée" || echo "ATTENTION : non ignorée"
```

Si tu lis « ATTENTION », ajoute `mcp-gsc/` à `~/.claude/.gitignore` tout de suite.

## 4. Brancher le serveur dans Claude Code

```bash
claude mcp add gsc -s user \
  -e GSC_CREDENTIALS_PATH="$HOME/.claude/mcp-gsc/service_account.json" \
  -e GSC_SKIP_OAUTH=true \
  -- uvx mcp-search-console
```

L'option `-s user` est importante : sans elle, le serveur n'existe que dans le dossier où tu as tapé la commande. Pour OAuth, remplace les deux variables par `GSC_OAUTH_CLIENT_SECRETS_FILE` suivie du chemin de ton fichier de secrets client.

Vérifie la connexion :

```bash
claude mcp list
```

La ligne `gsc` doit apparaître comme connectée. Sinon, relance Claude Code et réessaie.

## 5. Tester

Dans Claude Code, demande :

```text
Utilise le serveur gsc pour lister mes propriétés Search Console.
```

Ton site doit apparaître. Si la liste est vide, l'adresse du compte de service n'a pas encore été ajoutée dans Search Console, ou la prise en compte n'est pas terminée.

## 6. Ce que tu peux lui demander

Sur mon installation (version 0.4.2), le serveur expose 21 outils. Les plus utiles :

| Outil | Ce qu'il fait |
|---|---|
| `list_properties` | Liste tes sites |
| `get_performance_overview` | Résumé des clics, impressions, CTR et position |
| `get_search_analytics` | Meilleures requêtes et pages |
| `get_search_by_page_query` | Requêtes qui amènent du trafic sur une page |
| `compare_search_periods` | Compare deux périodes |
| `get_advanced_search_analytics` | Filtres par pays, appareil, requête, page |
| `inspect_url_enhanced` | État d'indexation détaillé d'une URL |
| `batch_url_inspection` | Inspecte jusqu'à 10 URLs d'un coup |
| `check_indexing_issues` | Cherche les problèmes d'indexation sur une liste d'URLs |
| `list_sitemaps_enhanced` | Sitemaps, erreurs et avertissements |

Exemples de demandes :

```text
Combien de pages de mon site sont indexées, et combien ne le sont pas ? Pour chaque page non indexée, donne la raison et la correction.
```

```text
Compare mes 28 derniers jours aux 28 jours précédents. Quelles requêtes ont perdu le plus de clics ?
```

```text
Trouve les requêtes en position 11 à 20 avec beaucoup d'impressions et peu de clics. Ce sont mes gains rapides.
```

## 7. Les limites que j'ai rencontrées

- **Les inspections sont limitées à 10 URLs par lot.** Pour un site de 30 pages, Claude lance trois lots.
- **Le serveur ne peut pas demander l'indexation d'une page.** Il lit l'état d'indexation, mais le bouton « Demander l'indexation » reste dans l'interface de Search Console.
- **L'ajout et la suppression de site ou de sitemap sont bloqués par défaut.** C'est voulu. Si tu veux les activer, ajoute `GSC_ALLOW_DESTRUCTIVE=true` aux variables du serveur, en sachant que Claude pourra alors supprimer un sitemap.
- **Les données récentes sont provisoires.** Par défaut, le serveur renvoie les mêmes chiffres que le tableau de bord. La variable `GSC_DATA_STATE` réglée sur `final` ne garde que les données confirmées, avec 2 à 3 jours de retard.

## 8. Dépannage

**`spawn uvx ENOENT` ou `command not found: uvx`.** Claude Code ne trouve pas `uvx`. Remplace `uvx` par son chemin complet, celui que t'a donné `which uvx`, dans la commande `claude mcp add`.

**`credentials file not found`.** Le chemin de `GSC_CREDENTIALS_PATH` doit être absolu et le fichier doit exister. Teste avec `ls -l ~/.claude/mcp-gsc/service_account.json`.

**Aucune propriété.** Vérifie que l'adresse du compte de service est bien dans Search Console. Pour la relire sans afficher la clé :

```bash
jq -r .client_email ~/.claude/mcp-gsc/service_account.json
```

## 9. Sécurité

La clé est l'équivalent d'un mot de passe pour tes données Search Console. Ne la colle jamais dans une conversation, ne la commite jamais. Si elle a fuité, supprime-la dans la console Google Cloud (onglet Clés du compte de service) et crées-en une nouvelle.

## 10. Le faire faire par Claude

J'ai écrit un skill, `setup-seo-team`, qui déroule ces étapes à ta place : prérequis, rangement de la clé, branchement du serveur et test. Il ne lit jamais le contenu de ta clé. Il est dans le kit public :

```bash
git clone https://github.com/Zoubeir23/claude-code-kit.git
mkdir -p ~/.claude/skills
cp -R claude-code-kit/seo/skills/setup-seo-team ~/.claude/skills/
```

Puis, dans Claude Code :

```text
Utilise le skill setup-seo-team pour brancher Google Search Console.
```

Le même skill installe aussi l'équipe de 32 agents SEO décrite dans le guide suivant.

Source du serveur : [github.com/AminForou/mcp-gsc](https://github.com/AminForou/mcp-gsc)
