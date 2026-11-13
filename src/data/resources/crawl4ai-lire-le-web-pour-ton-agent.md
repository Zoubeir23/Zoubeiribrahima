## À quoi ça sert

Quand tu demandes à une IA de lire une page web, elle reçoit souvent un tas de HTML, de menus et de publicités. Crawl4AI, publié par UncleCode (licence Apache-2.0), ouvre la page dans un vrai navigateur, retire ce qui ne sert à rien et te rend un texte Markdown propre, prêt à envoyer à Claude. Il sait aussi extraire des données structurées (une liste de prix, de titres, d'articles) en JSON.

Ce que tu peux en faire :

- Lire des sites qui s'affichent en JavaScript, que les outils simples ne voient pas.
- Parcourir un site entier en suivant ses liens, avec un nombre de pages que tu limites.
- Analyser des pages de concurrents (titres, structure, mots-clés) avant d'écrire les tiennes.
- Constituer une base de documents à partir d'une documentation officielle.

## Choisis ta façon de l'utiliser

| | Cloud | Bibliothèque | Ton propre serveur |
|---|---|---|---|
| Qui fait tourner le navigateur | Crawl4AI | Ton ordinateur, en Python | Toi, dans Docker |
| Prix | 1 000 crédits gratuits par mois, sans carte, puis payant | Gratuit | Gratuit, mais tu paies l'hébergement |
| Pages protégées contre les robots | Gérées pour toi | À toi de régler | À toi de régler |

Le plus simple pour commencer : la bibliothèque, sur ton ordinateur.

## 1. Installer la bibliothèque

Il te faut Python. Dans ton terminal :

```bash
pip install -U crawl4ai
crawl4ai-setup
crawl4ai-doctor
```

`crawl4ai-setup` installe le navigateur, une seule fois. `crawl4ai-doctor` vérifie que tout fonctionne. Si l'installation du navigateur échoue, lance-la à la main :

```bash
python -m playwright install --with-deps chromium
```

## 2. Lire ta première page

En ligne de commande, une page en Markdown :

```bash
crwl https://news.ycombinator.com -o markdown
```

Ou dans un script Python :

```python
import asyncio
from crawl4ai import AsyncWebCrawler

async def main():
    async with AsyncWebCrawler() as crawler:
        result = await crawler.arun(url="https://news.ycombinator.com")
        print(result.markdown)

asyncio.run(main())
```

## 3. Parcourir un site, avec une limite

Cette commande suit les liens en largeur et vise 10 pages. Le compteur ne monte que pour les pages lues avec succès : si une page échoue, Crawl4AI peut en demander d'autres, donc 10 est un objectif, pas un plafond strict :

```bash
crwl https://docs.crawl4ai.com --deep-crawl bfs --max-pages 10
```

Fixe toujours un maximum. Sans limite, tu peux télécharger des milliers de pages et surcharger le site visé.

## 4. Brancher Crawl4AI à Claude Code

Avec le serveur MCP du cloud, Claude Code lit le web lui-même, sans que tu lances quoi que ce soit. Crée une clé gratuite sur le site de Crawl4AI, garde-la dans la variable d'environnement `CRAWL4AI_KEY`, puis lance la commande ci-dessous. L'option `--scope user` rend le serveur disponible dans tous tes projets : sans elle, il ne le serait que dans le dossier où tu la lances.

```bash
claude mcp add --scope user --transport http crawl4ai https://api.crawl4ai.com/mcp \
  --header "Authorization: Bearer $CRAWL4AI_KEY"
```

Ensuite, parle à Claude normalement :

```text
Lis la page https://exemple.com/blog avec Crawl4AI et résume-moi ses idées principales.
```

```text
Lis les trois pages de mes concurrents ci-dessous avec Crawl4AI. Compare leurs
titres H1 et H2 et dis-moi quels sujets je ne couvre pas encore.
```

## 5. Faire tourner ton propre serveur (facultatif)

Si tu veux garder les données chez toi, lance le serveur Docker. Il exige un jeton : sans lui, il répond seulement depuis l'intérieur de son conteneur.

```bash
export CRAWL4AI_API_TOKEN="$(openssl rand -hex 32)"
docker run -d -p 11235:11235 --name crawl4ai --shm-size=1g \
  -e CRAWL4AI_API_TOKEN="$CRAWL4AI_API_TOKEN" \
  unclecode/crawl4ai:latest
```

Compte environ 10 secondes de démarrage, puis teste :

```bash
curl -s http://localhost:11235/md \
  -H "Authorization: Bearer $CRAWL4AI_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://news.ycombinator.com"}' | jq -r .markdown
```

## Les limites à connaître

- **Respecte les règles des sites.** Lis leur fichier robots.txt et leurs conditions d'utilisation. Beaucoup de plateformes, LinkedIn en tête, interdisent l'extraction automatisée. Utilise Crawl4AI sur des contenus publics et sans abuser du rythme.
- **Les pages protégées demandent du réglage.** Crawl4AI propose un mode furtif et des proxys, mais aucun outil ne passe partout.
- **L'extraction par LLM coûte.** Les sélecteurs CSS ou XPath sont gratuits et rapides. Réserve l'extraction par modèle aux pages dont la structure change tout le temps.
- **Une bibliothèque Python.** Dans un projet Next.js, appelle-la par l'API du cloud ou de ton serveur Docker plutôt que de l'intégrer au site.

Source : [github.com/unclecode/crawl4ai](https://github.com/unclecode/crawl4ai)
